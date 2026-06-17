import { ESG_PEOPLE, ESG_PLANET, CERTS } from '@/data/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import Img from '@/components/motion/Img'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'

const SOURCING_POINTS = [
  'All factories GOTS, OCS and GRS certified',
  'Organic, recycled & blended fibres; FSC-certified viscose (EcoVero / Liva)',
  'Canopy Hot Button ratings followed for viscose suppliers',
  'Recycled trims policy — buttons, labels, wash-cares, zippers',
  '100% recycled poly-fibre fillings for soft home',
  'Tier-2 yarn-source visibility; Oeko-Tex partners audited regularly',
]
const ESG_GALLERY = ['/images/esg-2.jpg', '/images/esg-3.jpg', '/images/esg-5.jpg', '/images/esg-8.jpg']

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

      {/* People */}
      <section className="bg-paper">
        <div className="edge py-24 md:py-32">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start mb-14">
            <SectionHeading eyebrow="People" title="Project RISE — since 2007." size="d-1" />
            <Reveal delay={150}>
              <p className="text-lg leading-relaxed text-stone text-pretty">
                We've trained approximately 10,000 women in garment skills, English, computing and financial literacy —
                alongside awareness on nutrition, hygiene and women's health. Through a family of programs, we extend
                health, fair-labour and savings access across our workforce and community.
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {ESG_PEOPLE.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 70}>
                <div className="bg-paper p-7 h-full hover:bg-sand transition-colors">
                  <h3 className="d-3 text-ink">{p.name}</h3>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-red">{p.since}</div>
                  <p className="mt-4 text-sm text-stone leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ESG gallery */}
      <section className="bg-paper pb-8">
        <div className="edge grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ESG_GALLERY.map((src) => (
            <Img key={src} src={src} alt="Radnik CSR and environmental initiative" className="aspect-square w-full" />
          ))}
        </div>
      </section>

      {/* Planet (red) */}
      <section className="bg-red text-white overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <Img src="/images/esg-7.jpg" alt="Restored pond and environmental initiative by Radnik" className="min-h-[340px] lg:min-h-full" parallax />
          <div className="px-[clamp(20px,5vw,96px)] py-20 md:py-28 lg:py-32">
            <div className="max-w-xl">
              <SectionHeading eyebrow="Planet" title="Restoring more than we use." size="d-1" dark accent="white" />
              <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-8">
                {ESG_PLANET.map((m, i) => (
                  <Reveal key={m.unit} delay={i * 80}>
                    <div className="border-t border-white/30 pt-4">
                      <div className="d-2 text-white leading-none">{m.metric}</div>
                      <div className="mt-2 font-mono text-[11px] uppercase tracking-wide text-white/70">{m.unit}</div>
                      <p className="mt-3 text-sm text-white/75 leading-relaxed">{m.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible sourcing (sand) */}
      <section className="bg-sand">
        <div className="edge py-24 md:py-32">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Responsible sourcing" title="Traceable to the yarn." size="d-1" />
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty max-w-md">
                  Materials are chosen, audited and documented — and we run on the Higg Index 3.0 to cut our air, water
                  and chemical footprint, year over year.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-8 inline-flex items-center gap-3 border border-line bg-white px-5 py-3">
                  <span className="d-3 text-red">Higg 3.0</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-stone">Air · Water · Chemical</span>
                </div>
              </Reveal>
            </div>
            <ul className="grid sm:grid-cols-2 gap-px bg-line border border-line self-start">
              {SOURCING_POINTS.map((p, i) => (
                <Reveal key={i} delay={(i % 2) * 60}>
                  <li className="bg-sand p-6 h-full text-sm text-stone leading-relaxed flex gap-3"><span className="font-mono text-xs text-red">{String(i + 1).padStart(2, '0')}</span> {p}</li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Certifications wall */}
      <section className="bg-paper">
        <div className="edge py-24 md:py-28">
          <SectionHeading eyebrow="Certifications & compliance" title="Named, scoped, and verifiable." size="d-1" />
          <div className="mt-14 grid md:grid-cols-3 gap-10 lg:gap-16">
            {[
              { title: 'Quality & management', items: CERTS.quality },
              { title: 'Materials & sustainability', items: CERTS.materials },
              { title: 'Defense & government', items: CERTS.defense },
            ].map((group, gi) => (
              <Reveal key={group.title} delay={gi * 90}>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-red border-b border-line pb-3">{group.title}</h3>
                  <ul className="mt-5 space-y-3">{group.items.map((c) => <li key={c} className="d-3 text-ink/80">{c}</li>)}</ul>
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
