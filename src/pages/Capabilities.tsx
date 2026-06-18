import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { LAB_TESTS, CAPABILITIES } from '@/data/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import Img from '@/components/motion/Img'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'

const QUALITY_CLIENTS = ['H&M', 'Target', 'Tommy Hilfiger', 'Benetton', '& Other Stories', 'Stella McCartney']

export default function Capabilities() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities & products"
        title="Everything a sourcing team audits — under one roof."
        intro="Design, sampling, manufacturing, testing and compliance — vertically integrated and instrumented end to end."
        image="/images/studio-1.jpg"
        imageAlt="Embroidery and design detail at Radnik Exports"
      />

      {/* Design Studio */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Img src="/images/studio-2.jpg" alt="Designers at work in the Radnik studio" className="aspect-[4/3] w-full" parallax />
            <div>
              <SectionHeading eyebrow="Design studio" title="20 designers. 70% of our business." size="d-1" />
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty">
                  Our in-house studio assigns designers to individual clients and develops prints, jacquards and
                  yarn-dyed designs on CAD. With WGSN trend forecasting and design consultants in Europe, we translate
                  global trends into commercial product — and nearly 70% of our total business comes from designs we
                  originate.
                </p>
              </Reveal>
              <div className="mt-8 grid grid-cols-2 gap-px bg-line border border-line max-w-md">
                <div className="bg-white p-5"><div className="d-2 text-red">20</div><div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-stone">In-house designers</div></div>
                <div className="bg-white p-5"><div className="d-2 text-red">~70%</div><div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-stone">Of business, our design</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D & Digital (sand) */}
      <section className="bg-sand overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="px-[clamp(20px,5vw,96px)] py-16 md:py-28 lg:py-32 order-2 lg:order-1">
            <div className="max-w-xl">
              <SectionHeading eyebrow="3D & digital" title="From proof of concept to final design — in hours." size="d-1" />
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty">
                  We work on CLO, Browzwear and Optitex. Virtual 3D fitting cuts sampling time dramatically, removes
                  near-zero-value development iterations, and reduces the sampling waste and deadstock that would
                  otherwise reach landfill. Digital assets flow straight to costing, marketing and e-commerce.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['CLO', 'Browzwear', 'Optitex', 'CAD'].map((t) => (
                    <span key={t} className="font-mono text-[12px] tracking-wide border border-ink/20 text-ink/70 px-3 py-1.5 rounded-full">{t}</span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
          <Img src="/images/studio-4.jpg" alt="Digital and 3D design work at Radnik" className="min-h-[340px] lg:min-h-full order-1 lg:order-2" parallax />
        </div>
      </section>

      {/* Quality & Labs */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-32">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Quality & in-house labs" title="Buyer-accredited. Self-reliant." size="d-1" />
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty max-w-lg">
                  Our factories are authorized to clear shipments for clients including H&amp;M, Target, Tommy Hilfiger
                  and Benetton. Independent in-house labs — accredited by buyers — run a full battery of physical tests.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-8">
                  <div className="eyebrow text-stone mb-3">Cleared to ship for</div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">{QUALITY_CLIENTS.map((c) => <span key={c} className="d-3 text-ink/65">{c}</span>)}</div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <div className="bg-white border border-line p-7 md:p-9">
                <div className="eyebrow text-red mb-5">In-house lab — 16 test parameters</div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {LAB_TESTS.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-stone"><Check className="h-4 w-4 text-red shrink-0 mt-0.5" strokeWidth={2.4} /> {t}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Industry 4.0 (red) */}
      <section className="bg-red text-white">
        <div className="edge py-20 md:py-28">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-16 items-center">
            <SectionHeading eyebrow="Industry 4.0" title="Quality, digitized on the floor." size="d-1" dark accent="white" />
            <Reveal delay={150}>
              <p className="text-lg md:text-xl leading-relaxed text-white/85 text-pretty">
                From cutting to online, end-table, finishing and packing, our quality-digitization software streams a
                live scoreboard onto the production line. Workers see output quality in real time, corrective action is
                immediate, and the analytics are accessible from any device, anywhere in the world.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product taxonomy */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-32">
          <SectionHeading eyebrow="Product range" title="What we make." size="d-1" />
          <div className="mt-8 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 60}>
                <div className="bg-paper p-7 h-full min-h-[160px] flex flex-col justify-between hover:bg-ink transition-colors duration-500 group">
                  <div className="font-mono text-xs text-red tracking-widest">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h3 className="d-3 text-ink group-hover:text-white transition-colors">{c.title}</h3>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-stone group-hover:text-white/70 transition-colors">{c.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}><Link to="/infrastructure" className="btn btn-outline mt-8 md:mt-12">See the manufacturing network <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </section>

      <CTASection heading="Bring us your tech pack. We'll bring the capacity." />
    </>
  )
}
