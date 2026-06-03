import { motion } from 'framer-motion'

export default function SplitText({ text, className, style, delay = 0, once = true }) {
  const words = text.split(' ')

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: delay },
    },
  }

  const word = {
    hidden: { y: '110%', opacity: 0 },
    show: {
      y: '0%', opacity: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once }}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28em', ...style }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span variants={word} style={{ display: 'inline-block' }}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
