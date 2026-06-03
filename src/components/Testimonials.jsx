import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import CaseModal from './CaseModal'
import { cases } from '../data/cases'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'
import { assetUrl } from '../utils/assetUrl'

const featured = [
  {
    caseId: 'neg',
    badge: '19,8M views',
    badgeAccent: '#06b6d4',
    video: assetUrl('/assets/img/neg_depoimento.mp4'),
    subtitles: assetUrl('/assets/img/neg_depoimento.vtt'),
    subtitlesEn: assetUrl('/assets/img/neg_depoimento.en.vtt'),
    quote: 'De 9K para 136K no Instagram e 868K no TikTok. Arthur entendeu que o problema não era o conteúdo — era a distribuição. Com a estratégia certa, um vídeo impulsionado explodia organicamente.',
    quoteEn: 'From 9K to 136K on Instagram and 868K on TikTok. Arthur understood the problem wasn\'t the content — it was distribution. With the right strategy, a boosted video exploded organically.',
    author: 'Negãozin',
    role: 'Creator · TikTok & Instagram',
    instagram: 'https://www.instagram.com/negaoziin/',
  },
  {
    caseId: 'ks',
    badge: '↓79% CPL',
    badgeAccent: '#e63946',
    video: assetUrl('/assets/img/ks_depoimento.mp4'),
    subtitles: assetUrl('/assets/img/ks_depoimento.vtt'),
    subtitlesEn: assetUrl('/assets/img/ks_depoimento.en.vtt'),
    quote: 'Arthur entendeu o nosso negócio, identificou onde estávamos perdendo dinheiro e entregou resultados reais em poucas semanas. O CPL caiu mais de 79% e a qualidade dos leads melhorou muito.',
    quoteEn: 'Arthur understood our business, identified where we were losing money, and delivered real results in just a few weeks. CPL dropped over 79% and lead quality improved significantly.',
    author: 'Valmor',
    role: 'Fundador · KS Metais',
    instagram: 'https://www.instagram.com/ksmetais/',
  },
  {
    caseId: 'ct',
    badge: 'ROAS 6-7x',
    badgeAccent: '#f59e0b',
    video: assetUrl('/assets/img/ct_depoimento.mp4'),
    subtitles: assetUrl('/assets/img/ct_depoimento.vtt'),
    subtitlesEn: assetUrl('/assets/img/ct_depoimento.en.vtt'),
    quote: 'As campanhas trouxeram o crescimento que precisávamos — tanto em audiência quanto em vendas. De 7K para 32K seguidores com ROAS 6-7x. A collab com YSL amplificou tudo.',
    quoteEn: 'The campaigns brought the growth we needed — both in audience and in sales. From 7K to 32K followers with ROAS 6-7x. The YSL collab amplified everything.',
    author: 'Fundadora',
    role: 'Casa Tropical · Moda Premium',
    instagram: 'https://www.instagram.com/casatropical_/',
  },
]

