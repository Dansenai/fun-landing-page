import { useState, type FormEvent } from 'react'
import { Mail, Phone, MessageCircle, MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import { COMPANY } from '@/data/site'
import Reveal from '@/components/motion/Reveal'
import TextReveal from '@/components/motion/TextReveal'
import { LinkedinIcon } from '@/components/icons'

const CATEGORIES = [
  'Fashion garments', 'Active & sportswear', 'Wovens & knits', 'Soft home & furnishings',
  'Uniforms', 'Defense & technical textiles', 'Accessories', 'Other',
]
const VOLUMES = ['Under 50,000 pcs / yr', '50,000 – 250,000 pcs / yr', '250,000 – 1M pcs / yr', '1M+ pcs / yr']

const fieldCls =
  'w-full bg-white border border-line rounded-md px-4 py-3 text-ink placeholder:text-stone/60 font-sans text-[15px] focus:border-red focus:outline-none focus:ring-1 focus:ring-red transition-colors'
const labelCls = 'block font-mono text-[11px] uppercase tracking-[0.14em] text-stone mb-2'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '').trim()
    const subject = `Sourcing inquiry — ${get('company') || get('name')}`
    const body = [
      `Name: ${get('name')}`, `Company: ${get('company')}`, `Email: ${get('email')}`,
      `Brand / division: ${get('brand')}`, `Product category: ${get('category')}`,
      `Estimated annual volume: ${get('volume')}`, '', 'Message:', get('message'),
    ].join('\n')
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <section className="bg-paper">
        <div className="edge pt-28 pb-10 md:pt-48 md:pb-16">
          <Reveal><div className="eyebrow flex items-center gap-3 text-red"><span className="h-px w-8 bg-red" /> Contact & inquiry</div></Reveal>
          <TextReveal text="Start a sourcing conversation." as="h1" className="d-1 mt-6 max-w-3xl text-ink" delay={0.1} inView={false} />
          <Reveal delay={300}>
            <p className="mt-7 max-w-2xl text-lg md:text-xl text-stone leading-relaxed text-pretty">
              Tell us what you need — category, estimated volumes and timelines — and our team will respond with
              capacity, lead time and a path to first sample.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="edge pb-24 md:pb-28">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20">
            <div>
              {sent ? (
                <div className="border border-line bg-white p-10 text-center">
                  <CheckCircle2 className="h-12 w-12 text-red mx-auto" strokeWidth={1.4} />
                  <h2 className="d-2 mt-6 text-ink">Thank you.</h2>
                  <p className="mt-4 text-stone max-w-md mx-auto leading-relaxed">
                    Your email draft is ready in your mail client. Send it through and our sourcing team will respond
                    shortly. Prefer to talk now? Call <a href={`tel:${COMPANY.phoneHref}`} className="text-red link-underline">{COMPANY.phone}</a>.
                  </p>
                  <button type="button" onClick={() => setSent(false)} className="btn btn-outline mt-8">Submit another inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div><label className={labelCls} htmlFor="name">Name *</label><input id="name" name="name" required className={fieldCls} placeholder="Your full name" /></div>
                    <div><label className={labelCls} htmlFor="company">Company *</label><input id="company" name="company" required className={fieldCls} placeholder="Company name" /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div><label className={labelCls} htmlFor="email">Email *</label><input id="email" name="email" type="email" required className={fieldCls} placeholder="you@company.com" /></div>
                    <div><label className={labelCls} htmlFor="brand">Brand / division</label><input id="brand" name="brand" className={fieldCls} placeholder="If applicable" /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelCls} htmlFor="category">Product category</label>
                      <select id="category" name="category" className={fieldCls} defaultValue=""><option value="" disabled>Select a category</option>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="volume">Estimated annual volume</label>
                      <select id="volume" name="volume" className={fieldCls} defaultValue=""><option value="" disabled>Select a range</option>{VOLUMES.map((v) => <option key={v} value={v}>{v}</option>)}</select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={5} className={fieldCls} placeholder="Tell us about your program, timelines and any compliance requirements." />
                  </div>
                  <button type="submit" className="btn btn-red">Send inquiry <ArrowRight className="h-4 w-4" /></button>
                  <p className="font-mono text-[11px] text-stone tracking-wide">Opens a pre-filled email to {COMPANY.email}.</p>
                </form>
              )}
            </div>

            <div className="space-y-10">
              {COMPANY.offices.map((o) => (
                <div key={o.label}>
                  <div className="eyebrow text-red mb-3 flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {o.label}</div>
                  <address className="not-italic text-stone leading-relaxed">{o.lines.map((l) => <div key={l}>{l}</div>)}</address>
                </div>
              ))}
              <div className="hairline" />
              <div className="space-y-4">
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 py-2 -my-2 text-ink hover:text-red transition-colors"><Mail className="h-4 w-4 text-red" /> {COMPANY.email}</a>
                <a href={`tel:${COMPANY.phoneHref}`} className="flex items-center gap-3 py-2 -my-2 text-ink hover:text-red transition-colors"><Phone className="h-4 w-4 text-red" /> {COMPANY.phone}</a>
                <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 py-2 -my-2 text-ink hover:text-red transition-colors"><MessageCircle className="h-4 w-4 text-red" /> WhatsApp</a>
                <a href={COMPANY.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 py-2 -my-2 text-ink hover:text-red transition-colors"><LinkedinIcon className="h-4 w-4 text-red" /> LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper border-t border-line">
        <iframe
          title="Radnik Exports — Nehru Place, New Delhi"
          src="https://maps.google.com/maps?q=Nehru%20Place%2C%20New%20Delhi%20110048&z=14&output=embed"
          className="w-full h-[360px] md:h-[440px] grayscale-[0.5] contrast-[1.02]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  )
}
