import Reveal from './motion/Reveal'

/** Client logo grids, grouped by region. Assets are exported from the Radnik deck. */
const REGIONS = [
  { label: 'United Kingdom & Europe', src: '/images/clients/uk-europe.png', alt: 'Global brands Radnik manufactures for across the UK and Europe' },
  { label: 'United States', src: '/images/clients/usa.png', alt: 'Global brands Radnik manufactures for across the United States' },
  { label: 'Designer collaborations · H&M', src: '/images/clients/collabs.png', alt: 'H&M designer collaboration lines manufactured by Radnik' },
]

export default function ClientLogoWall() {
  return (
    <div className="space-y-5 md:space-y-7">
      {REGIONS.map((r, i) => (
        <Reveal key={r.label} delay={i * 90}>
          <figure className="group overflow-hidden rounded-2xl border border-line bg-white transition-all duration-500 ease-out hover:-translate-y-1 hover:border-red/30 hover:shadow-[0_34px_70px_-34px_rgba(23,23,27,0.28)]">
            <figcaption className="flex items-center gap-2 border-b border-line px-5 py-3 md:px-7 md:py-3.5">
              <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-red transition-transform duration-500 group-hover:scale-150" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone transition-colors duration-500 group-hover:text-ink">{r.label}</span>
            </figcaption>
            <img src={r.src} alt={r.alt} loading="lazy" className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]" />
          </figure>
        </Reveal>
      ))}
    </div>
  )
}
