import { Fragment, type ElementType } from 'react'
import { cn } from '@/lib/utils'
import { useReveal } from './useReveal'

type Props = {
  text: string
  className?: string
  as?: ElementType
  delay?: number
  stagger?: number
  inView?: boolean // kept for API compatibility (timing now handled automatically)
  once?: boolean
}

/** Word-by-word mask reveal — each word rises out of an overflow-hidden clip. */
export default function TextReveal({ text, className, as: Tag = 'h2', delay = 0, stagger = 0.045 }: Props) {
  const { ref, shown } = useReveal<HTMLElement>()
  const words = text.split(' ')
  return (
    <Tag ref={ref} className={cn('inline', className)} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
            <span className={cn('rv-word', shown && 'in')} style={{ transitionDelay: `${delay + i * stagger}s` }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  )
}
