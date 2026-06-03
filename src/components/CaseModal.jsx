import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, cursor: 'zoom-out',
      }}
    >
      <motion.img
        src={src}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '92vw', maxHeight: '90vh',
          objectFit: 'contain', display: 'block',
          borderRadius: 12,
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          cursor: 'default',
        }}
      />
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: 20, right: 20,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', fontSize: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >×</button>
    </motion.div>
  )
}

const RESULT_LABELS = ['Meta Ads Manager', 'Zeus / Dashboard']

function ResultsSection({ c, onZoom, ui }) {
  const imgs = c.resultsImages && c.resultsImages.length > 0
    ? c.resultsImages
    : c.resultsImage
      ? [c.resultsImage]
      : []

  if (imgs.length === 0) return null

  return (
    <div style={{ marginBottom: 40 }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <p className="label" style={{ margin: 0 }}>{ui?.results || 'Resultados'}</p>
        <span style={{
          fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: c.accent, border: `1px solid ${c.accent}40`,
          padding: '2px 8px', borderRadius: 100,
          background: `${c.accent}10`,
        }}>{c.resultsLabel || `${imgs.length} print${imgs.length > 1 ? 's' : ''}`}</span>
      </div>

      {/* Screenshots */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: imgs.length > 1 ? '1fr 1fr' : '1fr',
        gap: 10,
      }}>
        {imgs.map((img, i) => (
          <div key={i} onClick={() => onZoom(img)} style={{
            borderRadius: 14,
            overflow: 'hidden',
            border: `1px solid ${c.accent}25`,
            background: '#141414',
            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03), inset 0 0 20px ${c.accent}06`,
            cursor: 'zoom-in',
            gridColumn: imgs.length % 2 !== 0 && i === imgs.length - 1 ? 'span 2' : 'span 1',
          }}>
            {/* Window chrome bar */}
            <div style={{
              background: '#1c1c1c',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '8px 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map((col, di) => (
                    <div key={di} style={{ width: 8, height: 8, borderRadius: '50%', background: col, opacity: 0.7 }} />
                  ))}
                </div>
              </div>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>{ui.zoom}</span>
            </div>
            {/* Screenshot image */}
            <img
              src={img}
              alt={RESULT_LABELS[i] || `Resultado ${i + 1}`}
              style={{ width: '100%', display: 'block', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
              onError={e => { e.target.parentElement.style.display = 'none' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CaseModal({ c, onClose }) {
  const scrollRef = useRef(null)
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const { lang } = useLanguage()

  // Helper: pick EN field if available, fallback to PT
  const loc = (field) => (lang === 'en' && c.en?.[field]) ? c.en[field] : c[field]

  const ui = {
    results: lang === 'en' ? 'Results' : 'Resultados',
    story: lang === 'en' ? 'The story' : 'A história',
    creatives: lang === 'en' ? 'Creatives used' : 'Criativos rodados',
    videoCreatives: lang === 'en' ? 'Video creatives' : 'Criativos em vídeo',
    withClient: lang === 'en' ? 'With the client' : 'Com o cliente',
    testimonial: lang === 'en' ? 'Testimonial' : 'Depoimento',
    metaAds: lang === 'en' ? 'Creatives used on Meta Ads' : 'Criativos utilizados no Meta Ads',
    pieces: lang === 'en' ? 'pieces' : 'peças',
    videos: lang === 'en' ? 'videos' : 'vídeos',
    zoom: lang === 'en' ? '↗ zoom' : '↗ ampliar',
    close: lang === 'en' ? 'Close' : 'Fechar',
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fn = (e) => { if (e.key === 'Escape') { lightboxSrc ? setLightboxSrc(null) : onClose() } }
    window.addEventListener('keydown', fn)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', fn)
    }
  }, [lightboxSrc])

  return (
    <>
    <AnimatePresence>
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </AnimatePresence>
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9000,
          background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}
      >
        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: '#0e0e0e',
            border: `1px solid ${c.accent}30`,
            borderRadius: 28,
            maxWidth: 680, width: '100%',
            maxHeight: '92vh', overflowY: 'auto',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div style={{ position: 'relative' }}>
            {/* Cover image */}
            <div style={{ height: 240, overflow: 'hidden', borderRadius: '28px 28px 0 0', background: '#111' }}>
              <img
                src={c.image}
                alt={c.client}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.imagePosition || 'center', display: 'block' }}
                onError={e => { e.target.style.display = 'none' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, #0e0e0e 0%, rgba(14,14,14,0.1) 55%)` }} />
            </div>

            {/* Close */}
            <button onClick={onClose} style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%', width: 38, height: 38,
              color: 'rgba(255,255,255,0.7)', fontSize: 20, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', zIndex: 2,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >×</button>

            {/* Num badge */}
            <div style={{
              position: 'absolute', top: 18, left: 22,
              fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em',
            }}>{c.num}</div>

            {/* Client name row */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '0 28px 22px',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{c.client}</div>
                <div style={{ fontSize: 10, color: `${c.accent}cc`, marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{loc('tag')}</div>
              </div>
              <div style={{
                background: `${c.accent}20`, border: `1px solid ${c.accent}50`,
                color: c.accent, fontSize: 12, fontWeight: 800,
                padding: '5px 14px', borderRadius: 100,
              }}>{c.metrics[0].value}</div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '32px 36px 44px' }}>

            {/* Headline */}
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900,
              letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 28,
            }}>
              {loc('headline').split('·').map((part, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ color: 'var(--muted)' }}> · </span>}
                  <span style={{ color: i === 0 ? 'var(--text)' : c.accent }}>{part.trim()}</span>
                </span>
              ))}
            </h2>

            {/* Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(c.metrics.length, 4)}, 1fr)`,
              gap: 8, marginBottom: 36,
            }}>
              {loc('metrics').map(m => (
                <div key={m.label} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${c.accent}20`,
                  borderRadius: 14, padding: '16px 16px',
                }}>
                  <div style={{
                    fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em',
                    color: c.accent, lineHeight: 1,
                    textShadow: `0 0 20px ${c.accent}30`,
                  }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.3 }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Story */}
            {loc('story') && (
              <div style={{ marginBottom: 36 }}>
                <p className="label" style={{ marginBottom: 20 }}>{ui.story}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {loc('story').map((s, i) => (
                    <div key={i} style={{
                      display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16,
                      padding: '20px 0',
                      borderTop: i === 0 ? `1px solid rgba(255,255,255,0.06)` : `1px solid rgba(255,255,255,0.04)`,
                    }}>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.accent, marginBottom: 4 }}>{s.step}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', lineHeight: 1.35 }}>{s.title}</div>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{s.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Criativos rodados */}
            {c.gallery && c.gallery.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <p className="label" style={{ margin: 0 }}>{c.galleryLabel || ui.creatives}</p>
                  <span style={{
                    fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--muted)', border: '1px solid var(--border)',
                    padding: '2px 8px', borderRadius: 100,
                  }}>{c.gallery.length} {ui.pieces}</span>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 6,
                }}>
                  {c.gallery.map((img, i) => (
                    <div key={i} onClick={() => setLightboxSrc(img)} style={{
                      borderRadius: 10, overflow: 'hidden',
                      background: '#111',
                      aspectRatio: '1',
                      position: 'relative',
                      cursor: 'zoom-in',
                    }}>
                      <img src={img} alt={`Criativo ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                        onError={e => { e.target.parentElement.style.display = 'none' }}
                      />
                      {/* Zoom hint */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.25)'; e.currentTarget.querySelector('span').style.opacity = '1' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; e.currentTarget.querySelector('span').style.opacity = '0' }}
                      >
                        <span style={{
                          fontSize: 20, opacity: 0, transition: 'opacity 0.2s',
                          background: 'rgba(0,0,0,0.5)', borderRadius: '50%',
                          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>⊕</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Criativos em vídeo (Vimeo) */}
            {c.vimeoCreatives && c.vimeoCreatives.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <p className="label" style={{ margin: 0 }}>{ui.videoCreatives}</p>
                  <span style={{
                    fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: c.accent, border: `1px solid ${c.accent}40`,
                    padding: '2px 8px', borderRadius: 100,
                    background: `${c.accent}10`,
                  }}>{c.vimeoCreatives.length} {ui.videos}</span>
                </div>
                <div style={{
                  display: 'flex',
                  gap: 10,
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  margin: '0 -36px',
                  padding: '4px 36px 12px',
                }}>
                  {c.vimeoCreatives.map((v, i) => (
                    <div key={i} style={{
                      flexShrink: 0,
                      width: 200,
                      height: 355,
                      borderRadius: 12, overflow: 'hidden',
                      border: `1px solid ${c.accent}20`,
                      background: '#111',
                      scrollSnapAlign: 'start',
                      boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
                      position: 'relative',
                    }}>
                      <iframe
                        src={`https://player.vimeo.com/video/${v.id}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0`}
                        title={v.title}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      />
                    </div>
                  ))}
                  <div style={{ width: 20, flexShrink: 0 }} />
                </div>
              </div>
            )}

            {/* Fotos com o cliente (array) */}
            {loc('clientPhotos') && loc('clientPhotos').length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <p className="label" style={{ margin: 0 }}>{ui.withClient}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {loc('clientPhotos').map((photo, i) => (
                    <div key={i} onClick={() => setLightboxSrc(photo.src)} style={{
                      borderRadius: 14, overflow: 'hidden',
                      border: `1px solid ${c.accent}20`,
                      background: '#111', cursor: 'zoom-in', position: 'relative',
                    }}>
                      <img src={photo.src} alt={photo.caption}
                        style={{ width: '100%', display: 'block', maxHeight: 360, objectFit: 'cover', objectPosition: photo.position || 'center', transition: 'opacity 0.2s' }}
                        onMouseEnter={e => e.target.style.opacity = '0.88'}
                        onMouseLeave={e => e.target.style.opacity = '1'}
                        onError={e => e.target.parentElement.style.display = 'none'}
                      />
                      {photo.caption && (
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          padding: '24px 16px 14px',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                          fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em',
                        }}>{photo.caption}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Foto com o cliente */}
            {loc('clientPhoto') && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <p className="label" style={{ margin: 0 }}>{ui.withClient}</p>
                </div>
                <div
                  onClick={() => setLightboxSrc(loc('clientPhoto').src)}
                  style={{
                    borderRadius: 14, overflow: 'hidden',
                    border: `1px solid ${c.accent}20`,
                    background: '#111',
                    cursor: 'zoom-in',
                    position: 'relative',
                  }}
                >
                  <img
                    src={loc('clientPhoto').src}
                    alt={loc('clientPhoto').caption}
                    style={{ width: '100%', display: 'block', maxHeight: 360, objectFit: 'cover', objectPosition: loc('clientPhoto').position || 'center', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.target.style.opacity = '0.88'}
                    onMouseLeave={e => e.target.style.opacity = '1'}
                    onError={e => e.target.parentElement.style.display = 'none'}
                  />
                  {loc('clientPhoto').caption && (
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '24px 16px 14px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                      fontSize: 11, color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.05em',
                    }}>{loc('clientPhoto').caption}</div>
                  )}
                </div>
              </div>
            )}

            {/* Depoimento em vídeo mp4 */}
            {c.testimonialVideo && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <p className="label" style={{ margin: 0 }}>{ui.testimonial}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: 300, height: Math.round(300 * 16 / 9),
                    borderRadius: 16, overflow: 'hidden',
                    border: `1px solid ${c.accent}25`,
                    background: '#111',
                    boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
                    position: 'relative',
                  }}>
                    <video
                      src={c.testimonialVideo}
                      controls
                      playsInline
                      preload="metadata"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Vídeos mp4 */}
            {c.videos && c.videos.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <p className="label" style={{ margin: 0 }}>{c.videosLabel || ui.metaAds}</p>
                  <span style={{
                    fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: c.accent, border: `1px solid ${c.accent}40`,
                    padding: '2px 8px', borderRadius: 100,
                    background: `${c.accent}10`,
                  }}>{c.videos.length} {ui.videos}</span>
                </div>

                {/* Horizontal scroll carousel */}
                <div style={{
                  display: 'flex',
                  gap: 10,
                  overflowX: 'auto',
                  overflowY: 'visible',
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  margin: '0 -36px',
                  padding: '4px 36px 12px',
                }}>
                  {c.videos.map((vid, i) => (
                    <div key={i} style={{
                      flexShrink: 0,
                      width: 200,
                      borderRadius: 12, overflow: 'hidden',
                      border: `1px solid ${c.accent}20`,
                      background: '#111',
                      aspectRatio: '9/16',
                      scrollSnapAlign: 'start',
                      boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
                    }}>
                      <video
                        src={vid}
                        controls
                        playsInline
                        preload="metadata"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  ))}
                  <div style={{ width: 20, flexShrink: 0 }} />
                </div>
                <style>{`div::-webkit-scrollbar{display:none}`}</style>
              </div>
            )}

            {/* Vídeos Vimeo */}
            {c.vimeoVideos && c.vimeoVideos.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <p className="label" style={{ margin: 0 }}>{ui.testimonial}</p>
                  <span style={{
                    fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: c.accent, border: `1px solid ${c.accent}40`,
                    padding: '2px 8px', borderRadius: 100,
                    background: `${c.accent}10`,
                  }}>{c.vimeoVideos.length} vídeos</span>
                </div>

                <div style={{
                  display: 'flex',
                  gap: 12,
                  overflowX: c.vimeoVideos.length > 1 ? 'auto' : 'visible',
                  justifyContent: c.vimeoVideos.length === 1 ? 'center' : 'flex-start',
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  margin: '0 -36px',
                  padding: '4px 36px 12px',
                }}>
                  {c.vimeoVideos.map((v, i) => {
                    const w = c.vimeoVideos.length === 1 ? 300 : 220
                    const h = Math.round(w * 16 / 9)
                    return (
                      <div key={i} style={{
                        flexShrink: 0,
                        width: w,
                        height: h,
                        borderRadius: 16, overflow: 'hidden',
                        border: `1px solid ${c.accent}25`,
                        background: '#111',
                        scrollSnapAlign: 'start',
                        boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
                        position: 'relative',
                      }}>
                        <iframe
                          src={`https://player.vimeo.com/video/${v.id}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0`}
                          title={v.title}
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        />
                      </div>
                    )
                  })}
                  {c.vimeoVideos.length > 1 && <div style={{ width: 20, flexShrink: 0 }} />}
                </div>
              </div>
            )}

            {/* Resultados */}
            <ResultsSection c={c} onZoom={setLightboxSrc} ui={ui} />

            {/* Testimonial */}
            {c.testimonial && (
              <div style={{
                background: `${c.accent}08`,
                border: `1px solid ${c.accent}20`,
                borderRadius: 16, padding: '24px 24px',
                marginBottom: 28,
              }}>
                <div style={{ fontSize: 36, lineHeight: 0.8, color: `${c.accent}30`, fontWeight: 900, fontStyle: 'italic', marginBottom: 12 }}>"</div>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 16 }}>
                  {c.testimonial.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {c.testimonial.photo && (
                    <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.accent}30` }}>
                      <img src={c.testimonial.photo} alt={c.testimonial.author}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => e.target.parentElement.style.display = 'none'}
                      />
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{c.testimonial.author}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1 }}>{c.testimonial.role}</div>
                  </div>
                </div>
              </div>
            )}

            <button onClick={onClose} style={{
              width: '100%', padding: '14px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12, color: 'var(--muted)', fontSize: 13,
              cursor: 'pointer', fontWeight: 500,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--muted)' }}
            >
              {ui.close}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    </>
  )
}
