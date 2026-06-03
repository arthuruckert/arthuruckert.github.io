import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'

/* ── Variants ───────────────────────────────────────────────── */
const stepVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40, filter: 'blur(4px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, filter: 'blur(4px)',
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } }),
}

/* ── Data ───────────────────────────────────────────────────── */
const ADS_OPTIONS = [
  { value: 'Sim, Ativamente!',    emoji: '✅', label: 'Sim, Ativamente!' },
  { value: 'Já Investi mas parei', emoji: '⏸️', label: 'Já Investi mas parei' },
  { value: 'Nunca Investi!',       emoji: '🚀', label: 'Nunca Investi!' },
]

const BUDGET_OPTIONS = [
  'Até R$1.500', 'R$1.500–R$3k', 'R$3k–R$6k', 'Acima de R$6k',
]

const REVENUE_OPTIONS = [
  'Até R$15k', 'R$20k–R$40k', 'R$40k–R$80k', 'R$80k ou +',
]

const PAIN_OPTIONS = [
  'Pouco movimento / clientes',
  'Quero escalar o que já funciona',
  'Não sei medir resultado',
  'Já anunciei e não funcionou',
]

const TESTIMONIALS = [
  { src: 'videos/negaozin.mp4',  name: 'Negãozin',  role: 'D2C · E-commerce' },
  { src: 'videos/cynthia.mp4',   name: 'Cynthia',   role: 'Casa Tropical'    },
  { src: 'videos/valmor.mp4',    name: 'Valmor',    role: 'KS Metais · B2B'  },
]

