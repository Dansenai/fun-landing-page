import { motion } from 'framer-motion'
import { Fragment, type ElementType } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  text: string
  className?: string
  as?: ElementType
  delay?: number
  stagger?: number
  once?: boolean
  /** false = animate on mount (for above-the-fold); true = animate when scrolled into view */
  inView?: boolean
}

const EASE = [0.16, 1, 0.3, 1] as const

/** Word-by-word mask reveal — each word rises out of an overflow-hidden clip. */
export default function TextReveal({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.045,
  once = true,
  inView = true,
}: Props) {
  const words = text.split(' ')
  const anim = inView
    ? { whileInView: { y: 0 }, viewport: { once } }
    : { animate: { y: 0 } }
  return (
    <Tag className={cn('inline', className)} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            aria-hidden
            className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
          >
            <motion.span
              className="inline-block"
              initial={{ y: '115%' }}
              {...anim}
              transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  )
}
