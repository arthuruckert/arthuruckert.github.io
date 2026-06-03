import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'

const servicesMeta = [
  {
    num: '01',
    tags: ['Campaigns', 'Scaling', 'ROAS', 'Retargeting'],
    accent: '#e63946',
  },
  {
    num: '02',
    tags: ['UGC', 'Copywriting', 'A/B Testing', 'Video Ads'],
    accent: '#8b5cf6',
  },
  {
    num: '03',
    tags: ['Funnel', 'LTV', 'CPA', 'Scale'],
    accent: '#3b82f6',
  },
  {
    num: '04',
    tags: ['Search', 'Shopping'],
    accent: '#10b981',
  },
  {
    num: '05',
    tags: ['ChatGPT', 'Make.com', 'Automation', 'Reporting'],
    accent: '#f59e0b',
  },
]

export default function Services() {
  const [open, setOpen] = useState(-1)
  const { lang } = useLanguage()
  const tr = t(lang, 'services')

  const services = servicesMeta.map((meta, i) => ({
    ...meta,
    title: tr.items[i].title,
    desc: tr.items[i].desc,
  }))

  return (
    <section id="sobre" className="mobile-section" style={{ padding: '100px 48px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ marginBottom: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="label" style={{ marginBottom: 14 }}>{tr.sectionLabel}</p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em' }}
            >
              {tr.headlineA}<br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{tr.headlineB}</span>
            </motion.h2>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 260, lineHeight: 1.6 }}>
            {tr.subtitle}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((s, i) => (
            <ServiceRow key={s.num} s={s} index={i} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ s, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '28px 0', cursor: 'none',
          display: 'flex', alignItems: 'center', gap: 24,
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 11, color: 'var(--subtle)', fontWeight: 600, letterSpacing: '0.1em', minWidth: 28 }}>
          {s.num}
        </span>
        <span style={{
          fontSize: 'clamp(18px, 2.2vw, 26px)', fontWeight: 800, letterSpacing: '-0.02em',
          color: isOpen ? s.accent : 'var(--text)',
          transition: 'color 0.3s', flex: 1,
        }}>
          {s.title}
        </span>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          border: `1px solid ${isOpen ? s.accent : 'var(--border)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s', flexShrink: 0,
          transform: isOpen ? 'rotate(45deg)' : 'none',
          color: isOpen ? s.accent : 'var(--muted)',
          fontSize: 18,
        }}>
          +
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="services-expanded" style={{ paddingLeft: 52, paddingBottom: 32, display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, maxWidth: 480, flex: 1 }}>
                {s.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignContent: 'flex-start' }}>
                {s.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                    border: `1px solid ${s.accent}40`, color: s.accent,
                    padding: '4px 12px', borderRadius: 100, fontWeight: 600,
                    background: `${s.accent}08`,
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
