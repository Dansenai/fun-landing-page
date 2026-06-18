import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { VALUE_CHAIN } from '@/data/site'
import SectionHeading from './SectionHeading'

type Step = (typeof VALUE_CHAIN)[number]

function Card({ step, className }: { step: Step; className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-sm text-red tracking-widest">{step.n}</span>
        <span className="h-2 w-2 rounded-full bg-red" />
      </div>
      <h3 className="d-2 mt-8 text-white">{step.title}</h3>
      <p className="mt-5 text-white/55 leading-relaxed max-w-sm">{step.body}</p>
    </div>
  )
}

/** The value chain, presented three ways:
 *  - desktop (>=1024px): a pinned section that pans horizontally as you scroll vertically
 *  - mobile / tablet: a natively swipeable, scroll-snapping horizontal rail (touch-friendly)
 *  - reduced motion: a static, fully-readable stacked grid */
export default function HorizontalChain() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const reduce = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  )

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    // Distance is only used by the desktop pinned pan.
    if (reduce || !isDesktop) return
    const calc = () => {
      if (!trackRef.current) return
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 40))
    }
    calc()
    // Re-measure after layout settles and once fonts load — card widths depend on the
    // variable font + clamp() sizes, so the first measurement can come up short.
    const raf = requestAnimationFrame(calc)
    document.fonts?.ready.then(calc)
    window.addEventListener('resize', calc)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', calc)
    }
  }, [reduce, isDesktop])

  // Reduced motion: drop all scroll/pan effects and lay the steps out as a readable grid.
  if (reduce) {
    return (
      <section ref={sectionRef} className="relative bg-charcoal text-white">
        <div className="edge py-16 md:py-28">
          <SectionHeading eyebrow="Concept to dispatch" title="A vertical workflow, instrumented end to end." size="d-1" dark />
          <div className="mt-10 md:mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_CHAIN.map((step) => (
              <Card key={step.n} step={step} className="border-t border-white/20 pt-7" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Mobile / tablet: native horizontal swipe with scroll-snap — the user drags the rail
  // directly instead of scroll-jacking the page.
  if (!isDesktop) {
    return (
      <section ref={sectionRef} className="relative bg-charcoal text-white py-16 md:py-24 overflow-hidden">
        <div className="edge w-full">
          <SectionHeading eyebrow="Concept to dispatch" title="A vertical workflow, instrumented end to end." size="d-1" dark />
        </div>
        <div
          className="mt-10 md:mt-14 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pl-[clamp(20px,5vw,96px)] pr-[18vw] [scroll-padding-left:clamp(20px,5vw,96px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {VALUE_CHAIN.map((step) => (
            <Card
              key={step.n}
              step={step}
              className="snap-start shrink-0 w-[80vw] sm:w-[46vw] md:w-[40vw] border-t border-white/20 pt-7"
            />
          ))}
        </div>
        <div className="edge mt-8 flex items-center gap-2 text-white/40">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Swipe</span>
          <span className="h-px w-10 bg-white/30" />
        </div>
      </section>
    )
  }

  // Desktop: pinned section that pans horizontally as you scroll vertically.
  return (
    <section ref={sectionRef} className="relative bg-charcoal text-white" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden">
        <div className="edge w-full">
          <SectionHeading eyebrow="Concept to dispatch" title="A vertical workflow, instrumented end to end." size="d-1" dark />
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-5 md:gap-6 mt-8 md:mt-16 pl-[clamp(20px,5vw,96px)] pr-[20vw]">
          {VALUE_CHAIN.map((step) => (
            <Card key={step.n} step={step} className="shrink-0 w-[80vw] sm:w-[52vw] lg:w-[34vw] xl:w-[30vw] border-t border-white/20 pt-7" />
          ))}
        </motion.div>

        <div className="edge w-full mt-8 md:mt-16">
          <div className="h-px w-full bg-white/15 relative">
            <motion.div style={{ width: progress }} className="absolute left-0 top-0 h-px bg-red" />
          </div>
        </div>
      </div>
    </section>
  )
}
