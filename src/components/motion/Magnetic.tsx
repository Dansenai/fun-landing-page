import { useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const SPRING = { stiffness: 350, damping: 25, mass: 0.4 }
const clamp = (v: number, r: number) => Math.min(r, Math.max(-r, v))

/**
 * Magnetic — the child drifts toward the cursor (clamped to ±max px), with a
 * half-strength inner counter-drift for depth. Pointer-fine devices only; on
 * touch or reduced motion it renders plain children (the .btn:active press
 * stays as tap feedback).
 */
export default function Magnetic({
  children,
  strength = 0.22,
  max = 8,
  className,
}: {
  children: ReactNode
  strength?: number
  max?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const [fine] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const ref = useRef<HTMLDivElement>(null)
  const rect = useRef<DOMRect | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)
  const ix = useTransform(sx, (v) => v * 0.5)
  const iy = useTransform(sy, (v) => v * 0.5)

  if (reduce || !fine) return <div className={cn('inline-block', className)}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x: sx, y: sy }}
      onPointerEnter={() => {
        rect.current = ref.current?.getBoundingClientRect() ?? null
      }}
      onPointerMove={(e) => {
        const r = rect.current
        if (!r) return
        x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength, max))
        y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength, max))
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <motion.div className="inline-block" style={{ x: ix, y: iy }}>
        {children}
      </motion.div>
    </motion.div>
  )
}