/* ── Sub-components ─────────────────────────────────────────── */
function RadioCard({ name, value, checked, onChange, emoji, label, cols1 }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 11,
      padding: '13px 15px',
      background: checked ? 'rgba(200,168,74,0.08)' : 'var(--card2)',
      border: `1px solid ${checked ? 'var(--accent)' : 'var(--border)'}`,
      boxShadow: checked ? '0 0 0 1px var(--accent)' : 'none',
      borderRadius: 11, cursor: 'none',
      transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
      userSelect: 'none',
    }}
      onMouseEnter={e => { if (!checked) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
      onMouseLeave={e => { if (!checked) e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      <input type="radio" name={name} value={value} checked={checked}
        onChange={() => onChange(value)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      {emoji && <span style={{ fontSize: 17, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>}
      {/* dot */}
      <span style={{
        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
        border: `2px solid ${checked ? 'var(--accent)' : 'var(--subtle)'}`,
        background: checked ? 'var(--accent)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'border-color 0.2s, background 0.2s',
      }}>
        {checked && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--bg)' }} />}
      </span>
      <span style={{
        fontSize: 13, fontWeight: 500, lineHeight: 1.35,
        color: checked ? 'var(--text)' : 'var(--muted)',
        transition: 'color 0.2s',
      }}>{label}</span>
    </label>
  )
}

function VideoCard({ src, name, role }) {
  const [playing, setPlaying] = useState(false)
  const vidRef = useRef(null)

  const toggle = useCallback(() => {
    const v = vidRef.current
    if (!v) return
    if (playing) {
      v.pause(); v.muted = true; setPlaying(false)
    } else {
      v.muted = false
      v.play().catch(() => { v.muted = true; v.play() })
      setPlaying(true)
      v.onended = () => setPlaying(false)
    }
  }, [playing])

  return (
    <motion.div
      whileHover={{ y: -3, borderColor: 'rgba(200,168,74,0.35)' }}
      onClick={toggle}
      style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 14, overflow: 'hidden',
        aspectRatio: '9/16', position: 'relative', cursor: 'none',
      }}
    >
      <video
        ref={vidRef}
        src={src}
        muted playsInline preload="metadata"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Overlay gradient + info */}
      <motion.div
        animate={{ opacity: playing ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,7,0.85) 0%, transparent 55%)',
          display: 'flex', alignItems: 'flex-end', padding: 12, pointerEvents: 'none',
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{name}</div>
          <div style={{ fontSize: 10, color: 'var(--accent)', marginTop: 1, fontWeight: 500 }}>{role}</div>
        </div>
      </motion.div>

      {/* Play button */}
      <motion.div
        animate={{ opacity: playing ? 0 : 1, scale: playing ? 0.8 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: 'rgba(200,168,74,0.15)',
          border: '1px solid rgba(200,168,74,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="var(--accent)" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FieldInput({ label, id, type = 'text', placeholder, value, onChange, error, inputMode, autoComplete }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: 'block', fontSize: 10, letterSpacing: '0.13em',
        textTransform: 'uppercase', color: 'var(--muted)',
        fontWeight: 700, marginBottom: 8,
      }}>{label}</label>
      <input
        id={id} type={type} placeholder={placeholder}
        value={value} onChange={e => onChange(e.target.value)}
        inputMode={inputMode} autoComplete={autoComplete}
        style={{
          width: '100%', background: 'var(--card2)',
          border: `1px solid ${error ? 'rgba(230,57,70,0.5)' : 'var(--border)'}`,
          boxShadow: error ? '0 0 0 3px rgba(230,57,70,0.06)' : 'none',
          borderRadius: 11, padding: '14px 16px',
          color: 'var(--text)', fontFamily: "'DM Sans', sans-serif",
          fontSize: 15, outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
        }}
        onFocus={e => {
          e.target.style.borderColor = error ? 'rgba(230,57,70,0.5)' : 'rgba(200,168,74,0.45)'
          e.target.style.boxShadow = error ? '0 0 0 3px rgba(230,57,70,0.06)' : '0 0 0 3px rgba(200,168,74,0.07)'
          e.target.style.background = 'rgba(200,168,74,0.03)'
        }}
        onBlur={e => {
          e.target.style.borderColor = error ? 'rgba(230,57,70,0.5)' : 'var(--border)'
          e.target.style.boxShadow = error ? '0 0 0 3px rgba(230,57,70,0.06)' : 'none'
          e.target.style.background = 'var(--card2)'
        }}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            style={{ fontSize: 11, color: '#e63946', marginTop: 6 }}
          >{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Shake wrapper ──────────────────────────────────────────── */
function ShakeWrap({ shake, children }) {
  return (
    <motion.div
      animate={shake ? { x: [0, -5, 5, -4, 4, 0] } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

/* ── Score ──────────────────────────────────────────────────── */
function calcScore(fields) {
  let s = 0
  if (fields.revenue === 'R$80k ou +')     s += 3
  else if (fields.revenue === 'R$40k–R$80k') s += 2
  else if (fields.revenue === 'R$20k–R$40k') s += 1
  if (fields.budget === 'Acima de R$6k')     s += 3
  else if (fields.budget === 'R$3k–R$6k')    s += 2
  else if (fields.budget === 'R$1.500–R$3k') s += 1
  if (fields.ads === 'Sim, Ativamente!')           s += 2
  else if (fields.ads === 'Já Investi mas parei')  s += 1
  return s
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function LeadForm() {
  const [step, setStep]       = useState(1)
  const [dir,  setDir]        = useState(1)
  const [loading, setLoading] = useState(false)
  const [shakes, setShakes]   = useState({})

  /* Step 1 fields */
  const [nome,  setNome]  = useState('')
  const [whats, setWhats] = useState('')
  const [email, setEmail] = useState('')
  const [insta, setInsta] = useState('')
  const [errors1, setErrors1] = useState({})

  /* Step 2 fields */
  const [ads,     setAds]     = useState('')
  const [budget,  setBudget]  = useState('')
  const [revenue, setRevenue] = useState('')
  const [pain,    setPain]    = useState('')

  /* ── Validation ── */
  const validateStep1 = () => {
    const errs = {}
    if (nome.trim().split(/\s+/).filter(Boolean).length < 2) errs.nome = 'Insira seu nome completo'
    if (whats.replace(/\D/g, '').length < 10)                errs.whats = 'WhatsApp inválido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))   errs.email = 'E-mail inválido'
    if (!insta.trim())                                        errs.insta = 'Insira seu Instagram ou site'
    setErrors1(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const missing = {}
    if (!ads)     missing.ads     = true
    if (!budget)  missing.budget  = true
    if (!revenue) missing.revenue = true
    if (!pain)    missing.pain    = true
    if (Object.keys(missing).length > 0) {
      setShakes(missing)
      setTimeout(() => setShakes({}), 400)
      return false
    }
    return true
  }

  /* ── Navigation ── */
  const goTo = (n) => {
    setDir(n > step ? 1 : -1)
    setStep(n)
    setTimeout(() => {
      const el = document.getElementById('form-progress')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const handleStep1 = () => { if (validateStep1()) goTo(2) }

  /* ── Submit ── */
  const handleSubmit = async () => {
    if (!validateStep2()) return
    setLoading(true)

    const payload = {
      nome, whatsapp: whats, email, instagram: insta,
      ads_status: ads, budget, faturamento: revenue, maior_dor: pain,
      pontuacao: calcScore({ ads, budget, revenue }),
      _subject: `Nova análise — ${nome}`,
      _replyto: email,
    }

    try {
      /* ════════════════════════════════════════════════
         Cole seu Formspree ID aqui ↓ (ex: xyzabc12)
         Crie grátis em: https://formspree.io
         ════════════════════════════════════════════════ */
      await fetch('https://formspree.io/f/xxxxxxxxxxx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (e) {
      console.warn('Formspree offline, seguindo para Calendly...')
    }

    setLoading(false)
    goTo(3)
  }

  /* ── Step labels ── */
  const STEPS = ['Identificação', 'Qualificação', 'Agendamento']
  const progress = ((step - 1) / 2) * 100 + 33.33

  return (
    <section id="contato" style={{ padding: '120px 24px 140px', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse, rgba(200,168,74,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--accent)', fontWeight: 700, marginBottom: 28,
          }}>
            <span style={{ width: 28, height: 1, background: 'linear-gradient(90deg, transparent, var(--accent))', opacity: 0.6 }} />
            Rückert D2C Performance
            <span style={{ width: 28, height: 1, background: 'linear-gradient(90deg, var(--accent), transparent)', opacity: 0.6 }} />
          </div>

          <div style={{ overflow: 'hidden', marginBottom: 8 }}>
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text)' }}
            >
              Análise gratuita
            </motion.h2>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 20 }}>
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--accent)', fontStyle: 'italic' }}
            >
              de tráfego
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, maxWidth: 360, margin: '0 auto 28px', fontWeight: 300 }}
          >
            Descubra por que seus anúncios não estão convertindo — e o que mudar agora.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}
          >
            {[['50+', 'marcas atendidas'], ['$200k+', 'adspend/mês'], ['8+', 'cases comprovados']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{n}</div>
                <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 2, fontWeight: 500, letterSpacing: '0.05em' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Testimonial videos ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ marginBottom: 52 }}
        >
          <p className="label" style={{ textAlign: 'center', marginBottom: 16 }}>Clientes que escalaram com Meta Ads</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {TESTIMONIALS.map(t => <VideoCard key={t.src} {...t} />)}
          </div>
        </motion.div>

        {/* ── Progress ── */}
        <motion.div
          id="form-progress"
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{ marginBottom: 28, opacity: step === 3 ? 0.4 : 1, transition: 'opacity 0.4s' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
              {STEPS[step - 1]}
            </span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--subtle)' }}>
              <b style={{ color: 'var(--accent)', fontSize: 14 }}>{String(step).padStart(2, '0')}</b> / 03
            </span>
          </div>
          <div style={{ height: 2, background: 'var(--subtle)', borderRadius: 2, overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), #e8cc80)', borderRadius: 2 }}
            />
          </div>
        </motion.div>

        {/* ── Form card ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 22,
            padding: 'clamp(28px, 5vw, 44px)', position: 'relative', overflow: 'hidden',
          }}
        >
          {/* top gradient line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent 10%, rgba(200,168,74,0.25) 50%, transparent 90%)',
          }} />

          <AnimatePresence mode="wait" custom={dir}>

            {/* ═══ STEP 1 ═══ */}
            {step === 1 && (
              <motion.div key="step1" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit">
                <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6, color: 'var(--text)' }}>
                  Quem é você?
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 36, fontWeight: 300, lineHeight: 1.5 }}>
                  Preencha os dados para iniciarmos sua análise gratuita.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="fields-2">
                  <FieldInput label="Nome completo" id="nome" placeholder="Seu nome" value={nome} onChange={v => { setNome(v); setErrors1(e => ({ ...e, nome: '' })) }} error={errors1.nome} autoComplete="given-name" />
                  <FieldInput label="WhatsApp" id="whats" placeholder="55 11 99999-9999" value={whats}
                    onChange={v => { setWhats(v.replace(/\D/g, '').slice(0, 13)); setErrors1(e => ({ ...e, whats: '' })) }}
                    error={errors1.whats} inputMode="numeric" autoComplete="tel"
                  />
                </div>
                <FieldInput label="E-mail" id="email" type="email" placeholder="seu@email.com.br" value={email} onChange={v => { setEmail(v); setErrors1(e => ({ ...e, email: '' })) }} error={errors1.email} autoComplete="email" />
                <FieldInput label="Instagram ou site do negócio" id="insta" placeholder="@seuinstagram ou seusite.com.br" value={insta} onChange={v => { setInsta(v); setErrors1(e => ({ ...e, insta: '' })) }} error={errors1.insta} />

                <div style={{ marginTop: 36 }}>
                  <Magnetic>
                    <button onClick={handleStep1} style={{
                      width: '100%', background: 'var(--accent)', color: '#080807',
                      padding: '15px 28px', borderRadius: 100, border: 'none',
                      fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700,
                      cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: '0 4px 24px rgba(200,168,74,0.18)',
                      transition: 'opacity 0.2s, box-shadow 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(200,168,74,0.28)' }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(200,168,74,0.18)' }}
                    >
                      Continuar
                      <ArrowRight />
                    </button>
                  </Magnetic>
                </div>
              </motion.div>
            )}

            {/* ═══ STEP 2 ═══ */}
            {step === 2 && (
              <motion.div key="step2" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit">
                <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6, color: 'var(--text)' }}>
                  Sobre o negócio
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 36, fontWeight: 300, lineHeight: 1.5 }}>
                  Isso nos ajuda a preparar uma análise muito mais precisa para você.
                </p>

                {/* Q1 — Ads */}
                <ShakeWrap shake={shakes.ads}>
                  <Question title="Você já investe em anúncios pagos hoje?" hint="Qual a sua situação atual com Meta Ads">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {ADS_OPTIONS.map(o => (
                        <RadioCard key={o.value} name="ads" value={o.value} emoji={o.emoji} label={o.label} checked={ads === o.value} onChange={setAds} />
                      ))}
                    </div>
                  </Question>
                </ShakeWrap>

                {/* Q2 — Budget */}
                <ShakeWrap shake={shakes.budget}>
                  <Question title="Qual valor você consegue investir por mês em anúncios?" hint="Budget mensal disponível para Meta Ads">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                      {BUDGET_OPTIONS.map(o => (
                        <RadioCard key={o} name="budget" value={o} label={o} checked={budget === o} onChange={setBudget} />
                      ))}
                    </div>
                  </Question>
                </ShakeWrap>

                {/* Q3 — Revenue */}
                <ShakeWrap shake={shakes.revenue}>
                  <Question title="Qual seu faturamento mensal?" hint="Faturamento médio atual do seu negócio">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                      {REVENUE_OPTIONS.map(o => (
                        <RadioCard key={o} name="revenue" value={o} label={o} checked={revenue === o} onChange={setRevenue} />
                      ))}
                    </div>
                  </Question>
                </ShakeWrap>

                {/* Q4 — Pain */}
                <ShakeWrap shake={shakes.pain}>
                  <Question title="Qual sua maior dor hoje?" hint="O que mais te impede de crescer agora">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {PAIN_OPTIONS.map(o => (
                        <RadioCard key={o} name="pain" value={o} label={o} checked={pain === o} onChange={setPain} />
                      ))}
                    </div>
                  </Question>
                </ShakeWrap>

                <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
                  <button onClick={() => goTo(1)} style={{
                    background: 'transparent', color: 'var(--muted)',
                    border: '1px solid var(--border)', padding: '15px 20px',
                    borderRadius: 100, cursor: 'none',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                    display: 'flex', alignItems: 'center',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <ArrowLeft />
                  </button>
                  <Magnetic strength={0.25} style={{ flex: 1 }}>
                    <button onClick={handleSubmit} disabled={loading} style={{
                      flex: 1, width: '100%', background: 'var(--accent)', color: '#080807',
                      padding: '15px 28px', borderRadius: 100, border: 'none',
                      fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700,
                      cursor: loading ? 'wait' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      opacity: loading ? 0.7 : 1,
                      boxShadow: '0 4px 24px rgba(200,168,74,0.18)',
                      transition: 'opacity 0.2s',
                    }}>
                      {loading ? <Spinner /> : <>Ver disponibilidade <ArrowRight /></>}
                    </button>
                  </Magnetic>
                </div>
              </motion.div>
            )}

            {/* ═══ STEP 3 — Calendly ═══ */}
            {step === 3 && (
              <motion.div key="step3" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit">
                <div style={{ textAlign: 'center', paddingBottom: 28, borderBottom: '1px solid var(--border)', marginBottom: 0 }}>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    style={{
                      width: 58, height: 58, borderRadius: '50%',
                      background: 'rgba(200,168,74,0.1)', border: '1px solid rgba(200,168,74,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                  <h3 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: 10 }}>
                    Análise <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>liberada!</em>
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>
                    Ótimo, <strong style={{ color: 'var(--text)', fontWeight: 600 }}>{nome.trim().split(' ')[0]}</strong>!<br />
                    Escolha o melhor horário para sua análise gratuita de tráfego com o Arthur.
                  </p>
                </div>

                {/* Calendly embed */}
                <div style={{ marginTop: 0, borderRadius: '0 0 20px 20px', overflow: 'hidden' }}>
                  <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/ruckert_/30min?hide_gdpr_banner=1&background_color=111110&text_color=f0ede8&primary_color=c8a84a"
                    style={{ minWidth: '100%', height: 700 }}
                  />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ textAlign: 'center', fontSize: 11, color: 'var(--subtle)', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          Seus dados são protegidos e nunca serão compartilhados.
        </motion.p>

      </div>
    </section>
  )
}

/* ── Tiny helpers ── */
function Question({ title, hint, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 4, lineHeight: 1.3 }}>{title}</p>
      {hint && <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontWeight: 300 }}>{hint}</p>}
      {children}
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function ArrowLeft() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ animation: 'spin 0.7s linear infinite' }}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
