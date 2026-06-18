import { MapPin } from 'lucide-react'
import { SOURCING } from '@/data/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import Img from '@/components/motion/Img'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'

const CAPACITY = [
  { metric: '1M+', label: 'High-fashion garments / month' },
  { metric: '250K+', label: 'Technical products / month' },
  { metric: '500K+', label: 'Sq. ft. of work area' },
  { metric: '~10,000', label: 'People on the floor' },
]

const GALLERY = [
  { src: '/images/infra-1.jpg', alt: 'Fabric spreading and cutting floor', span: 'lg:col-span-2 lg:row-span-2' },
  { src: '/images/infra-2.jpg', alt: 'Sewing and embroidery line' },
  { src: '/images/infra-3.jpg', alt: 'Operator workstation with monitoring' },
  { src: '/images/infra-4.jpg', alt: 'Garment washing and finishing' },
  { src: '/images/infra-5.jpg', alt: 'Quality station on the production floor' },
]

export default function Infrastructure() {
  return (
    <>
      <PageHero
        eyebrow="Infrastructure & network"
        title="15 factories. 500,000 sq. ft. One region, fully networked."
        intro="With nearly 50 years of international experience, Radnik operates at a scale few apparel houses can match — and instruments it at micro-level."
        image="/images/infra-2.jpg"
        imageAlt="Inside a Radnik production facility"
      />

      {/* Capacity */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-32">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <SectionHeading eyebrow="The network" title="Built for volume, controlled at the line." size="d-1" />
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty max-w-lg">
                  Radnik operates 5,000 machines across 15 factories in the Delhi NCR region. Monthly capacity exceeds
                  1 million high-fashion garments plus 250,000 technical products — soft furnishings, accessories and
                  military gear — with a workforce of nearly 10,000.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-px bg-line border border-line">
              {CAPACITY.map((c, i) => (
                <Reveal key={c.label} delay={i * 70}>
                  <div className="bg-white p-7 h-full"><div className="d-2 text-red leading-none">{c.metric}</div><div className="mt-3 font-mono text-[11px] uppercase tracking-wide text-stone">{c.label}</div></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Factory network visual */}
      <section className="bg-sand border-y border-line">
        <div className="edge py-14 md:py-24">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
            <div>
              <SectionHeading eyebrow="Delhi NCR" title="A clustered network — not a single point of failure." size="d-2" />
              <Reveal delay={150}>
                <p className="mt-6 text-stone leading-relaxed">
                  Fifteen factories within one region: specialized lines, shared standards, and the resilience to flex
                  capacity across programs without losing control of quality.
                </p>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="border border-line bg-white p-5 md:p-8">
                <div className="grid grid-cols-5 gap-2 sm:gap-4">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-sm border border-line flex items-center justify-center group hover:bg-red transition-colors duration-300">
                      <MapPin className="h-4 w-4 text-red group-hover:text-white transition-colors" strokeWidth={1.6} />
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-stone"><span>15 production units</span><span>Delhi · Noida · NCR</span></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-32">
          <SectionHeading eyebrow="Inside the floor" title="Where 18 million pieces a year are made." size="d-1" />
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 auto-rows-[170px] md:auto-rows-[230px] gap-4">
            {GALLERY.map((g) => (
              <Img key={g.src} src={g.src} alt={g.alt} className={'w-full h-full ' + (g.span ?? '')} bw />
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing */}
      <section className="bg-sand">
        <div className="edge py-16 md:py-28">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20">
            <SectionHeading eyebrow="Sourcing footprint" title="Sourced wide, controlled closely." size="d-1" />
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-stone text-pretty">
                  We source fabric and accessories across a global and domestic base — and demand clear visibility of
                  yarn source from our Tier-2 partners, audited on a regular cycle by our internal chemical and
                  material-quality teams.
                </p>
              </Reveal>
              <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-px bg-line border border-line">
                {SOURCING.map((s, i) => (
                  <Reveal key={s} delay={i * 50}><div className="bg-sand p-5 flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-red" /><span className="d-3 text-ink">{s}</span></div></Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection heading="Need flexible capacity across programs? Let's map it." />
    </>
  )
}