export default function Testimonials() {
  const [activeCase, setActiveCase] = useState(null)
  const { lang } = useLanguage()
  const tr = t(lang, 'testimonials')

  const openCase = (caseId) => {
    const c = cases.find(c => c.id === caseId)
    if (c) setActiveCase(c)
  }

  return (
    <>
      <section className="mobile-section" style={{ padding: '100px 48px', borderTop: '1px solid var(--border)' }}>
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
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'right' }}
            >
              <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.04em' }}>98%</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 3 }}>
                {tr.satisfactionLabel}
              </div>
            </motion.div>
          </div>

          {/* 3 cards */}
          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {featured.map((item, i) => (
              <TestimonialCard
                key={item.caseId}
                t={item}
                index={i}
                onViewCase={() => openCase(item.caseId)}
                viewCaseLabel={tr.viewCase}
                instagramLabel={tr.instagram}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {activeCase && (
        <CaseModal c={activeCase} onClose={() => setActiveCase(null)} />
      )}

      <style>{`
        @media (max-width: 820px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

function TestimonialCard({ t: item, index, onViewCase, viewCaseLabel, instagramLabel, lang }) {
  const [hovered, setHovered] = useState(false)
  const [muted, setMuted] = useState(true)
  // ccMode: 'off' | 'pt' | 'en'
  const [ccMode, setCcMode] = useState(lang)
  const videoRef = useRef(null)

  // Apply track mode whenever ccMode changes or tracks load
  const applyTracks = (mode) => {
    if (!videoRef.current) return
    const tracks = videoRef.current.textTracks
    for (let i = 0; i < tracks.length; i++) {
      const tl = tracks[i].language
      tracks[i].mode = (mode === 'pt' && tl === 'pt') || (mode === 'en' && tl === 'en') ? 'showing' : 'hidden'
    }
  }

  // Auto-set captions language when page language changes
  useEffect(() => {
    setCcMode(lang)
    applyTracks(lang)
  }, [lang])

  // Also apply once tracks are loaded (they may not be ready on first render)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onLoad = () => applyTracks(ccMode)
    v.addEventListener('loadedmetadata', onLoad)
    // Try immediately too
    applyTracks(ccMode)
    return () => v.removeEventListener('loadedmetadata', onLoad)
  }, [])

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  const handleClick = () => {
    if (!videoRef.current) return
    const nextMuted = !muted
    videoRef.current.muted = nextMuted
    setMuted(nextMuted)
    if (videoRef.current.paused) videoRef.current.play()
  }

  const handleFullscreen = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      ;(document.exitFullscreen || document.webkitExitFullscreen || (() => {})).call(document)
    } else if (v.requestFullscreen) {
      v.requestFullscreen()
    } else if (v.webkitEnterFullscreen) {
      // iOS Safari
      v.webkitEnterFullscreen()
    } else if (v.webkitRequestFullscreen) {
      v.webkitRequestFullscreen()
    }
  }

  const handleCaptions = (e) => {
    e.stopPropagation()
    const next = ccMode === 'off' ? 'pt' : ccMode === 'pt' ? 'en' : 'off'
    setCcMode(next)
    applyTracks(next)
  }

  const quote = lang === 'en' && item.quoteEn ? item.quoteEn : item.quote

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'var(--card)',
        border: `1px solid ${hovered ? item.badgeAccent + '35' : 'var(--border)'}`,
        borderRadius: 20, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'border-color 0.3s',
      }}
    >
      {/* Video */}
      <div
        onClick={handleClick}
        style={{ height: 260, position: 'relative', overflow: 'hidden', background: '#111', flexShrink: 0, cursor: 'pointer' }}
      >
        <video
          ref={videoRef}
          src={item.video}
          playsInline
          autoPlay
          muted
          loop
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        >
          {item.subtitles && (
            <track kind="subtitles" src={item.subtitles} srcLang="pt" label="Português" />
          )}
          {item.subtitlesEn && (
            <track kind="subtitles" src={item.subtitlesEn} srcLang="en" label="English" />
          )}
        </video>

        {/* Sound toggle overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}>
            {muted ? (
              /* Muted icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              /* Sound on icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </div>
        </motion.div>

        {/* Gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to top, rgba(17,17,17,0.95) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Subtitles hint pill */}
        {item.subtitles && (
          <div style={{
            position: 'absolute', top: 14, right: 14,
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6, padding: '3px 7px',
            pointerEvents: 'none',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2"/>
              <path d="M8 12h2M14 12h2M8 15h8"/>
            </svg>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>PT · EN</span>
          </div>
        )}

        {/* Badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: `${item.badgeAccent}22`,
          border: `1px solid ${item.badgeAccent}55`,
          color: item.badgeAccent,
          fontSize: 11, fontWeight: 800, letterSpacing: '0.04em',
          padding: '5px 12px', borderRadius: 100,
          backdropFilter: 'blur(8px)',
        }}>
          {item.badge}
        </div>

        {/* Name over photo */}
        <div style={{ position: 'absolute', bottom: 16, left: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em' }}>{item.author}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>{item.role}</div>
        </div>

        {/* Action buttons bottom-right */}
        <div
          onClick={e => e.stopPropagation()}
          style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', gap: 6, zIndex: 2 }}
        >
          {/* CC button — cycles: off → PT → EN → off */}
          {item.subtitles && (
            <button
              onClick={handleCaptions}
              style={{
                background: ccMode !== 'off' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${ccMode !== 'off' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}`,
                borderRadius: 6,
                padding: '4px 8px',
                fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
                color: ccMode !== 'off' ? '#fff' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {ccMode === 'off' ? 'CC' : ccMode === 'pt' ? 'CC PT' : 'CC EN'}
            </button>
          )}
          {/* Fullscreen button */}
          <button
            onClick={handleFullscreen}
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 6,
              width: 28, height: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"/>
              <polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/>
              <line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          </button>
        </div>

      </div>

      {/* Quote */}
      <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
          "{quote}"
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onViewCase}
            style={{
              flex: 1,
              background: `${item.badgeAccent}15`,
              border: `1px solid ${item.badgeAccent}35`,
              color: item.badgeAccent,
              padding: '10px 0', borderRadius: 10,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${item.badgeAccent}25`; e.currentTarget.style.borderColor = `${item.badgeAccent}60` }}
            onMouseLeave={e => { e.currentTarget.style.background = `${item.badgeAccent}15`; e.currentTarget.style.borderColor = `${item.badgeAccent}35` }}
          >
            {viewCaseLabel}
          </button>
          <a
            href={item.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              padding: '10px 0', borderRadius: 10,
              fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none', textAlign: 'center',
              display: 'block', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              {instagramLabel}
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
