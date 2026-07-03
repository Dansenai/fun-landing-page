import { cn } from '@/lib/utils'

/** Radnik's wordmark — "RADNIK®" in heavy italic red caps (matches the Radnik logo). */
export default function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span
      className={cn(
        'relative inline-flex items-start font-display font-black uppercase text-red select-none leading-none tracking-[-0.015em]',
        compact ? 'text-[1.35rem]' : 'text-[1.5rem] md:text-[1.7rem]',
        className
      )}
    >
      <span className="inline-block" style={{ transform: 'skewX(-12deg)' }}>
        Radnik
      </span>
      <span aria-hidden className="ml-[0.1em] mt-[0.05em] text-[0.34em] font-semibold leading-none tracking-normal">
        ®
      </span>
    </span>
  )
}
