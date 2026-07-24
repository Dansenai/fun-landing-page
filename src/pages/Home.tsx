import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import {
  ArrowRight, ArrowDown, ArrowUpRight, Award,
  Shirt, Activity, Layers, Sofa, Users, Shield, Sparkles, LifeBuoy,
  Tent, ShoppingBag, PawPrint,
} from 'lucide-react'
import { STATS, CAPABILITIES, ESG_PLANET } from '@/data/site'
import { cn } from '@/lib/utils'
import Reveal from '@/components/motion/Reveal'
import TextReveal from '@/components/motion/TextReveal'
import Img from '@/components/motion/Img'
import Marquee from '@/components/motion/Marquee'
import Magnetic from '@/components/motion/Magnetic'
import CountUp from '@/components/CountUp'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'
import TaglineBand from '@/components/TaglineBand'
import HorizontalChain from '@/components/HorizontalChain'

const CAP_ICONS = [Shirt, Activity, Layers, Sofa, Users, Shield, Sparkles, LifeBuoy, Tent, ShoppingBag, PawPrint]
const EASE = [0.16, 1, 0.3, 1] as const
const SNAP = [0.76, 0, 0.24, 1] as const // hard in-out — drafted lines & the slab sweep
// One half of the 24-look collection gallery (radnikexports.com) — the other half runs
// on the Clients page, so no look repeats anywhere on the site.
const COLLECTION = [
  { src: '/images/product-2.jpg', alt: 'Printed swimwear from the Radnik collection' },
  { src: '/images/collection/look-07.jpg', alt: 'Pale-blue embroidered blouse' },
  { src: '/images/collection/look-06.jpg', alt: 'Kids tie-dye tee' },
  { src: '/images/collection/look-05.jpg', alt: 'Dark floral midi dress' },
  { src: '/images/product-3.jpg', alt: 'Embroidered denim puffer jacket' },
  { src: '/images/collection/look-10.jpg', alt: 'Yellow broderie-anglaise top' },
  { src: '/images/collection/look-09.jpg', alt: 'Kids pink military jacket and printed skirt' },
  { src: '/images/collection/look-08.jpg', alt: 'White broderie-anglaise dress' },
  { src: '/images/product-5.jpg', alt: 'Knit-trimmed streetwear look' },
  { src: '/images/collection/look-11.jpg', alt: 'Olive utility shirt-dress' },
  { src: '/images/product-1.jpg', alt: 'Kids embroidered top with denim culottes' },
  { src: '/images/collection/look-12.jpg', alt: 'Folk-embroidered white blouse' },
]

/**
 * HERO — a directed title sequence on load (rule draws → words rise → red slab
 * unveils the photo → hairline underlines "engineered."), then a pinned curtain
 * exit on desktop: the section sticks at the top while the rest of the page
 * slides over it, its layers departing at different speeds.
 */
