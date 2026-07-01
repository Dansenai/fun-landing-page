import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowDown, ArrowUpRight,
  Shirt, Activity, Layers, Sofa, Users, Shield, Sparkles, LifeBuoy,
} from 'lucide-react'
import { STATS, CAPABILITIES, ESG_PLANET } from '@/data/site'
import Reveal from '@/components/motion/Reveal'
import TextReveal from '@/components/motion/TextReveal'
import Img from '@/components/motion/Img'
import Marquee from '@/components/motion/Marquee'
import CountUp from '@/components/CountUp'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'
import ClientLogoWall from '@/components/ClientLogoWall'
import TaglineBand from '@/components/TaglineBand'
import HorizontalChain from '@/components/HorizontalChain'

const CAP_ICONS = [Shirt, Activity, Layers, Sofa, Users, Shield, Sparkles, LifeBuoy]
const EASE = [0.16, 1, 0.3, 1] as const
const COLLECTION = ['/images/studio-1.jpg', '/images/product-1.jpg', '/images/infra-2.jpg', '/images/product-6.jpg', '/images/studio-2.jpg', '/images/product-4.jpg', '/images/product-7.jpg', '/images/product-3.jpg']

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-paper">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] lg:min-h-[100svh]">
          <div className="edge lg:!pr-12 flex flex-col justify-center lg:justify-end pt-28 md:pt-32 pb-12 md:pb-14 lg:pb-20">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}
              className="eyebrow flex items-center gap-3 text-red">
              <span className="h-px w-10 bg-red" /> Since 1973 · Delhi NCR, India
            </motion.div>
            <h1 className="d-hero mt-7">
              <TextReveal as="span" className="block text-ink" text="Fashion," delay={0.1} inView={false} />
              <TextReveal as="span" className="block text-ink" text="engineered." delay={0.22} inView={false} />
              <TextReveal as="span" className="block text-red" text="At scale." delay={0.34} inView={false} />
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
              className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-stone text-pretty">
              For five decades, Radnik Exports has manufactured for the world's most demanding apparel brands and
              defense forces — over a million garments a month, with full traceability from design to dispatch.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn btn-red">Start a sourcing conversation <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/capabilities" className="btn btn-outline">Explore capabilities</Link>
            </motion.div>
          </div>
          <div className="relative min-h-[60vh] lg:min-h-full">
            <Img src="/images/studio-1.jpg" alt="Craft and embroidery detail at Radnik" className="absolute inset-0" parallax inView={false} eager hover={false} />
            <div className="absolute bottom-6 left-6 hidden lg:flex items-center gap-3 text-white mix-blend-difference">
              <ArrowDown className="h-4 w-4 animate-bounce" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase">Scroll — the proof</span>
            </div>
          </div>
        </div>
      </section>

      <TaglineBand />

      {/* ===== TRUST RIBBON (client logos) ===== */}
      <section className="bg-paper border-y border-line py-12 md:py-16 overflow-hidden">
        <div className="edge flex flex-wrap items-end justify-between gap-4 mb-9 md:mb-11">
          <Reveal><p className="eyebrow text-stone">Trusted by the world's leading brands</p></Reveal>
          <Reveal delay={80}>
            <Link to="/clients" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-red hover:gap-3 transition-all">
              See all clients <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={120}><ClientLogoWall variant="marquee" /></Reveal>
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
              const Icon = CAP_ICONS[i]
              return (
                <Reveal key={c.title} delay={(i % 4) * 70}>
                  <div className="group bg-paper hover:bg-ink transition-colors duration-500 p-7 h-full min-h-[200px] flex flex-col">
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
        <Reveal><div className="edge mb-10"><p className="eyebrow text-red">From the floor — selected work</p></div></Reveal>
        <Marquee itemClassName="gap-5 pr-5">
          {COLLECTION.map((src, i) => (
            <div key={i} className="ph ph-hover w-[280px] md:w-[360px] aspect-[3/4] shrink-0">
              <img src={src} alt="Radnik manufactured garment / production detail" loading="lazy" />
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
              <Reveal delay={180}><Link to="/sustainability" className="btn btn-outline mt-8">Explore our ESG commitments <ArrowRight className="h-4 w-4" /></Link></Reveal>
            </div>
            <div className="grid grid-cols-2 gap-px bg-line border border-line">
              {ESG_PLANET.map((m, i) => (
                <Reveal key={m.unit} delay={i * 80}>
                  <div className="bg-white p-7 h-full">
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
                India's Military and Paramilitary forces — work that demands a level of precision, compliance and
                confidentiality few apparel houses can sustain.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection variant="ink" />
    </>
  )
}
