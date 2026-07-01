import Reveal from './motion/Reveal'
import Marquee from './motion/Marquee'

// Individual brand logos extracted from the Radnik deck (crisp, per-logo).
const LOGOS = Array.from({ length: 44 }, (_, i) => `/images/clients/logos/logo-${String(i).padStart(2, '0')}.png`)

// grayscale + faded by default on pointer devices, pops to full colour on hover; always colour on touch.
const IMG =
  'max-h-full w-auto max-w-full object-contain mix-blend-multiply transition-all duration-500 ease-out ' +
  '[@media(hover:hover)]:grayscale [@media(hover:hover)]:opacity-60'

export default function ClientLogoWall({
  variant = 'grid',
  logos = LOGOS,
}: {
  variant?: 'grid' | 'marquee'
  logos?: string[]
}) {
  if (variant === 'marquee') {
    return (
      <Marquee itemClassName="items-center gap-12 md:gap-16 pr-12 md:pr-16">
        {logos.map((src, i) => (
          <div key={i} className="group flex h-9 md:h-11 w-[104px] md:w-[128px] shrink-0 items-center justify-center">
            <img src={src} alt="" loading="lazy" className={`${IMG} group-hover:!grayscale-0 group-hover:!opacity-100 group-hover:scale-110`} />
          </div>
        ))}
      </Marquee>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 md:grid-cols-5 lg:grid-cols-6">
      {logos.map((src, i) => (
        <Reveal key={i} delay={(i % 6) * 45}>
          <div className="group flex h-16 items-center justify-center rounded-2xl px-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_22px_44px_-22px_rgba(23,23,27,0.22)] md:h-[74px] md:px-5">
            <img
              src={src}
              alt="Brand manufactured by Radnik"
              loading="lazy"
              className={`max-h-[34px] sm:max-h-[38px] md:max-h-[42px] ${IMG.replace('max-h-full ', '')} group-hover:!grayscale-0 group-hover:!opacity-100 group-hover:scale-[1.14]`}
            />
          </div>
        </Reveal>
      ))}
    </div>
  )
}
