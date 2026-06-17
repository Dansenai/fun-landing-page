import { cn } from '@/lib/utils'

/**
 * Radnik Exports wordmark. Radnik has no graphic logo — their brand is a
 * typeset wordmark set in Caudex (their own heading font). Reproduced here.
 */
export default function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex flex-col leading-none select-none', className)}>
      <span className="font-brand text-[1.4rem] md:text-[1.5rem] font-bold tracking-[0.04em] leading-none text-ink">
        RADNIK
      </span>
      {!compact && (
        <span className="font-brand text-[0.62rem] tracking-[0.46em] mt-1 text-red">EXPORTS</span>
      )}
    </span>
  )
}
