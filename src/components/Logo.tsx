import { cn } from '@/lib/utils'

/** Radnik's wordmark — "RADNIK" in heavy italic red caps (matches their logo). */
export default function Logo({ className }: { className?: string; compact?: boolean }) {
  return (
    <span
      className={cn(
        'font-display font-extrabold uppercase text-red select-none leading-none',
        'text-[1.5rem] md:text-[1.65rem] tracking-[-0.01em]',
        className
      )}
      style={{ transform: 'skewX(-11deg)' }}
    >
      Radnik
    </span>
  )
}
