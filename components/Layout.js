// components/Layout.js
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './Layout.module.css'
import { useGameNav } from '../lib/GameNavContext'

export default function Layout({ children }) {
  const router = useRouter()
  const isGameRoom = router.pathname === '/rooms/[slug]'
  const year = new Date().getFullYear()
  const [menuOpen, setMenuOpen] = useState(false)
  const { gameNav } = useGameNav()

  const navLinks = [
    { href: 'https://ec-core.vercel.app/', label: 'Home' },
    { href: '/rooms', label: 'Games' },
  ]

  return (
    <div className={styles.shell}>

      <nav className={styles.nav}>
        <Link href="https://ec-core.vercel.app/" className={styles.logo}>
          ESCAPE<span>/</span>CITY
        </Link>

        {isGameRoom && gameNav ? (
          <>
            <div className={styles.gameNavCenter}>
              {gameNav.timer && (
                <span className={styles.gameNavTimer}>{gameNav.timer}</span>
              )}
              {gameNav.pips && (
                <div className={styles.gameNavPips}>{gameNav.pips}</div>
              )}
            </div>
            <div className={styles.navRight}>
              {gameNav.devBadge}
            </div>
          </>
        ) : (
          <>
            {!isGameRoom && (
              <div className={styles.navLinks}>
                {navLinks.map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`${styles.navLink} ${router.pathname === l.href || (l.href !== '/' && router.pathname.startsWith(l.href.split('#')[0])) ? styles.navLinkActive : ''}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
            <div className={styles.navRight}>
              {!isGameRoom && (
                <button
                  className={styles.hamburger}
                  onClick={() => setMenuOpen(o => !o)}
                  aria-label="Menu"
                  aria-expanded={menuOpen}
                >
                  <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
                  <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
                  <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
                </button>
              )}
            </div>
          </>
        )}
      </nav>

      {!isGameRoom && menuOpen && (
        <div className={styles.dropdown}>
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.dropLink} ${router.pathname === l.href ? styles.dropLinkActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/rooms" className={styles.dropCta} onClick={() => setMenuOpen(false)}>
            Play Now
          </Link>
        </div>
      )}

      <main className={styles.main}>
        {children}
      </main>

      {!isGameRoom && (
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerLeft}>
              <div className={styles.footerLogo}>ESCAPE<span>/</span>CITY</div>
              <div className={styles.footerCopy}>© {year} Escape City. All rights reserved.</div>
            </div>
            <div className={styles.footerRight}>
              <div className={styles.social}>
                <a href="https://instagram.com/escapecity" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://tiktok.com/@escapecity" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
                  <TikTokIcon />
                </a>
                <a href="https://twitter.com/escapecity" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="X / Twitter">
                  <XIcon />
                </a>
              </div>
              <div className={styles.legal}>
                <Link href="/terms" className={styles.legalLink}>Terms</Link>
                <span className={styles.legalDot}>·</span>
                <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
              </div>
            </div>
          </div>
        </footer>
      )}

    </div>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
