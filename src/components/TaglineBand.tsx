import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * TaglineBand — "The Promise": a dark statement band below the hero, split into a
 * text panel (auto-rotating brand promises) and a clear, fully-visible video panel
 * (the muted Industry-4.0 clip). Side-by-side on desktop, stacked on mobile.
 *
 * Reduced-motion safe: the video never autoplays (poster only) and the promises
 * stop rotating — the first promise renders statically and stays fully readable.
 */

type Seg = { t: string; red?: boolean }

// First line is the user's brand tagline; the rest are on-brand promises.
const QUOTES: Seg[][] = [
  [{ t: 'Delivering Fashion That is ' }, { t: 'Just Right, in Style, on Time.', red: true }],
  [{ t: 'Built to ' }, { t: 'Fit Flawlessly', red: true }, { t: ', at ' }, { t: 'Any Scale.', red: true }],
  [{ t: "Trusted by the World's " }, { t: 'Most Demanding', red: true }, { t: ' Brands — and ' }, { t: 'Armed Forces.', red: true }],
  [{ t: 'A Million Garments a Month — ' }, { t: 'Every Stitch Accounted For.', red: true }],
  [{ t: 'Fifty Years of Craft, ' }, { t: 'Measured, Traceable, Proven.', red: true }],
]

const MICRO_STRIP = ['Quality', 'Precision', 'On Schedule', 'In Style', 'Trusted Since 1973']
const INTERVAL = 4800
const EASE = [0.16, 1, 0.3, 1] as const

export default function TaglineBand() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-rotate the promises.
  useEffect(() => {
    if (reduce || QUOTES.length < 2) return
    const id = window.setInterval(() => setActive((p) => (p + 1) % QUOTES.length), INTERVAL)
    return () => window.clearInterval(id)
  }, [reduce])

  // Only play the video while the band is on screen.
  useEffect(() => {
    const v = videoRef.current
    if (!v || reduce) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) v.play().catch(() => {})
          else v.pause()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [reduce])

  const quote = QUOTES[active]
  const renderQuote = () =>
    quote.map((seg, si) => (
      <span key={si} className={seg.red ? 'text-red' : 'text-paper'}>{seg.t}</span>
    ))

  return (
    <section aria-label="The promise" className="relative w-full bg-paper">
      <div className="edge py-12 sm:py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[26px] bg-charcoal text-paper shadow-[0_44px_120px_-52px_rgba(23,23,27,0.6)]">
          <div className="grid lg:grid-cols-2">
            {/* ===== Text panel ===== */}
            <div className="relative flex flex-col px-7 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 lg:min-h-[480px]">
              {/* Top mono row */}
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow inline-flex items-center gap-2 text-red">
                  <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-red" />
                  The Promise
                </span>
                <span className="eyebrow text-white/40">Est. 1973</span>
              </div>

              {/* Rotating promise */}
              <div className="flex flex-1 items-center py-8 min-h-[clamp(150px,32vw,230px)]">
                {reduce ? (
                  <h2 className="d-2 max-w-2xl text-balance font-display">{renderQuote()}</h2>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={active}
                      className="d-2 max-w-2xl text-balance font-display"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.55, ease: EASE }}
                    >
                      {renderQuote()}
                    </motion.h2>
                  </AnimatePresence>
                )}
              </div>

              {/* Progress dots + serif counterpoint */}
              <div className="flex items-end justify-between gap-6">
                <div className="flex items-center gap-2" role="tablist" aria-label="Promises">
                  {QUOTES.map((_, di) => (
                    <button
                      key={di}
                      type="button"
                      role="tab"
                      aria-selected={di === active}
                      aria-label={`Promise ${di + 1} of ${QUOTES.length}`}
                      onClick={() => setActive(di)}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-500',
                        di === active ? 'w-7 bg-red' : 'w-1.5 bg-white/30 hover:bg-white/60'
                      )}
                    />
                  ))}
                </div>
                <p className="hidden max-w-[16rem] font-brand text-sm leading-snug text-white/55 sm:block sm:text-right">
                  Apparel sourcing engineered for fit, finish and the calendar you actually ship on.
                </p>
              </div>
            </div>

            {/* ===== Video panel (fully visible) ===== */}
            <div className="relative aspect-video border-t border-white/[0.08] lg:aspect-auto lg:min-h-full lg:border-l lg:border-t-0">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src="/videos/industry-4-0.mp4"
                poster="/images/studio-3.jpg"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Radnik Industry 4.0 — real-time production monitoring on the line"
              />
              {/* Soft seam blend into the text panel (top on mobile, left on desktop) — keeps the video clear */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-charcoal/80 to-transparent
                           lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-16 lg:bg-gradient-to-r"
              />
            </div>
          </div>

          {/* Bottom mono marquee micro-strip (full width) */}
          <div className="relative border-t border-white/[0.08]">
            <div className="relative flex overflow-hidden">
              <div className={cn('flex w-max shrink-0', !reduce && 'animate-marquee')}>
                {[0, 1].map((dup) => (
                  <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
                    {MICRO_STRIP.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center py-3.5 pl-6 font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-white/40 sm:py-4"
                      >
                        {item}
                        <span aria-hidden className="ml-6 h-[3px] w-[3px] rounded-full bg-red/70" />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
