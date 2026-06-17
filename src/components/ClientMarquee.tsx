import { CLIENTS } from '@/data/site'
import Marquee from './motion/Marquee'

export default function ClientMarquee({ dark = false }: { dark?: boolean }) {
  return (
    <Marquee>
      {CLIENTS.map((c) => (
        <span key={c} className={'d-3 font-semibold whitespace-nowrap px-8 ' + (dark ? 'text-white/35' : 'text-ink/30')}>
          {c}
        </span>
      ))}
    </Marquee>
  )
}
