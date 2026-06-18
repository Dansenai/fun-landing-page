import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReveal } from './useReveal'

type Props = {
  src: string
  alt: string
  className?: string
  bw?: boolean
  parallax?: boolean
  hover?: boolean
  inView?: boolean // kept for API compatibility
  eager?: boolean
}

/** Photo with a clip-path wipe reveal (CSS) + optional scroll parallax (framer). Never stays hidden. */
export default function Img({ src, alt, className, bw = false, parallax = false, hover = true, eager = false }: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  const animate = parallax && !reduce

  const treat = bw ? 'bw' : 'ph'
  const hov = hover ? (bw ? 'bw-hover' : 'ph-hover') : ''

  return (
    <div ref={ref} className={cn(treat, hov, 'rv-clip', shown && 'in', className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={animate ? { y, willChange: 'transform' } : undefined}
        className={animate ? '!h-[118%] !-mt-[9%]' : undefined}
      />
    </div>
  )
}
