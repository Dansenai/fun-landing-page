import { Shield } from 'lucide-react'
import { CLIENTS } from '@/data/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import Img from '@/components/motion/Img'
import SectionHeading from '@/components/SectionHeading'
import CTASection from '@/components/CTASection'

const SECTORS = [
  'High-street fashion', 'Premium & designer', 'Kids & infant wear',
  'Active & sportswear', 'Soft home & furnishings', 'Defense & government',
]
const SHOWCASE = ['/images/product-1.jpg', '/images/product-4.jpg', '/images/product-6.jpg', '/images/product-7.jpg']

export default function Clients() {
  return (
    <>
      <PageHero
        eyebrow="Clients & partners"
        title="The brands that have trusted us for decades."
        intro="Over 40 global brands partner with Radnik — many for the long term, using our design studio for their own brand-building and innovation."
        image="/images/infra-4.jpg"
        imageAlt="Garment finishing at Radnik Exports"
      />

      {/* Apparel client wall */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-32">
          <SectionHeading eyebrow="Apparel brands" title="A partner list, named." size="d-1" />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-line border border-line">
            {CLIENTS.map((c, i) => (
              <Reveal key={c} delay={(i % 4) * 50}>
                <div className="bg-paper h-28 md:h-36 flex items-center justify-center px-4 text-center hover:bg-red transition-colors duration-500 group">
                  <span className="d-3 text-ink/65 group-hover:text-white transition-colors">{c}</span>
                </div>
              </Reveal>
            ))}
            <Reveal delay={150}><div className="bg-ink h-28 md:h-36 flex items-center justify-center px-4 text-center"><span className="font-mono text-[12px] uppercase tracking-[0.16em] text-white">+ 30 more</span></div></Reveal>
          </div>
        </div>
      </section>

      {/* Showcase photos */}
      <section className="bg-paper pb-24 md:pb-28">
        <div className="edge grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SHOWCASE.map((src) => (
            <Img key={src} src={src} alt="Garment manufactured by Radnik for a global brand" className="aspect-[3/4] w-full" />
          ))}
        </div>
      </section>

      {/* Defense (charcoal) */}
      <section className="bg-charcoal text-white">
        <div className="edge py-14 md:py-28">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
            <Reveal>
              <div>
                <Shield className="h-10 w-10 text-red" strokeWidth={1.3} />
                <div className="eyebrow text-red mt-6">DGQA · OCF · NSIC</div>
                <h2 className="d-1 mt-5 text-white">Defense & government.</h2>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <p className="text-lg leading-relaxed text-white/70 text-pretty">
                  Radnik manufactures uniforms, security and life-survival products for India's Military and
                  Paramilitary forces — DGQA-certified work that demands precision, compliance and confidentiality few
                  apparel houses can sustain. It's a dual-market credibility that sets us apart.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['Military', 'Paramilitary', 'Uniforms', 'Survival gear', 'Security products'].map((t) => (
                    <span key={t} className="font-mono text-[12px] tracking-wide border border-white/25 text-white/75 px-3 py-1.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Longevity + sectors */}
      <section className="bg-paper">
        <div className="edge py-16 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionHeading eyebrow="Why they stay" title="Relationships measured in decades, not seasons." size="d-1" />
              <Reveal delay={150}>
                <p className="mt-6 text-lg leading-relaxed text-stone text-pretty max-w-lg">
                  Many of our partnerships span the better part of our 50-year history. Brands return because Radnik
                  behaves like an extension of their own team — designing, sampling, testing and shipping to their
                  standard, and clearing their shipments on their accreditation.
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal><div className="eyebrow text-red mb-5">Sectors served</div></Reveal>
              <div className="grid sm:grid-cols-2 gap-px bg-line border border-line">
                {SECTORS.map((s, i) => (<Reveal key={s} delay={i * 50}><div className="bg-paper p-5 d-3 text-ink">{s}</div></Reveal>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection heading="Join a partner list that brands don't leave." />
    </>
  )
}
