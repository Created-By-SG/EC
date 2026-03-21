// pages/rooms/index.js
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../../styles/Rooms.module.css'

const TEST_EMAIL = 'macromatters1@gmail.com'

export const ROOMS = [
  {
    slug: 'the-bunny-who-stole-easter',
    gameId: 'mr-easter',
    city: 'Gold Coast',
    title: 'The Bunny Who Stole Easter',
    area: 'Surfers Paradise',
    stages: 9,
    duration: '~2 hrs',
    difficulty: 'Medium',
    description: 'Mr Easter has lost the Southport basket. Four suspects. Two hours before every kid on the Gold Coast wakes up to nothing. Can you find it?',
    available: true,
    price: '$20',
  },
  {
    slug: 'the-river-cipher',
    city: 'Brisbane',
    title: 'The River Cipher',
    area: 'South Bank',
    stages: 7,
    duration: '~2 hrs',
    difficulty: 'Hard',
    description: "Follow a trail of coded messages left by a river surveyor who mapped Brisbane's secrets in 1865.",
    available: false,
  },
]

export default function RoomsPage() {
  const [submitting, setSubmitting] = useState(null) // holds room slug while loading
  const [confirmed, setConfirmed] = useState(null)   // { token, slug } after booking

  async function handleBuy(room) {
    setSubmitting(room.slug)
    try {
      const res = await fetch('/api/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: TEST_EMAIL,
          gameId: room.gameId,
          roomSlug: room.slug,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setConfirmed({ token: data.token, slug: room.slug, emailSent: data.emailSent })
    } catch (err) {
      alert(err.message || 'Something went wrong. Try again.')
    } finally {
      setSubmitting(null)
    }
  }

  return (
    <>
      <Head>
        <title>Rooms | Escape City</title>
        <meta name="description" content="Choose your puzzle route. Each room is a themed experience hidden across a real city." />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>Choose your room</div>
          <h1 className={styles.title}>Pick a city. Start the hunt.</h1>
          <p className={styles.sub}>Each room is a self-guided puzzle experience hidden across a real city. Play solo or with a team.</p>
        </div>

        <div className={styles.grid}>
          {ROOMS.map(room => (
            <div key={room.slug} className={`${styles.card} ${!room.available ? styles.cardDim : ''}`}>
              <div className={styles.cardTop}>
                <div className={styles.city}>{room.city}</div>
                <div className={styles.difficulty}>{room.difficulty}</div>
              </div>
              <div className={styles.roomTitle}>{room.title}</div>
              <div className={styles.meta}>
                <span>{room.area}</span>
                <span>·</span>
                <span>{room.stages} stages</span>
                <span>·</span>
                <span>{room.duration}</span>
              </div>
              <p className={styles.desc}>{room.description}</p>
              {room.available ? (
                <div className={styles.btnRow}>
                  <Link href={`/rooms/${room.slug}`} className={styles.btn}>
                    Enter Room
                  </Link>
                  <button
                    className={styles.btnBuy}
                    onClick={() => handleBuy(room)}
                    disabled={submitting === room.slug}
                  >
                    {submitting === room.slug ? 'Booking...' : `Book Now ${room.price ? `... ${room.price}` : ''}`}
                  </button>
                </div>
              ) : (
                <div className={styles.btnDisabled}>Coming Soon</div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Booking confirmed overlay */}
      {confirmed && (
        <div className={styles.modalOverlay} onClick={() => setConfirmed(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalEyebrow}>Booking confirmed</div>
            <div className={styles.modalTitle}>Check your email.</div>
            <div className={styles.modalDivider} />
            <div className={styles.modalConfirmCode}>
              <div className={styles.modalConfirmLabel}>Your booking code</div>
              <div className={styles.modalConfirmToken}>{confirmed.token}</div>
            </div>
            <div className={styles.modalNote}>
              {confirmed.emailSent
                ? `Email sent.`
                : `Email failed. Your code is ${confirmed.token} and your link is ec-games.vercel.app/rooms/${confirmed.slug}?b=${confirmed.token}`
              }
            </div>
            <button className={styles.modalBtn} onClick={() => setConfirmed(null)}>Done</button>
          </div>
        </div>
      )}
    </>
  )
}
