import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  reverse?: boolean
  className?: string
  itemClassName?: string
}

/** Infinite marquee — duplicates children so the -50% loop is seamless. */
export default function Marquee({ children, reverse = false, className, itemClassName }: Props) {
  return (
    <div className={cn('relative flex overflow-hidden', className)}>
      <div className={cn('flex w-max shrink-0', reverse ? 'animate-marquee-rev' : 'animate-marquee')}>
        <div className={cn('flex items-center shrink-0', itemClassName)}>{children}</div>
        <div className={cn('flex items-center shrink-0', itemClassName)} aria-hidden>{children}</div>
      </div>
    </div>
  )
}