function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  // Kept live: the exit choreography (`exit`) and scrub distances (`vh`) must track
  // the lg:sticky pin, which is a live CSS media query — freezing them at mount
  // desyncs the two when the viewport crosses 1024px or rotates.
  const [isLg, setIsLg] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  const [vh, setVh] = useState(() => window.innerHeight)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => { setIsLg(mq.matches); setVh(window.innerHeight) }
    mq.addEventListener('change', onChange)
    window.addEventListener('resize', onChange, { passive: true })
    return () => { mq.removeEventListener('change', onChange); window.removeEventListener('resize', onChange) }
  }, [])

  // Scroll exit — scrubbed directly by scroll position (Lenis IS the easing).
  // NOTE: not target-based — a pinned sticky target re-measures to "start start"
  // on every scroll, freezing its progress at 0. The hero always sits at page
  // top, so absolute scrollY over one viewport height is the exact progress.
  const { scrollY } = useScroll()
  const eyebrowY = useTransform(scrollY, [0, vh], [0, -50])
  const headY = useTransform(scrollY, [0, vh], [0, -120])
  const paraY = useTransform(scrollY, [0, vh], [0, -80])
  const ctaY = useTransform(scrollY, [0, vh], [0, -36])
  const textOp = useTransform(scrollY, [0, vh * 0.5], [1, 0])
  const ctaOp = useTransform(scrollY, [vh * 0.15, vh * 0.6], [1, 0]) // CTAs are actionable — they fade last
  const imgScale = useTransform(scrollY, [0, vh], [1, 1.07])
  const imgY = useTransform(scrollY, [0, vh], [0, 32])
  const scrim = useTransform(scrollY, [0, vh * 0.8], [0, 0.35])
  // Once the pinned hero has faded under the curtain, drop its CTAs out of the tab
  // order (opacity:0 alone leaves them keyboard-focusable behind the covering page).
  const ctaVis = useTransform(ctaOp, (o) => (o < 0.05 ? 'hidden' : 'visible'))
  const exit = isLg && !reduce

  const slabDelay = isLg ? 0.5 : 0.35

  return (
    <section ref={ref} className={cn('bg-paper', !reduce && 'lg:sticky lg:top-0')}>
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] lg:min-h-[100svh]">
        <div className="edge lg:!pr-12 flex flex-col justify-center lg:justify-end pt-28 md:pt-32 pb-12 md:pb-14 lg:pb-20">
          {/* Eyebrow — the rule draws in, the label rises out of a mask */}
          <motion.div style={exit ? { y: eyebrowY, opacity: textOp } : undefined} className="eyebrow flex items-center gap-3 text-red">
            <motion.span
              aria-hidden
              className="h-px w-10 bg-red origin-left"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: SNAP }}
            />
            <span className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
              >
                Since 1973 · Delhi NCR, India
              </motion.span>
            </span>
          </motion.div>

          {/* The brand slogan (radnikexports.com) — ink lead-in, red payoff, word-by-word rise on load */}
          <motion.h1
            style={exit ? { y: headY, opacity: textOp } : undefined}
            className="relative mt-7 font-display font-extrabold leading-[0.98] tracking-[-0.03em] text-[clamp(2.05rem,4.5vw,4.3rem)]"
          >
            <TextReveal as="span" className="text-ink" text="Delivering Fashion That Is" delay={0.1} inView={false} />{' '}
            <TextReveal as="span" className="text-red" text="Just Right, In Style, On Time." delay={0.3} inView={false} />
          </motion.h1>

          <motion.div style={exit ? { y: paraY, opacity: textOp } : undefined}>
            <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
              className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-stone text-pretty">
              For five decades, Radnik Exports has manufactured for the world's most demanding apparel brands and
              armed forces — over a million garments a month, with full traceability from design to dispatch.
            </motion.p>
          </motion.div>

          <motion.div style={exit ? { y: ctaY, opacity: ctaOp, visibility: ctaVis } : undefined}>
            <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic><Link to="/contact" className="btn btn-red">Start a sourcing conversation <ArrowRight className="h-4 w-4" /></Link></Magnetic>
              <Magnetic><Link to="/capabilities" className="btn btn-outline">Explore capabilities</Link></Magnetic>
            </motion.div>
          </motion.div>
        </div>

        {/* ===== Image panel — red slab sweep unveils the photo ===== */}
        <div className="relative min-h-[60vh] lg:min-h-full overflow-hidden">
          <motion.div className="absolute inset-0" style={exit ? { scale: imgScale, y: imgY, willChange: 'transform' } : undefined}>
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.12, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={reduce ? undefined : {
                // pop exactly when the slab fully covers the panel (x=0 = SNAP midpoint
                // of the 0.9s sweep) so the photo is unveiled by the wipe, not flashed early
                opacity: { delay: slabDelay + 0.45, duration: 0.01 },
                scale: { delay: slabDelay + 0.45, duration: 1.5, ease: EASE },
              }}
            >
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/videos/embroidery.mp4"
                poster="/images/studio-1.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Embroidery being stitched onto fabric at Radnik"
              />
            </motion.div>

            {/* Glass stat chip — a true claim from the hero copy, instrumented-factory style */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
              className="absolute bottom-5 left-5 lg:bottom-6 lg:left-auto lg:right-24 flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 lg:px-4 lg:py-2.5 backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inset-0 rounded-full bg-red animate-pulse-dot" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-red" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">1M+ garments / month</span>
            </motion.div>

            <div className="absolute bottom-6 left-6 hidden lg:flex items-center gap-3 text-white mix-blend-difference">
              <ArrowDown className="h-4 w-4 animate-bounce" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase">Scroll — the proof</span>
            </div>

            {/* Exit scrim — seats the dark promise card's landing */}
            {exit && <motion.div aria-hidden className="absolute inset-0 bg-night pointer-events-none" style={{ opacity: scrim }} />}
          </motion.div>

          {/* Title-card wipe — clipped by the panel's overflow-hidden */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="absolute inset-0 z-10 bg-red pointer-events-none"
              initial={{ x: '-101%' }}
              animate={{ x: '101%' }}
              transition={{ delay: slabDelay, duration: 0.9, ease: SNAP }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Everything below rides above the pinned hero — the curtain that covers the stage */}
      <div className="relative z-10 bg-paper">
      <TaglineBand />

      {/* ===== TRUST LINE ===== */}
      {/* Client names are deliberately not published — owner's call: the list is
          shared on request, not exposed on the site. A slim one-line band. */}
      <section className="bg-paper border-y border-line py-5 md:py-6">
        <div className="edge flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <Reveal><p className="eyebrow text-stone">Trusted by the world's leading brands</p></Reveal>
          <Reveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-stone/70">Client references shared on request</p>
          </Reveal>
        </div>
      </section>

      {/* ===== PROOF BAR ===== */}
      <section className="bg-sand">
        <div className="edge py-20 md:py-28">
          <Reveal><p className="eyebrow text-red mb-12">The proof, by the numbers</p></Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-x-5 gap-y-12">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <div className="border-t border-ink/15 pt-5">
                  <div className="text-[clamp(1.5rem,2.3vw,1.95rem)] font-extrabold tracking-[-0.04em] leading-none text-red tabular-nums whitespace-nowrap">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={0} group={s.label !== 'Founded'} />
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-stone">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE MAKE ===== */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-32">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-end mb-10 md:mb-14">
            <SectionHeading eyebrow="Capability" title="One house. The full product range." size="d-1" />
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-stone text-pretty">
                From core fashion and outerwear to sportswear, soft home, uniforms and defense-grade technical
                textiles — Radnik builds across knits, wovens and denim under one roof, with the labs and lines to
                prove every spec.
              </p>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {CAPABILITIES.map((c, i) => {
              const Icon = CAP_ICONS[i] ?? Sparkles // guard: never render undefined if the arrays desync
              return (
                <Reveal key={c.title} delay={(i % 4) * 70}>
                  <div className="group bg-paper hover:bg-night transition-colors duration-500 p-7 h-full min-h-[200px] flex flex-col">
                    <Icon className="h-6 w-6 text-red" strokeWidth={1.4} />
                    <h3 className="d-3 mt-auto pt-10 text-ink group-hover:text-white transition-colors">{c.title}</h3>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-stone group-hover:text-white/70 transition-colors">{c.note}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== COLLECTION MARQUEE (photos) ===== */}
      <section className="bg-paper pb-16 md:pb-32 overflow-hidden">
        <Reveal><div className="edge mb-10"><p className="eyebrow text-red">Off the line — the collection</p></div></Reveal>
        <Marquee itemClassName="gap-5 pr-5">
          {COLLECTION.map((g) => (
            <div key={g.src} className="ph ph-hover w-[280px] md:w-[360px] aspect-[3/4] shrink-0">
              <img src={g.src} alt={g.alt} loading="lazy" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* ===== HOW WE WORK (pinned, dark) ===== */}
      <HorizontalChain />

      {/* ===== FEATURE BAND (full-bleed photo) ===== */}
      <section className="bg-paper py-16 md:py-32">
        <div className="edge">
          <div className="relative">
            <Img src="/images/infra-4.jpg" alt="Garment washing and finishing at Radnik" className="aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] w-full" parallax />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-14 max-w-2xl">
              <TextReveal text="500,000 sq. ft. of work area, instrumented at the line." as="h2" className="d-2 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY TEASER ===== */}
      <section className="bg-sand overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <Img src="/images/studio-3.jpg" alt="Real-time production monitoring at Radnik" className="min-h-[360px] lg:min-h-full" parallax />
          <div className="px-[clamp(20px,5vw,96px)] py-16 md:py-28 lg:py-32">
            <div className="max-w-xl">
              <SectionHeading eyebrow="Industry 4.0" title="We measure what we make." size="d-1" />
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty">
                  A floor-level production monitoring system streams quality and output data straight onto the line —
                  so corrective action happens in minutes, not after shipment. It's a step toward Industry 4.0, and one
                  reason buyers accredit our factories to clear their own shipments.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <Link to="/capabilities" className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-red hover:gap-3 transition-all">
                  How we engineer quality <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESPONSIBLE SOURCING TEASER ===== */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-32">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <SectionHeading eyebrow="Responsible by design" title="Responsible by design — and by audit." size="d-1"
                intro="GOTS, OCS, GRS, Oeko-Tex, BCI, SA 8000. Real metrics, not slogans — and a 50-year horizon that makes them worth keeping." />
              <Reveal delay={150}>
                <Link to="/sustainability" className="group mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-sand pl-4 pr-5 py-2.5 transition-colors hover:bg-surface">
                  <Award className="h-4 w-4 text-red shrink-0" strokeWidth={1.6} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone group-hover:text-ink transition-colors">Winner · Excellence in Carbon Emissions Reduction — Bharat Tex 2025</span>
                </Link>
              </Reveal>
              <Reveal delay={200}><Link to="/sustainability" className="btn btn-outline mt-6">Explore our ESG commitments <ArrowRight className="h-4 w-4" /></Link></Reveal>
            </div>
            <div className="grid grid-cols-2 gap-px bg-line border border-line">
              {ESG_PLANET.map((m, i) => (
                <Reveal key={m.unit} delay={i * 80}>
                  <div className="bg-surface p-7 h-full">
                    <div className="d-2 text-red leading-none">{m.metric}</div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-wide text-stone">{m.unit}</div>
                    <p className="mt-3 text-sm text-stone leading-relaxed">{m.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEFENSE (red) ===== */}
      <section className="bg-red text-white">
        <div className="edge py-20 md:py-28">
          <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-16 items-center">
            <div>
              <Reveal><div className="eyebrow text-white/70">DGQA · OCF · NSIC</div></Reveal>
              <TextReveal text="Cleared for the most demanding buyer of all." as="h2" className="d-1 mt-5 text-white" />
            </div>
            <Reveal delay={150}>
              <p className="text-lg md:text-xl leading-relaxed text-white/85 text-pretty">
                Beyond global fashion brands, Radnik manufactures uniforms, security and life-survival products for
                military and paramilitary forces across the world — work that demands a level of precision, compliance
                and confidentiality few apparel houses can sustain.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection variant="ink" />
      </div>
    </>
  )
}
