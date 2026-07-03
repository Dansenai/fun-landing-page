import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Award } from 'lucide-react'
import {
  ESG_PEOPLE, COMMUNITY, DEI, ESG_IMPACT, MATERIALS, MATERIALS_GOALS,
  ENERGY_STATS, ENERGY_TARGETS, WATER_STATS, CUT_PANEL, FORWARD_GOALS, AWARDS, CERTS,
} from '@/data/site'
import { cn } from '@/lib/utils'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import Img from '@/components/motion/Img'
import Marquee from '@/components/motion/Marquee'
import SectionHeading from '@/components/SectionHeading'
import CountUp from '@/components/CountUp'
import CTASection from '@/components/CTASection'

const EASE = [0.16, 1, 0.3, 1] as const

const SOURCING_POINTS = [
  'All factories GOTS, OCS and GRS certified',
  'Organic, recycled & blended fibres; FSC-certified viscose (EcoVero / Liva)',
  'Canopy Hot Button ratings followed for viscose suppliers',
  'Recycled trims policy — buttons, labels, wash-cares, zippers',
  '100% recycled poly-fibre fillings for soft home',
  'Tier-2 yarn-source visibility; Oeko-Tex partners audited regularly',
]
const ESG_GALLERY = [
  '/images/esg-2.jpg', '/images/esg-3.jpg', '/images/esg-5.jpg',
  '/images/esg-8.jpg', '/images/studio-1.jpg', '/images/studio-4.jpg',
]
// Certification seals extracted from the deck's certifications wall.
const CERT_LOGOS = Array.from({ length: 15 }, (_, i) => `/images/certs/cert-${String(i).padStart(2, '0')}.png`)

/* ── Animated horizontal bar (materials / DE&I) ── */
function Bar({ pct, delay = 0, tone = 'red', track = 'bg-line' }: { pct: number; delay?: number; tone?: 'red' | 'stone'; track?: string }) {
  const reduce = useReducedMotion()
  return (
    <div className={cn('relative h-2 w-full overflow-hidden rounded-full', track)}>
      <motion.div
        className={cn('absolute inset-y-0 left-0 rounded-full', tone === 'red' ? 'bg-red' : 'bg-stone/60')}
        initial={reduce ? false : { width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.95, ease: EASE, delay }}
      />
    </div>
  )
}

