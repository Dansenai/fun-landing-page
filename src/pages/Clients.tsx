import { Shield } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import Marquee from '@/components/motion/Marquee'
import SectionHeading from '@/components/SectionHeading'
import ClientLogoWall from '@/components/ClientLogoWall'
import CTASection from '@/components/CTASection'

const SECTORS = [
  'High-street fashion', 'Premium & designer', 'Kids & infant wear',
  'Active & sportswear', 'Soft home & furnishings', 'Defense & government',
]
const COLLABS = Array.from({ length: 11 }, (_, i) => `/images/clients/collab-logos/collab-${String(i).padStart(2, '0')}.png`)
// The other half of the 24-look collection gallery — Home runs the first 12,
// so no look repeats anywhere on the site.
const SHOWCASE = [
  { src: '/images/collection/look-01.jpg', alt: 'Kids cream sun dress' },
  { src: '/images/collection/look-04.jpg', alt: 'Navy tee with lurex-stripe maxi skirt' },
  { src: '/images/collection/look-14.jpg', alt: 'Kids printed summer dresses' },
  { src: '/images/collection/look-02.jpg', alt: 'White boho dress' },
  { src: '/images/product-4.jpg', alt: 'Kids dip-dye wide-leg jumpsuit' },
  { src: '/images/collection/look-15.jpg', alt: 'Kids tie-dye tee with printed leggings' },
  { src: '/images/collection/look-03.jpg', alt: 'Kids graphic tee and suede skirt' },
  { src: '/images/product-6.jpg', alt: 'Toddler embroidered red romper' },
  { src: '/images/collection/look-13.jpg', alt: 'Kids tie-dye hoodie' },
  { src: '/images/collection/look-17.jpg', alt: 'Kids white embroidered dress' },
  { src: '/images/product-7.jpg', alt: 'Kids khaki co-ord set' },
  { src: '/images/collection/look-16.jpg', alt: 'Toddler floral romper' },
]

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
          <SectionHeading eyebrow="Apparel brands" title="The brands we build for." size="d-1" />
          <div className="mt-10 md:mt-14"><ClientLogoWall /></div>
          {/* H&M designer collaborations */}
          <div className="mt-16 md:mt-24">
            <Reveal>
              <div className="mb-8 flex items-center gap-2 md:mb-10">
                <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-red" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">Designer collaborations, produced for H&amp;M</span>
              </div>
            </Reveal>
            <ClientLogoWall logos={COLLABS} />
          </div>
        </div>
      </section>

      {/* Showcase photos — moving marquee */}
      <section className="bg-paper pb-20 md:pb-28 overflow-hidden">
        <Reveal><div className="edge mb-8 md:mb-10"><p className="eyebrow text-red">The garments behind the logos</p></div></Reveal>
        <Marquee itemClassName="gap-4 md:gap-5 pr-4 md:pr-5">
          {SHOWCASE.map((g) => (
            <div key={g.src} className="ph ph-hover w-[240px] md:w-[320px] aspect-[3/4] shrink-0">
              <img src={g.src} alt={g.alt} loading="lazy" />
            </div>
          ))}
        </Marquee>
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
