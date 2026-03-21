// pages/api/validate-booking.js
// Validates email + booking code on game start.
// POST /api/validate-booking
// Body: { email, token }

import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, token } = req.body
  if (!email || !token) {
    return res.status(400).json({ error: 'Email and booking code are required' })
  }

  const emailClean = email.trim().toLowerCase()
  const tokenClean = token.trim().toUpperCase()

  // Look up booking — case insensitive token, exact email match
  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('email', emailClean)
    .filter('token', 'ilike', tokenClean)
    .single()

  if (error || !booking) {
    return res.status(404).json({ error: "We couldn't find a booking matching those details. Check your confirmation email." })
  }

  if (booking.status === 'complete') {
    return res.status(400).json({ error: 'This booking has already been used. Contact us if you think this is a mistake.' })
  }

  if (booking.status === 'cancelled') {
    return res.status(400).json({ error: 'This booking has been cancelled. Contact us for help.' })
  }

  // Valid — return game_id and room info so client can start the session
  return res.status(200).json({
    ok: true,
    bookingId: booking.id,
    gameId: booking.game_id,
    email: booking.email,
    displayName: booking.email.split('@')[0], // matt@gmail.com → matt
  })
}
