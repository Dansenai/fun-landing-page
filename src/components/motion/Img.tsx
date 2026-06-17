import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt: string
  className?: string
  bw?: boolean
  parallax?: boolean
  hover?: boolean
  /** false = reveal on mount (above-the-fold); true = reveal when scrolled into view */
  inView?: boolean
  eager?: boolean
}

const EASE = [0.16, 1, 0.3, 1] as const

/** Photo with a clip-path wipe reveal + optional scroll parallax. */
export default function Img({
  src, alt, className, bw = false, parallax = false, hover = true, inView = true, eager = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  const treat = bw ? 'bw' : 'ph'
  const hov = hover ? (bw ? 'bw-hover' : 'ph-hover') : ''
  const revealAnim = inView
    ? { whileInView: { clipPath: 'inset(0 0 0% 0)' }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
    : { animate: { clipPath: 'inset(0 0 0% 0)' } }

  return (
    <motion.div
      ref={ref}
      className={cn(treat, hov, className)}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      {...revealAnim}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        style={parallax ? { y } : undefined}
        className={parallax ? '!h-[118%] !-mt-[9%]' : undefined}
      />
    </motion.div>
  )
}
