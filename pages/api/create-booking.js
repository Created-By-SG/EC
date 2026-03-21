// pages/api/create-booking.js
// Generates a booking token, stores it in Supabase, and emails the player link.
// POST /api/create-booking
// Body: { email, gameId, roomSlug }

import { supabaseAdmin } from '../../lib/supabase'

const GAME_LABELS = {
  'mr-easter': 'The Bunny Who Stole Easter',
}

// Generates a readable booking code e.g. EAST-4829
function generateBookingToken(prefix = 'EAST') {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-${num}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, gameId, roomSlug } = req.body
  if (!email || !gameId || !roomSlug) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const emailClean = email.trim().toLowerCase()

  // 1. Generate a unique token — retry if collision
  let token
  let attempts = 0
  while (attempts < 5) {
    const candidate = generateBookingToken()
    const { data: existing } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .eq('token', candidate)
      .single()
    if (!existing) { token = candidate; break }
    attempts++
  }
  if (!token) return res.status(500).json({ error: 'Failed to generate unique token' })

  // 2. Insert booking row
  const { error: bookingError } = await supabaseAdmin
    .from('bookings')
    .insert({
      token,
      game_id: gameId,
      email: emailClean,
      status: 'pending',
    })

  if (bookingError) {
    console.error('create-booking error:', bookingError)
    return res.status(500).json({ error: 'Failed to create booking' })
  }

  // 3. Build player link
  const playerLink = `${process.env.NEXT_PUBLIC_GAMES_URL || 'https://ec-games.vercel.app'}/rooms/${roomSlug}?b=${token}`
  const gameName = GAME_LABELS[gameId] || gameId

  // 4. Send email via Resend
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Escape City <onboarding@resend.dev>',
      to: emailClean,
      subject: `Your booking is confirmed — ${gameName}`,
      html: `
        <div style="font-family: monospace; background: #080e1a; color: #e2e8f0; padding: 40px; max-width: 520px; margin: 0 auto;">
          <div style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #f59e0b; margin-bottom: 24px;">
            ESCAPE / CITY
          </div>

          <h1 style="font-size: 28px; color: #ffffff; margin: 0 0 8px 0; line-height: 1.1;">
            ${gameName}
          </h1>

          <p style="color: #64748b; font-size: 13px; margin: 0 0 32px 0;">
            Gold Coast &middot; Southport &middot; 9 stages &middot; ~2 hrs
          </p>

          <div style="background: #0f172a; border: 0.5px solid #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <div style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">
              Your booking code
            </div>
            <div style="font-size: 32px; font-weight: 700; color: #f59e0b; letter-spacing: 4px;">
              ${token}
            </div>
          </div>

          <div style="background: #0f172a; border: 0.5px solid #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
            <div style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">
              Your player link
            </div>
            <a href="${playerLink}" style="color: #3b82f6; font-size: 13px; word-break: break-all;">
              ${playerLink}
            </a>
          </div>

          <a href="${playerLink}" style="display: inline-block; background: #f59e0b; color: #000000; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 14px 28px; border-radius: 4px; text-decoration: none; margin-bottom: 32px;">
            Start Game &rarr;
          </a>

          <div style="border-top: 0.5px solid #1e293b; padding-top: 24px; font-size: 12px; color: #64748b; line-height: 1.6;">
            <p style="margin: 0 0 8px 0;">
              When you're ready to play, click the link above or paste it into your browser.
              Enter your email and booking code to start your session.
            </p>
            <p style="margin: 0;">
              Your 2 hour window starts the moment you enter the game.
              The timer keeps running even if you close the app.
              Bookmark your player link to return to your session at any time.
            </p>
          </div>
        </div>
      `,
    }),
  })

  if (!emailRes.ok) {
    const emailErr = await emailRes.json()
    console.error('Resend error:', emailErr)
    // Non-fatal — booking exists, email just failed
    return res.status(200).json({ ok: true, token, emailSent: false, warning: 'Booking created but email failed to send' })
  }

  return res.status(200).json({ ok: true, token, emailSent: true })
}