/* ── Forward-goals scroll timeline (horizontal on desktop, vertical on mobile) ── */
function ForwardTimeline() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref}>
      {/* Desktop — horizontal */}
      <div className="relative hidden lg:block">
        <div className="absolute left-[10%] right-[10%] top-[9px] h-px bg-white/15" />
        <motion.div
          className="absolute left-[10%] right-[10%] top-[9px] h-px origin-left bg-red"
          style={reduce ? { transform: 'scaleX(1)' } : { scaleX: draw }}
        />
        <div className="relative grid grid-cols-5">
          {FORWARD_GOALS.map((g, i) => (
            <motion.div
              key={g.year}
              className="flex flex-col items-center px-3 text-center"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
            >
              <span className={cn('h-[18px] w-[18px] rounded-full border-2', g.net ? 'border-red bg-red' : 'border-red bg-charcoal')} />
              <span className={cn('mt-5 font-display text-3xl font-extrabold tracking-[-0.03em]', g.net ? 'text-red' : 'text-white')}>{g.year}</span>
              <ul className="mt-4 space-y-1.5">
                {g.items.map((it) => (
                  <li key={it} className={cn('text-[13px] leading-snug', g.net ? 'font-semibold text-white' : 'text-white/60')}>{it}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile — vertical */}
      <div className="relative lg:hidden pl-7">
        <div className="absolute left-[8px] top-1 bottom-1 w-px bg-white/15" />
        <motion.div className="absolute left-[8px] top-1 bottom-1 w-px origin-top bg-red" style={reduce ? { transform: 'scaleY(1)' } : { scaleY: draw }} />
        <div className="space-y-9">
          {FORWARD_GOALS.map((g, i) => (
            <motion.div
              key={g.year}
              className="relative"
              initial={reduce ? false : { opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
            >
              <span className={cn('absolute -left-7 top-1 h-[16px] w-[16px] rounded-full border-2', g.net ? 'border-red bg-red' : 'border-red bg-charcoal')} />
              <div className={cn('font-display text-2xl font-extrabold tracking-[-0.03em]', g.net ? 'text-red' : 'text-white')}>{g.year}</div>
              <ul className="mt-2 space-y-1">
                {g.items.map((it) => (
                  <li key={it} className={cn('text-sm leading-snug', g.net ? 'font-semibold text-white' : 'text-white/60')}>{it}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

const preferredPct = Math.round(MATERIALS.filter((m) => m.preferred).reduce((s, m) => s + m.pct, 0))

export default function Sustainability() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability & ESG"
        title="Sustainability is part of our culture — and our compliance."
        intro="People, planet and compliance — managed with the same instrumentation we bring to the production floor."
        image="/images/esg-4.jpg"
        imageAlt="Radnik community and CSR program"
      />

      {/* ===== Impact band (dark) ===== */}
      <section className="bg-night text-white">
        <div className="edge py-14 md:py-20">
          <Reveal><p className="eyebrow text-red mb-10">The impact, by the numbers</p></Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {ESG_IMPACT.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="border-t border-white/20 pt-5">
                  <div className="text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-none tracking-[-0.04em] text-red tabular-nums">
                    <CountUp value={s.value} suffix={s.suffix} group={s.value > 999} />
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">{s.label}</div>
                  <div className="mt-1.5 text-[13px] text-white/50 leading-snug">{s.note}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== People — Project RISE ===== */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-28">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-16 items-start mb-10 md:mb-14">
            <SectionHeading eyebrow="People" title="Project RISE — since 2008." size="d-1" />
            <Reveal delay={150}>
              <p className="text-lg leading-relaxed text-stone text-pretty">
                Radnik Initiative for Social Empowerment. We've trained 21,500+ women in garment skills, English,
                computing and financial literacy — with awareness on nutrition, hygiene and women's health. Through a
                family of programs, we extend health, fair-labour and savings access across our workforce and community.
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {ESG_PEOPLE.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 70}>
                <div className="bg-paper p-7 h-full hover:bg-sand transition-colors">
                  <h3 className="d-3 text-ink">{p.name}</h3>
                  {p.full && <div className="mt-1.5 font-brand text-sm italic text-stone">{p.full}</div>}
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-red">{p.since}</div>
                  <p className="mt-4 text-sm text-stone leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Community programmes (sand) ===== */}
      <section className="bg-sand">
        <div className="edge py-16 md:py-28">
          <SectionHeading eyebrow="Community & livelihoods" title="Skills that outlast a single order." size="d-1"
            intro="Beyond the factory floor, our programmes give underprivileged women and specially-abled candidates a skilled trade — and a way to earn on their own terms." />
          <div className="mt-10 md:mt-14">
            <Img src="/images/esg-community.jpg" alt="Women in a Radnik community skilling and up-cycling programme" className="aspect-[16/9] sm:aspect-[16/7] w-full" parallax />
          </div>
          <div className="mt-4 md:mt-5 grid md:grid-cols-3 gap-px bg-line border border-line">
            {COMMUNITY.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 80}>
                <div className="group bg-sand hover:bg-surface transition-colors duration-300 p-7 md:p-8 h-full">
                  <div className="d-2 text-red leading-none">{c.stat}</div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-wide text-stone">{c.statLabel}</div>
                  <h3 className="mt-6 d-3 text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm text-stone leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DE&I (paper) ===== */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-28">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Diversity, equity & inclusion" title="A workforce that reflects the community." size="d-1" />
              <Reveal delay={140}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty max-w-md">
                  Of 15,000 people, 45% are women — including 29% of leadership. We hire specially-abled candidates and
                  openly include LGBTQ+ colleagues, backed by a real grievance mechanism.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {['Complaint boxes', 'Help desk', 'External NGO', 'QR hotline (WOVO)'].map((t) => (
                    <span key={t} className="font-mono text-[11px] tracking-wide border border-line bg-surface text-stone px-3 py-1.5 rounded-full">{t}</span>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="space-y-6">
              {DEI.map((d, i) => (
                <Reveal key={d.label} delay={i * 60}>
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="d-3 text-ink">{d.label}</span>
                      <span className="font-mono text-sm text-stone tabular-nums">
                        {d.pct}%{d.goal ? <span className="text-red"> → {d.goal}% goal</span> : ''}
                      </span>
                    </div>
                    <div className="relative">
                      <Bar pct={d.pct} delay={i * 0.08} />
                      {d.goal && (
                        <span aria-hidden className="absolute top-1/2 -translate-y-1/2 h-3.5 w-[2px] bg-ink/50" style={{ left: `${d.goal}%` }} />
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={DEI.length * 60}>
                <p className="font-mono text-[11px] uppercase tracking-wide text-stone/70 pt-1">Bars show current share · tick marks show the 2024 goal</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ESG gallery — moving marquee ===== */}
      <section className="bg-paper pb-8 md:pb-10 overflow-hidden">
        <Marquee itemClassName="gap-4 md:gap-5 pr-4 md:pr-5">
          {ESG_GALLERY.map((src, i) => (
            <div key={i} className="ph ph-hover w-[260px] md:w-[340px] aspect-square shrink-0">
              <img src={src} alt="Radnik CSR and environmental initiative" loading="lazy" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* ===== Materials basket (sand) ===== */}
      <section className="bg-sand">
        <div className="edge py-16 md:py-28">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div>
              <SectionHeading eyebrow="The materials we source" title="Traceable to the fibre." size="d-1" />
              <Reveal delay={140}>
                <div className="mt-8 flex items-end gap-3">
                  <span className="d-hero text-red leading-none">{preferredPct}%</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-stone pb-2 max-w-[9rem]">preferred fibres — recycled, organic or certified</span>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {MATERIALS_GOALS.map((g) => (
                    <div key={g.year} className="border border-line bg-surface px-5 py-3">
                      <div className="d-3 text-red">{g.year}</div>
                      <div className="mt-1 text-[13px] text-stone leading-snug max-w-[10rem]">{g.body}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="space-y-4">
              {MATERIALS.map((m, i) => (
                <Reveal key={m.name} delay={(i % 8) * 45}>
                  <div className="flex items-center gap-4">
                    <span className="w-40 md:w-52 shrink-0 text-sm text-ink">{m.name}</span>
                    <Bar pct={m.pct} delay={(i % 8) * 0.06} tone={m.preferred ? 'red' : 'stone'} track="bg-surface" />
                    <span className="w-12 shrink-0 text-right font-mono text-[12px] tabular-nums text-stone">{m.pct}%</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Energy (paper) ===== */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
            <SectionHeading eyebrow="Energy" title="Powering down our footprint." size="d-1" className="!max-w-xl" />
            <Reveal delay={120}>
              <ul className="flex flex-col gap-1.5">
                {ENERGY_TARGETS.map((t) => (
                  <li key={t} className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-stone">
                    <span className="h-[6px] w-[6px] rounded-full bg-red" />{t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {ENERGY_STATS.map((s, i) => (
              <Reveal key={s.label} delay={(i % 4) * 70}>
                <div className="bg-paper p-6 md:p-7 h-full hover:bg-sand transition-colors">
                  <div className="d-1 text-red leading-none">{s.metric}{'unit' in s && s.unit ? <span className="text-2xl align-top"> {s.unit}</span> : null}</div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-wide text-ink">{s.label}</div>
                  <p className="mt-2 text-sm text-stone leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Water + pond restoration (red) ===== */}
      <section className="bg-red text-white overflow-hidden">
        <div className="edge py-16 md:py-28">
          <SectionHeading eyebrow="Water" title="Restoring more than we use." size="d-1" dark accent="white" />
          <div className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {WATER_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="border-t border-white/30 pt-4">
                  <div className="d-2 text-white leading-none">{s.metric}</div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-wide text-white/75">{s.label}</div>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pond restoration — before / after */}
          <div className="mt-14 md:mt-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <h3 className="d-2 text-white max-w-xl">We adopted a dumping ground. Now it recharges 11.7M litres a year.</h3>
                <p className="font-mono text-[12px] uppercase tracking-wide text-white/70 max-w-[16rem]">A second adopted pond adds ~300M litres of recharge potential.</p>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              {[
                { src: '/images/esg-pond-then.jpg', tag: 'Then', label: 'A waste-strewn dumping ground', tone: 'text-white/80' },
                { src: '/images/esg-pond-now.jpg', tag: 'Now', label: 'A restored, recharging pond', tone: 'text-white' },
              ].map((p) => (
                <Reveal key={p.tag}>
                  <div className="relative">
                    <Img src={p.src} alt={`Pond restoration — ${p.label}`} className="aspect-[16/10] w-full" />
                    <div className="absolute left-4 top-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] bg-night/70 backdrop-blur-sm px-2.5 py-1 rounded-full">{p.tag}</span>
                    </div>
                    <div className={cn('absolute left-4 bottom-4 font-mono text-[11px] uppercase tracking-wide', p.tone)}>{p.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Carbon (paper) ===== */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <SectionHeading eyebrow="Carbon" title="56% lighter than the industry — per garment." size="d-1" />
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty max-w-lg">
                  Just 7 kg of CO₂e to make a shirt, against an industry average that's more than double. We've invested
                  in a Verra (VCS) carbon-removal project that offsets our Scope 1 & 2 emissions — 18,000 tonnes in year
                  one, then 10,000 tonnes a year for a decade — and we're planting to close the rest.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-px bg-line border border-line">
              {[
                { m: '7 kg', u: 'CO₂e per shirt', b: '56% below the industry average.' },
                { m: '12,600+', u: 'trees planted', b: '≈ 273,420 kg CO₂e offset.' },
                { m: '18,000 t', u: 'offset — year 1', b: 'Verra VCS carbon-removal project.' },
                { m: 'Net Zero', u: 'by 2040', b: 'SBTi-aligned, on a costed path.' },
              ].map((s, i) => (
                <Reveal key={s.u} delay={(i % 2) * 80}>
                  <div className="bg-surface p-7 h-full">
                    <div className="d-2 text-red leading-none">{s.m}</div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-wide text-stone">{s.u}</div>
                    <p className="mt-3 text-sm text-stone leading-relaxed">{s.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Circularity — cut-panel waste (sand) ===== */}
      <section className="bg-sand">
        <div className="edge py-16 md:py-28">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-16 items-start">
            <div>
              <SectionHeading eyebrow="Circularity — 3R & 5R" title="Every cut panel, put back to use." size="d-1" />
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty max-w-md">
                  A no-plastic policy on the floor, and a plan to re-utilise 100% of cut-panel waste by 2024-25 — routed
                  transparently to end-recyclers through the Reverse Resources platform, or up-cycled into new products.
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal><div className="eyebrow text-red mb-5">100% cut-panel re-utilisation — where it goes</div></Reveal>
              <div className="grid sm:grid-cols-2 gap-px bg-line border border-line">
                {CUT_PANEL.map((c, i) => (
                  <Reveal key={c.label} delay={(i % 2) * 60}>
                    <div className="bg-sand p-6 h-full">
                      <div className="d-3 text-red">{c.pct}%</div>
                      <div className="mt-1.5 text-ink font-semibold text-[15px]">{c.label}</div>
                      <div className="mt-1 text-[13px] text-stone">{c.via}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Forward goals timeline (charcoal) ===== */}
      <section className="bg-charcoal text-white overflow-hidden">
        <div className="edge py-16 md:py-28">
          <SectionHeading eyebrow="The road ahead" title="Our path to Net Zero, 2024 → 2040." size="d-1" dark accent="red" />
          <div className="mt-12 md:mt-20">
            <ForwardTimeline />
          </div>
        </div>
      </section>

      {/* ===== Responsible sourcing (paper) ===== */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-28">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Responsible sourcing" title="Audited, documented, measured." size="d-1" />
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty max-w-md">
                  Materials are chosen, audited and documented — and we run on the Higg Index to cut our air, water
                  and chemical footprint, year over year.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-8 inline-flex items-center gap-3 border border-line bg-surface px-5 py-3">
                  <span className="d-3 text-red">Higg 3.0</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-stone">Air · Water · Chemical</span>
                </div>
              </Reveal>
            </div>
            <ul className="grid sm:grid-cols-2 gap-px bg-line border border-line self-start">
              {SOURCING_POINTS.map((p, i) => (
                <Reveal key={i} delay={(i % 2) * 60}>
                  <li className="bg-paper p-6 h-full text-sm text-stone leading-relaxed flex gap-3"><span className="font-mono text-xs text-red">{String(i + 1).padStart(2, '0')}</span> {p}</li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Awards & recognition (sand) ===== */}
      <section className="bg-sand">
        <div className="edge py-16 md:py-28">
          <SectionHeading eyebrow="Recognition" title="Awarded for the work — not the words." size="d-1" />
          <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-px bg-line border border-line">
            {AWARDS.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 90}>
                <div className={cn('group relative bg-surface p-7 md:p-9 h-full transition-colors overflow-hidden', i === 0 && 'md:col-span-2')}>
                  <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] bg-red scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-red">{a.org}</div>
                    <Award className="h-5 w-5 text-red shrink-0" strokeWidth={1.5} />
                  </div>
                  <h3 className={cn('mt-4 text-ink', i === 0 ? 'd-2' : 'd-3')}>{a.title}</h3>
                  <p className={cn('mt-3 text-stone leading-relaxed', i === 0 ? 'text-base max-w-2xl' : 'text-sm')}>{a.body}</p>
                  <div className="mt-5 font-mono text-[11px] uppercase tracking-wide text-stone/60">{a.year}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Certifications wall (paper) ===== */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-28">
          <SectionHeading eyebrow="Certifications & compliance" title="Named, scoped, and verifiable." size="d-1" />

          {/* Certification seals */}
          <div className="mt-10 md:mt-14 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-5 md:gap-x-6 md:gap-y-7">
            {CERT_LOGOS.map((src, i) => (
              <Reveal key={src} delay={(i % 5) * 40}>
                <div className="group flex h-[68px] md:h-[84px] items-center justify-center rounded-2xl px-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-surface hover:shadow-[0_22px_44px_-22px_rgba(23,23,27,0.2)]">
                  <img
                    src={src}
                    alt="Radnik certification"
                    loading="lazy"
                    className="blend-logo max-h-[46px] md:max-h-[58px] w-auto max-w-full object-contain mix-blend-multiply transition-all duration-500 ease-out [@media(hover:hover)]:grayscale [@media(hover:hover)]:opacity-70 group-hover:!grayscale-0 group-hover:!opacity-100 group-hover:scale-[1.08]"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Full scope, by category */}
          <Reveal><div className="eyebrow text-stone mt-14 md:mt-20 mb-8">The full scope, by category</div></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-x-16 lg:gap-y-12">
            {[
              { title: 'Quality & management', items: CERTS.quality },
              { title: 'Social & labour', items: CERTS.social },
              { title: 'Materials & products', items: CERTS.materials },
              { title: 'Climate & transparency', items: CERTS.climate },
              { title: 'Defense & government', items: CERTS.defense },
            ].map((group, gi) => (
              <Reveal key={group.title} delay={(gi % 3) * 90}>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-red border-b border-line pb-3">{group.title}</h3>
                  <ul className="mt-5 space-y-2.5">{group.items.map((c) => <li key={c} className="text-[15px] text-ink/80 hover:text-ink transition-colors">{c}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Source from a partner audited to the standard you report against." />
    </>
  )
}
