import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { COMPANY, NAV, CERTS } from '@/data/site'
import Logo from './Logo'
import Marquee from './motion/Marquee'
import { LinkedinIcon } from './icons'

export default function Footer() {
  const allCerts = [...CERTS.quality, ...CERTS.materials, ...CERTS.defense]
  return (
    <footer className="bg-sand text-ink border-t border-line">
      <Link to="/contact" className="block border-b border-line py-8 group">
        <Marquee>
          <span className="d-2 text-ink/80 group-hover:text-red transition-colors px-8 flex items-center gap-8">
            Start a sourcing conversation <ArrowUpRight className="h-8 w-8 text-red" />
          </span>
        </Marquee>
      </Link>

      <div className="border-b border-line">
        <div className="edge py-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="eyebrow text-red">Certified</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {allCerts.map((c) => <span key={c} className="font-mono text-[11px] tracking-wide text-stone">{c}</span>)}
          </div>
        </div>
      </div>

      <div className="edge py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-stone leading-relaxed">
            A 50-year apparel & technical-textile manufacturing house in Delhi NCR — building for the world's
            leading brands and India's defense forces.
          </p>
          <a href={COMPANY.linkedin} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-ink hover:text-red link-underline">
            <LinkedinIcon className="h-4 w-4" /> LinkedIn
          </a>
        </div>
        <div>
          <h4 className="eyebrow text-stone mb-5">Explore</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="text-sm text-ink/80 hover:text-red link-underline">Home</Link></li>
            {NAV.map((n) => <li key={n.path}><Link to={n.path} className="text-sm text-ink/80 hover:text-red link-underline">{n.label}</Link></li>)}
          </ul>
        </div>
        {COMPANY.offices.map((o) => (
          <div key={o.label}>
            <h4 className="eyebrow text-stone mb-5">{o.label}</h4>
            <address className="not-italic text-sm text-stone leading-relaxed">{o.lines.map((l) => <div key={l}>{l}</div>)}</address>
            {o.label === 'Corporate Office' && (
              <div className="mt-4 space-y-1 text-sm">
                <a href={`mailto:${COMPANY.email}`} className="block text-ink/80 hover:text-red link-underline">{COMPANY.email}</a>
                <a href={`tel:${COMPANY.phoneHref}`} className="block text-ink/80 hover:text-red link-underline">{COMPANY.phone}</a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="edge py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-wide text-stone">© {new Date().getFullYear()} Radnik Exports. All rights reserved.</p>
          <p className="font-mono text-[11px] tracking-wide text-stone">Delhi NCR · India · Since 1973</p>
        </div>
      </div>
    </footer>
  )
}
