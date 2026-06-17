import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  group?: boolean
  className?: string
}

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function format(n: number, decimals: number, group: boolean) {
  if (decimals > 0) return n.toFixed(decimals)
  const r = Math.round(n)
  return group ? r.toLocaleString('en-US') : String(r)
}

export default function CountUp({ value, prefix = '', suffix = '', decimals = 0, duration = 1500, group = true, className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced()) {
      setDisplay(value)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - t, 3)
              setDisplay(value * eased)
              if (t < 1) requestAnimationFrame(tick)
              else setDisplay(value)
            }
            requestAnimationFrame(tick)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(display, decimals, group)}
      {suffix}
    </span>
  )
}
