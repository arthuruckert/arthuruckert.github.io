import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'

export default function Contact() {
  const { lang } = useLanguage()
  const tr = t(lang, 'contact')

  return (
    <section id="contato" className="mobile-section" style={{ padding: '120px 48px', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 500,
        background: 'radial-gradient(ellipse, rgba(230,57,70,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label"
          style={{ marginBottom: 32 }}
        >
          {tr.sectionLabel}
        </motion.p>

        {/* Headline */}
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95,
              color: 'var(--text)',
            }}
          >
            {tr.headlineA}
          </motion.h2>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 48 }}>
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95,
              color: 'var(--accent)', fontStyle: 'italic',
            }}
          >
            {tr.headlineB}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 460, margin: '0 auto 48px', fontWeight: 300 }}
        >
          {tr.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}
        >
          <Magnetic>
            <a
              href="https://wa.me/5551999999999?text=Oi%20Arthur%2C%20quero%20conversar%20sobre%20Meta%20Ads"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--accent)', color: '#080807',
                padding: '16px 36px', borderRadius: 100,
                fontSize: 14, fontWeight: 700,
                textDecoration: 'none', display: 'inline-block',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {tr.whatsapp}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="mailto:pe.ruckert@gmail.com"
              style={{
                border: '1px solid var(--border)', color: 'var(--muted)',
                padding: '16px 36px', borderRadius: 100,
                fontSize: 14, fontWeight: 500,
                textDecoration: 'none', display: 'inline-block',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {tr.email}
            </a>
          </Magnetic>
        </motion.div>

        {/* Email destaque */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          style={{ marginBottom: 64 }}
        >
          <a href="mailto:pe.ruckert@gmail.com" style={{
            fontSize: 13, color: 'var(--subtle)', textDecoration: 'none',
            letterSpacing: '0.08em', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--muted)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--subtle)'}
          >
            pe.ruckert@gmail.com
          </a>
        </motion.div>

        {/* Social strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          style={{
            paddingTop: 40,
            borderTop: '1px solid var(--border)',
            display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap',
          }}
        >
          {[
            {
              label: 'Instagram', handle: '@ruckert_', href: 'https://instagram.com/ruckert_',
              icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            },
            {
              label: 'LinkedIn', handle: 'Arthur Rückert', href: 'https://www.linkedin.com/in/ruckert/',
              icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: 'none', textAlign: 'center' }}
              onMouseEnter={e => e.currentTarget.querySelector('.handle').style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.querySelector('.handle').style.color = 'var(--muted)'}
            >
              <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--subtle)', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                {s.icon} {s.label}
              </div>
              <div className="handle" style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', transition: 'color 0.2s' }}>{s.handle}</div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
