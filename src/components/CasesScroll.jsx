import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cases } from '../data/cases'
import CaseModal from './CaseModal'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'

const CARD_W = 320
const CARD_GAP = 14

function CaseCard({ c, onClick, lang, viewCaseLabel }) {
  const [hovered, setHovered] = useState(false)
  const loc = (field) => (lang === 'en' && c.en?.[field]) ? c.en[field] : c[field]

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(c)}
      style={{
        width: CARD_W, flexShrink: 0,
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 20, overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
        borderColor: hovered ? `${c.accent}55` : 'var(--border)',
        userSelect: 'none',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Cover — logo only on dark background */}
      <div style={{
        height: 220, position: 'relative',
        background: `radial-gradient(ellipse at 50% 60%, ${c.accent}18 0%, transparent 70%), #0e0e0e`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Subtle grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Accent corner glow */}
        <div style={{
          position: 'absolute', bottom: -40, left: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: `radial-gradient(circle, ${c.accent}22 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Num top-left */}
        <div style={{
          position: 'absolute', top: 14, left: 16,
          fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.14em',
        }}>{c.num}</div>

        {/* Result badge top-right */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: `${c.accent}20`, border: `1px solid ${c.accent}50`,
          color: c.accent, fontSize: 11, fontWeight: 800,
          padding: '4px 12px', borderRadius: 100,
        }}>{loc('metrics')[0].value}</div>

        {/* Logo — centrado e grande */}
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative', zIndex: 1,
            borderRadius: c.logoRound ? '50%' : 14,
            overflow: 'hidden',
            background: c.logoBg || 'transparent',
            padding: c.logoBg ? '12px 20px' : 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: c.logoBg ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          <img
            src={c.logo}
            alt={c.client}
            style={{
              width: c.logoRound ? 96 : c.logoBg ? 160 : 110,
              height: c.logoRound ? 96 : c.logoBg ? 72 : 80,
              objectFit: 'contain',
              display: 'block',
              borderRadius: c.logoRound ? '50%' : 0,
            }}
            onError={e => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `<span style="font-size:28px;font-weight:900;color:${c.accent};letter-spacing:-0.04em">${c.client}</span>`
            }}
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 22px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>{c.client}</span>
          <span style={{
            fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--muted)', border: '1px solid var(--border)',
            padding: '2px 8px', borderRadius: 100, flexShrink: 0,
          }}>{loc('tag')}</span>
        </div>

        {/* Headline */}
        <p style={{
          fontSize: 11, color: `${c.accent}cc`, lineHeight: 1.4,
          marginBottom: 14, fontWeight: 600, letterSpacing: '-0.01em',
        }}>
          {loc('headline')}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', marginBottom: 14, opacity: 0.6 }} />

        {/* Metrics 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 8px' }}>
          {loc('metrics').map(m => (
            <div key={m.label} style={{
              background: `${c.accent}08`,
              border: `1px solid ${c.accent}18`,
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

        {/* Story context line */}
        {loc('story')?.[0] && (
          <p style={{
            fontSize: 10, color: 'rgba(255,255,255,0.28)', lineHeight: 1.5,
            marginTop: 12, paddingTop: 12,
            borderTop: '1px solid var(--border)',
            letterSpacing: '0.01em',
          }}>
            {loc('story')[0].text.length > 90 ? loc('story')[0].text.slice(0, 88) + '…' : loc('story')[0].text}
          </p>
        )}

        {/* View case CTA */}
        <div style={{ marginTop: 14 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: `${c.accent}12`,
            border: `1px solid ${c.accent}35`,
            borderRadius: 12,
            padding: '11px 16px',
            color: c.accent,
            fontSize: 12, fontWeight: 700,
            letterSpacing: '0.02em',
          }}>
            <span>{viewCaseLabel}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </div>
        </div>

        {/* Instagram link */}
        {c.instagram && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <a
              href={c.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 100,
                padding: '6px 12px 6px 8px',
                fontSize: 11, fontWeight: 600,
                color: 'var(--muted)',
                textDecoration: 'none', transition: 'all 0.2s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              {'@' + c.instagram.replace(/https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '')}
            </a>
          </div>
        )}
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
            <p style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 220, lineHeight: 1.5 }}>
              {tr.subtitle}
            </p>
          </div>
        </div>

        {/* Native scroll container */}
        <div
          ref={scrollRef}
          className="cases-scroll"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            display: 'flex', gap: CARD_GAP,
            padding: '8px 48px 32px',
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
            <CaseCard key={c.id} c={c} onClick={handleCardClick} lang={lang} viewCaseLabel={tr.viewCase} />
          ))}
          {/* Right padding trick */}
          <div style={{ width: 32, flexShrink: 0 }} />
        </div>
      </section>

      {activeCase && (
        <CaseModal c={activeCase} onClose={() => setActiveCase(null)} />
      )}

      <style>{`
        div[style*="overflow-x: auto"]::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  )
}
