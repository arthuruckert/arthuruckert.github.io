import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, toggle } = useLanguage()

  const links = t(lang, 'navbar.links')
  const cta = t(lang, 'navbar.cta')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
          transition: 'all 0.4s ease',
        }}
      >
        <div className="navbar-inner" style={{
          maxWidth: 1400, margin: '0 auto', padding: '0 48px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: '-0.02em', color: 'var(--text)' }}>Arthur</span>
              <span style={{ fontWeight: 300, fontSize: 15, letterSpacing: '-0.02em', color: 'var(--muted)' }}> Rückert</span>
            </a>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <a href="https://instagram.com/ruckert_" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--subtle)', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--subtle)'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/ruckert/" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--subtle)', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--subtle)'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="desktop-nav">
            {links.map(([href, label]) => (
              <a key={href} href={href} style={{
                color: scrolled ? 'var(--muted)' : 'rgba(255,255,255,0.75)',
                fontSize: 13, fontWeight: 500,
                textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = scrolled ? 'var(--muted)' : 'rgba(255,255,255,0.75)'}
              >{label}</a>
            ))}
            <button
              onClick={toggle}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 100,
                padding: '6px 14px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--muted)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
            <Magnetic>
              <a href="#contato" style={{
                background: scrolled ? 'var(--text)' : 'rgba(255,255,255,0.12)',
                border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.25)',
                color: scrolled ? 'var(--bg)' : '#fff',
                padding: '8px 20px', borderRadius: 100, fontSize: 13, fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.3s',
                backdropFilter: scrolled ? 'none' : 'blur(8px)',
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >{cta}</a>
            </Magnetic>
          </nav>

          {/* Lang toggle — mobile only */}
          <button
            onClick={toggle}
            className="mobile-lang-btn"
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 100,
              padding: '5px 12px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--muted)',
              cursor: 'pointer',
            }}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>

          <button onClick={() => setOpen(o => !o)} className="burger-btn" style={{
            display: 'none', flexDirection: 'column', gap: 5,
            background: 'none', border: 'none', padding: 8, zIndex: 110,
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2,
                background: 'var(--text)', borderRadius: 2, transition: 'all 0.3s',
                transform: open && i === 0 ? 'translateY(7px) rotate(45deg)' : open && i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {links.map(([href, label], i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  color: 'var(--text)', fontSize: 48, fontWeight: 900,
                  letterSpacing: '-0.04em', textDecoration: 'none', padding: '6px 0',
                }}
              >{label}</motion.a>
            ))}
            <motion.button
              onClick={toggle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.08 + 0.08 }}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 100,
                padding: '8px 20px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--muted)',
                cursor: 'pointer',
                marginTop: 16,
              }}
            >
              {lang === 'pt' ? 'EN' : 'PT'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display:none!important; }
          .burger-btn { display:flex!important; }
          .mobile-lang-btn { display:block!important; }
        }
      `}</style>
    </>
  )
}
