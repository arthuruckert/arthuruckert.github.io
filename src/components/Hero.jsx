import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'
import { assetUrl } from '../utils/assetUrl'

export default function Hero() {
  const { lang } = useLanguage()
  const tr = t(lang, 'hero')

  return (
    <section className="hero-section" style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── LEFT ── */}
      <div className="hero-left" style={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '120px 48px 60px',
        position: 'relative', zIndex: 1,
      }}>

        {/* Top: status + location */}
        <div className="hero-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1px solid var(--border)', borderRadius: 100,
              padding: '5px 14px',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
              boxShadow: '0 0 8px rgba(34,197,94,0.9)', display: 'inline-block',
            }} />
            <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
              {tr.status}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: 'right' }}
          >
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {tr.location}
            </div>
          </motion.div>
        </div>

        {/* Center: big name */}
        <div>
          <div style={{ overflow: 'hidden', marginBottom: 6 }}>
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(64px, 10vw, 130px)',
                fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.92,
                color: 'var(--text)',
              }}
            >
              Arthur
            </motion.div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(64px, 10vw, 130px)',
                fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.92,
                color: 'var(--accent)', fontStyle: 'italic',
              }}
            >
              Rückert.
            </motion.div>
          </div>

          {/* Role tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ marginTop: 28 }}
          >
            <span style={{
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--muted)', fontWeight: 600,
              borderBottom: '1px solid var(--border)', paddingBottom: 4,
            }}>
              {tr.roleTag}
            </span>
          </motion.div>
        </div>

        {/* Bottom: desc + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <p style={{
            fontSize: 14, color: 'var(--muted)', lineHeight: 1.8,
            maxWidth: 380, marginBottom: 28, fontWeight: 300,
          }}>
            {tr.description}
            <br /><br />
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
              {tr.secondary}
            </span>
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Magnetic>
              <a href="#cases" style={{
                background: 'var(--accent)', color: '#080807',
                padding: '12px 28px', borderRadius: 100,
                fontSize: 13, fontWeight: 700,
                textDecoration: 'none', display: 'inline-block',
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {tr.ctaPrimary}
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contato" style={{
                border: '1px solid var(--border)', color: 'var(--muted)',
                padding: '12px 28px', borderRadius: 100,
                fontSize: 13, fontWeight: 500,
                textDecoration: 'none', display: 'inline-block',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                {tr.ctaSecondary}
              </a>
            </Magnetic>
          </div>

          {/* Stats row */}
          <div className="hero-stats" style={{
            marginTop: 40, paddingTop: 32,
            borderTop: '1px solid var(--border)',
            display: 'flex', gap: 36,
          }}>
            {tr.stats.map(({ value, badge, label }) => (
              <div key={label}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)' }}>{value}</span>
                  {badge && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>{badge}</span>}
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT: Photo ── */}
      <motion.div
        className="hero-right"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', overflow: 'hidden',
          borderLeft: '1px solid var(--border)',
        }}
      >
        <img
          src={assetUrl('/arthur.jpg')}
          alt="Arthur Rückert"
          className="hero-photo"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 20%',
            display: 'block',
          }}
        />
        {/* Gradient overlay bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* Gradient overlay left edge */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '20%',
          background: 'linear-gradient(to right, var(--bg) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: 'absolute', bottom: 28, right: 24,
            fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            writingMode: 'vertical-rl',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          {tr.scroll}
        </motion.div>
      </motion.div>

    </section>
  )
}
