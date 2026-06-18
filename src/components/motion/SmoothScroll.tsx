import { useEffect, type ReactNode } from 'react'
import { frame, cancelFrame } from 'framer-motion'
import Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      // Native, momentum touch scrolling on phones — smoothing touch feels laggy.
      syncTouch: false,
      touchMultiplier: 1.6,
    })
    window.__lenis = lenis

    // Drive Lenis from framer-motion's frame loop (instead of a separate rAF) so the
    // smooth-scroll position and every scroll-linked transform (parallax, the pinned
    // chain) update on the SAME tick — no one-frame lag between scroll and animation.
    const update = (data: { timestamp: number }) => lenis.raf(data.timestamp)
    frame.update(update, true)

    return () => {
      cancelFrame(update)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  return <>{children}</>
}
