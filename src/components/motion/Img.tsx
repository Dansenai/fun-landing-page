import { motion, useScroll, useTransform } from 'framer-motion'
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
export default function Img({ src, alt, className, bw = false, parallax = false, hover = true }: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  const treat = bw ? 'bw' : 'ph'
  const hov = hover ? (bw ? 'bw-hover' : 'ph-hover') : ''

  return (
    <div ref={ref} className={cn(treat, hov, 'rv-clip', shown && 'in', className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        style={parallax ? { y } : undefined}
        className={parallax ? '!h-[118%] !-mt-[9%]' : undefined}
      />
    </div>
  )
}
