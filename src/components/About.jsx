import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'
import { assetUrl } from '../utils/assetUrl'

const stack = [
  'Meta Ads', 'Google Ads', 'TikTok Ads',
  'ChatGPT', 'Make.com', 'Midjourney',
  'Notion', 'Looker Studio', 'Triple Whale',
  'Klaviyo', 'Shopify', 'Hotjar', 'Claude',
]

export default function About() {
  const { lang } = useLanguage()
  const tr = t(lang, 'about')

  return (
    <section className="mobile-section" style={{ padding: '100px 48px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div className="about-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left: text */}
          <div>
            <p className="label" style={{ marginBottom: 14 }}>{tr.sectionLabel}</p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 32 }}
            >
              {tr.headlineA}<br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{tr.headlineB}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
                {tr.bio1}
              </p>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
                {tr.bio2}
              </p>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
                  {tr.bio3}
                </span>
              </p>
            </motion.div>

            {/* Stack */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              style={{ marginTop: 40 }}
            >
              <p className="label" style={{ marginBottom: 16 }}>{tr.stackLabel}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {stack.map(item => (
                  <span key={item} style={{
                    fontSize: 11, letterSpacing: '0.05em',
                    border: '1px solid var(--border)', color: 'var(--muted)',
                    padding: '5px 12px', borderRadius: 100,
                    background: 'var(--card)',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--text)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                  >{item}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: photo + stats */}
          <div>
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: 20, overflow: 'hidden',
                border: '1px solid var(--border)',
                height: 400, position: 'relative',
                marginBottom: 24,
              }}
            >
              <img
                src={assetUrl('/arthur.jpg')}
                alt="Arthur Rückert"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, var(--bg) 0%, transparent 50%)',
                pointerEvents: 'none',
              }} />
              {/* Badge */}
              <div style={{
                position: 'absolute', bottom: 20, left: 20,
                background: 'rgba(8,8,8,0.8)', backdropFilter: 'blur(12px)',
                border: '1px solid var(--border)', borderRadius: 12,
                padding: '10px 16px',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Arthur Rückert</div>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2, letterSpacing: '0.05em' }}>Media Buyer · Meta Ads Specialist</div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {tr.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  style={{
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 14, padding: '20px 20px',
                  }}
                >
                  <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text)' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
