import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cases } from '../data/cases'
import CaseModal from './CaseModal'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'

const CARD_W = 360
const CARD_GAP = 16

function CaseCard({ c, onClick, viewCaseLabel }) {
  const [hovered, setHovered] = useState(false)
  const loc = (field) => (c.en?.[field]) ? c.en[field] : c[field]

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(c)}
      style={{
        width: CARD_W, flexShrink: 0,
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 20, overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        borderColor: hovered ? `${c.accent}55` : 'var(--border)',
        boxShadow: hovered ? `0 12px 48px ${c.accent}18` : '0 0 0 transparent',
        userSelect: 'none',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Cover — full bleed image */}
      <div style={{ height: 240, position: 'relative', overflow: 'hidden', background: '#0e0e0e' }}>

        <motion.img
          src={c.image}
          alt={c.client}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: c.imagePosition || 'center',
            display: 'block',
          }}
          draggable={false}
          onError={e => { e.target.style.display = 'none' }}
        />

        {/* Gradient overlay — stronger at bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.08) 0%,
            rgba(0,0,0,0.0) 25%,
            rgba(0,0,0,0.55) 70%,
            rgba(0,0,0,0.85) 100%
          )`,
        }} />

        {/* Accent tint */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 80% 120%, ${c.accent}14 0%, transparent 60%)`,
        }} />

        {/* Case number — top left */}
        <div style={{
          position: 'absolute', top: 14, left: 16,
          fontSize: 11, fontWeight: 700,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.14em',
        }}>{c.num}</div>

        {/* Key metric — top right, glassmorphism */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${c.accent}55`,
          color: c.accent,
          fontSize: 11, fontWeight: 800,
          padding: '5px 13px', borderRadius: 100,
          letterSpacing: '0.02em',
        }}>{loc('metrics')[0].value}</div>

        {/* Bottom overlay — client name + tag */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '12px 16px 14px',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8,
        }}>
          <div style={{
            fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em',
            color: '#fff', lineHeight: 1.1,
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          }}>{c.client}</div>

          <div style={{
            fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(6px)',
            padding: '4px 9px', borderRadius: 100,
            flexShrink: 0, whiteSpace: 'nowrap',
          }}>{loc('tag')}</div>
        </div>
      </div>

      {/* Content — minimal */}
      <div style={{ padding: '14px 18px 16px' }}>

        {/* Headline */}
        <p style={{
          fontSize: 13, color: `${c.accent}dd`, lineHeight: 1.45,
          fontWeight: 700, letterSpacing: '-0.01em',
          marginBottom: 14,
          minHeight: 38,
        }}>
          {loc('headline')}
        </p>

        {/* 2 key metrics inline */}
        <div style={{
          display: 'flex', gap: 8, marginBottom: 14,
        }}>
          {loc('metrics').slice(0, 2).map(m => (
            <div key={m.label} style={{
              flex: 1,
              background: `${c.accent}0a`,
              border: `1px solid ${c.accent}20`,
              borderRadius: 10, padding: '8px 10px',
            }}>
              <div style={{
                fontSize: 15, fontWeight: 900, letterSpacing: '-0.03em',
                color: c.accent, lineHeight: 1,
              }}>{m.value}</div>
              <div style={{
                fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase',
                letterSpacing: '0.07em', marginTop: 4, lineHeight: 1.3,
              }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 12,
          borderTop: `1px solid rgba(255,255,255,0.06)`,
          color: hovered ? c.accent : 'var(--muted)',
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          transition: 'color 0.2s',
        }}>
          <span>{viewCaseLabel}</span>
          <motion.svg
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
            width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </motion.svg>
        </div>
      </div>
    </motion.div>
  )
}

export default function CasesScroll() {
  const [activeCase, setActiveCase] = useState(null)
  const scrollRef = useRef(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const moved = useRef(false)
  const { lang } = useLanguage()
  const tr = t(lang, 'cases')

  const handleMouseDown = (e) => {
    isDown.current = true
    moved.current = false
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    scrollRef.current.style.cursor = 'grabbing'
  }

  const handleMouseUp = () => {
    isDown.current = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }

  const handleMouseMove = (e) => {
    if (!isDown.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    if (Math.abs(walk) > 5) moved.current = true
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleCardClick = (c) => {
    if (!moved.current) setActiveCase(c)
  }

  return (
    <>
      <section id="cases" style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
        <div className="cases-header" style={{ padding: '0 48px', maxWidth: 1200, margin: '0 auto 48px' }}>
          <p className="label" style={{ marginBottom: 14 }}>{tr.sectionLabel}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em' }}
            >
              {tr.headlineA}<br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{tr.headlineB}</span>
            </motion.h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 240, lineHeight: 1.6 }}>
              {cases.length} cases · drag or click to explore →
            </p>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="cases-scroll"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            display: 'flex', gap: CARD_GAP,
            padding: '8px 48px 36px',
            overflowX: 'auto',
            overflowY: 'visible',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            cursor: 'grab',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {cases.map(c => (
            <CaseCard key={c.id} c={c} onClick={handleCardClick} viewCaseLabel={tr.viewCase} />
          ))}
          <div style={{ width: 32, flexShrink: 0 }} />
        </div>
      </section>

      {activeCase && (
        <CaseModal c={activeCase} onClose={() => setActiveCase(null)} />
      )}

      <style>{`
        .cases-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  )
}
