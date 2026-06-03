import { motion } from 'framer-motion'
import { cases } from '../data/cases'

function CaseRow({ c, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 4 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '52px 1fr auto',
        alignItems: 'center',
        gap: 24,
        padding: '24px 20px',
        borderTop: '1px solid var(--border)',
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--card)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--subtle)', letterSpacing: '0.08em' }}>{c.num}</span>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>{c.client}</span>
          <span style={{
            fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--muted)', border: '1px solid var(--border)',
            padding: '2px 8px', borderRadius: 100,
          }}>{c.tag}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>{c.headline}</p>

        {/* Metrics on hover */}
        <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
          {c.metrics.map(m => (
            <div key={m.label} style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: c.accent, letterSpacing: '-0.02em' }}>{m.value}</span>
              <span style={{ fontSize: 10, color: 'var(--subtle)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: `${c.accent}18`,
        border: `1px solid ${c.accent}33`,
        color: c.accent,
        fontSize: 11, fontWeight: 700,
        padding: '5px 12px', borderRadius: 100, whiteSpace: 'nowrap',
      }}>
        {c.metrics[0].value}
      </div>
    </motion.div>
  )
}

export default function Cases() {
  return (
    <section id="cases" style={{ padding: '100px 32px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 64 }}
        >
          <p className="label" style={{ marginBottom: 16 }}>Cases</p>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>
            Do anúncio ao checkout.
          </h2>
        </motion.div>

        <div>
          {cases.map((c, i) => <CaseRow key={c.id} c={c} index={i} />)}
        </div>
      </div>
    </section>
  )
}
