import { useEffect, useRef, useState } from 'react'

/**
 * Robust reveal trigger → returns a ref (attach to a PLAIN DOM element) + `shown` boolean.
 * - Reveals immediately if already in the viewport on mount (above-the-fold).
 * - IntersectionObserver for the rest.
 * - Safety net: always reveals after a short timeout, so content can NEVER stay hidden.
 */
export function useReveal<T extends HTMLElement>(rootMargin = '0px 0px -8% 0px') {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) {
      setShown(true)
      return
    }
    const reveal = () => setShown(true)

    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > -1) {
      reveal()
      return
    }

    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) reveal()
        },
        { rootMargin, threshold: 0.01 }
      )
      io.observe(el)
    }
    const t = window.setTimeout(reveal, 2000)
    return () => {
      io?.disconnect()
      window.clearTimeout(t)
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref, shown }
}
