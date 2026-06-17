import { cn } from '@/lib/utils'

function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="29" height="29" rx="3" fill="#E11226" />
      <path d="M9 23 L23 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2.4 3.2" />
      <circle cx="9" cy="23" r="2" fill="#fff" />
      <circle cx="23" cy="9" r="2" fill="#fff" />
    </svg>
  )
}

export default function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <Mark className="h-7 w-7 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-extrabold tracking-[-0.04em] leading-none">Radnik</span>
        {!compact && (
          <span className="font-mono text-[8px] tracking-[0.4em] uppercase mt-1 opacity-55">Exports</span>
        )}
      </span>
    </span>
  )
}
