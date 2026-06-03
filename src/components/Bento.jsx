import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'

const cardsMeta = [
  { size: 'large', value: '79%', accent: '#e63946' },
  { size: 'small', value: 'ROAS 19x', accent: '#8b5cf6' },
  { size: 'small', value: '$200K+', badge: 'USD', accent: '#f59e0b' },
  { size: 'medium', value: '0 → 500', accent: '#3b82f6' },
  { size: 'medium', value: 'ROAS 10x', accent: '#10b981' },
  { size: 'small', value: '19,8M', accent: '#06b6d4' },
]

function BentoCard({ meta, label, sub, index }) {
  return (
    <motion.div
      className={`bento-card-${meta.size}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: meta.size === 'large' ? '40px' : '28px 28px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
        gridColumn: meta.size === 'large' ? 'span 2' : 'span 1',
        gridRow: meta.size === 'large' ? 'span 2' : 'span 1',
        minHeight: meta.size === 'large' ? 280 : 160,
        transition: 'border-color 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${meta.accent}40`}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 0% 0%, ${meta.accent}10 0%, transparent 60%)`,
      }} />

      <div className="label" style={{ position: 'relative', zIndex: 1 }}>{label}</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <div style={{
            fontSize: meta.size === 'large' ? 'clamp(52px, 6vw, 80px)' : 'clamp(32px, 4vw, 48px)',
            fontWeight: 900, letterSpacing: '-0.04em',
            color: meta.accent, lineHeight: 1,
            textShadow: `0 0 40px ${meta.accent}40`,
          }}>
            {meta.value}
          </div>
          {meta.badge && (
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: meta.accent, opacity: 0.6, textTransform: 'uppercase' }}>
              {meta.badge}
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{sub}</div>
      </div>
    </motion.div>
  )
}

export default function Bento() {
  const { lang } = useLanguage()
  const tr = t(lang, 'bento')

  return (
    <section className="mobile-section" style={{ padding: '100px 48px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="label" style={{ marginBottom: 14 }}>{tr.sectionLabel}</p>
            <SplitHeadline headlineA={tr.headlineA} headlineB={tr.headlineB} />
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 280, lineHeight: 1.6 }}>
            {tr.subtitle.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
        </div>

        <div className="bento-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
        }}>
          {cardsMeta.map((meta, i) => (
            <BentoCard
              key={i}
              meta={meta}
              label={tr.cards[i].label}
              sub={tr.cards[i].sub}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function SplitHeadline({ headlineA, headlineB }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em' }}
    >
      {headlineA}<br />
      <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{headlineB}</span>
    </motion.h2>
  )
}
