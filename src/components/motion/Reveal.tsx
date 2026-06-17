import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function Reveal({ children, className, delay = 0, y = 26, once = true }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.75, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
