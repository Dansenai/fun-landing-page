import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  /** how far (as % of element height) the content drifts across the scroll range */
  amount?: number
}

/** Scroll-linked vertical parallax. Inner content should overflow its frame (e.g. h-[125%]). */
export default function Parallax({ children, className, amount = 14 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div style={reduce ? undefined : { y, willChange: 'transform' }} className="h-[130%] w-full -mt-[15%]">
        {children}
      </motion.div>
    </div>
  )
}
