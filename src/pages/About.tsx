import { COMPANY } from '@/data/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import Img from '@/components/motion/Img'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'

const MISSION = [
  { n: '01', text: 'Latest trends, original design, and diverse product lines from multiple locations.' },
  { n: '02', text: 'High, sustainable standards of quality, service and on-time delivery.' },
  { n: '03', text: 'A preferred employer — investing in our people and best-practice HR.' },
  { n: '04', text: 'Optimized resources, environmental sustainability and community empowerment.' },
]

const MILESTONES = [
  { year: '1973', text: 'Radnik Exports incorporated — the beginning of a family-run business house in fashion.' },
  { year: '2007', text: 'Project RISE launched — skilling and empowering women across the workforce.' },
  { year: '2020–23', text: 'Environmental program scales — 12,600+ trees planted, two ponds restored, and 343 KW of solar installed.' },
  { year: 'Today', text: '15 factories · 5,000+ machines · ~10,000 people · 18M pieces a year for 40+ global brands.' },
]

const GALLERY = ['/images/about-1.jpg', '/images/infra-5.jpg', '/images/studio-2.jpg', '/images/about-2.jpg']

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Established 1973"
        title="Fifty years of building garments the world wears."
        intro="One of India's elite, family-run business houses in the fashion industry — manufacturing for multinational brands and India's defense forces alike."
        image="/images/about-2.jpg"
        imageAlt="A Radnik Exports facility in the Delhi NCR region"
      />

      {/* Heritage narrative */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-32">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <SectionHeading eyebrow="Our story" title="A house built on precision, not promises." size="d-1" />
              <Reveal delay={150}>
                <div className="mt-7 space-y-5 text-lg leading-relaxed text-stone text-pretty max-w-xl">
                  <p>
                    Incorporated in 1973, Radnik has grown into a leading manufacturer of fashion garments, active
                    gear, sportswear, uniforms, accessories, and security and life-survival products — for
                    multinational brands including H&amp;M, Tommy Hilfiger, Benetton and Marks &amp; Spencer.
                  </p>
                  <p>
                    Five decades on, we remain a family-run business house: long-term by instinct, exacting by
                    standard. Our own design work even birthed <span className="text-red">“Barefoot Clothing,”</span> a
                    label created with TK Maxx in the UK — proof that Radnik is a design partner, not only a
                    production line.
                  </p>
                </div>
              </Reveal>
            </div>
            <Img src="/images/about-1.jpg" alt="Radnik Exports manufacturing facility" className="aspect-[4/5] w-full" parallax />
          </div>
        </div>
      </section>

      {/* Mission (red) */}
      <section className="bg-red text-white">
        <div className="edge py-16 md:py-28">
          <SectionHeading eyebrow="Our mission" title="To be our customers' first choice." size="d-1" dark accent="white" />
          <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {MISSION.map((m, i) => (
              <Reveal key={m.n} delay={i * 80}>
                <div className="border-t border-white/30 pt-5">
                  <div className="font-mono text-xs text-white/70 tracking-widest">{m.n}</div>
                  <p className="mt-4 text-white/90 leading-relaxed">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <Reveal>
              <div>
                <div className="eyebrow text-red mb-6">Leadership & values</div>
                <p className="d-2 text-ink text-balance">
                  We set aspirational targets to best-practice benchmarks, act to meet them, and report honestly on
                  our progress.
                </p>
                <div className="mt-8">
                  <div className="font-semibold text-ink">{COMPANY.cmd} · Chairman & Managing Director</div>
                  <div className="font-mono text-[11px] uppercase tracking-wide text-stone mt-1">A family-run business house since 1973</div>
                </div>
              </div>
            </Reveal>
            <Img src="/images/infra-5.jpg" alt="Radnik workforce on the factory floor" className="aspect-[5/4] w-full" parallax />
          </div>
        </div>
      </section>

      {/* Workforce gallery */}
      <section className="bg-paper pb-8">
        <div className="edge">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.map((src) => (
              <Img key={src} src={src} alt="Radnik people and facilities" className="aspect-[3/4] w-full" bw />
            ))}
          </div>
        </div>
      </section>

      {/* Milestones (sand) */}
      <section className="bg-sand">
        <div className="edge py-16 md:py-28">
          <SectionHeading eyebrow="The timeline" title="Five decades, briefly." size="d-1" />
          <div className="mt-10 md:mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 90}>
                <div className="border-t-2 border-red pt-5">
                  <div className="d-3 text-red">{m.year}</div>
                  <p className="mt-3 text-stone leading-relaxed">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Partner with a house that has shipped for the world since 1973." />
    </>
  )
}
