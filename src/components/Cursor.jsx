import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(true)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 180, damping: 22 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setHidden(false)
    }
    const enter = () => setHovered(true)
    const leave = () => setHovered(false)
    const down = () => setClicked(true)
    const up = () => setClicked(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseleave', () => setHidden(true))
    window.addEventListener('mouseenter', () => setHidden(false))

    const els = document.querySelectorAll('a,button,[data-cursor]')
    els.forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      observer.disconnect()
    }
  }, [])

  if (hidden) return null

  return (
    <>
      {/* Dot */}
      <motion.div style={{
        position: 'fixed', zIndex: 99998, pointerEvents: 'none',
        x: mouseX, y: mouseY,
        translateX: '-50%', translateY: '-50%',
        width: clicked ? 6 : 8, height: clicked ? 6 : 8,
        borderRadius: '50%',
        background: hovered ? 'var(--accent)' : 'var(--text)',
        transition: 'width 0.15s, height 0.15s, background 0.15s',
      }} />

      {/* Ring */}
      <motion.div style={{
        position: 'fixed', zIndex: 99997, pointerEvents: 'none',
        x: ringX, y: ringY,
        translateX: '-50%', translateY: '-50%',
        width: hovered ? 44 : 32, height: hovered ? 44 : 32,
        borderRadius: '50%',
        border: `1px solid ${hovered ? 'var(--accent)' : 'rgba(255,255,255,0.25)'}`,
        transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        mixBlendMode: 'difference',
      }} />
    </>
  )
}
