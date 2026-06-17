import { cn } from '@/lib/utils'

/** Radnik's wordmark — simply "Radnik" set in red (Caudex, their brand font). */
export default function Logo({ className }: { className?: string; compact?: boolean }) {
  return (
    <span
      className={cn(
        'font-brand font-bold tracking-[0.01em] leading-none text-red select-none',
        'text-[1.6rem] md:text-[1.75rem]',
        className
      )}
    >
      Radnik
    </span>
  )
}
