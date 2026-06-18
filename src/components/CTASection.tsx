import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Reveal from './motion/Reveal'
import TextReveal from './motion/TextReveal'

type Props = {
  heading?: string
  body?: string
  variant?: 'red' | 'ink'
}

export default function CTASection({
  heading = "Let's build your next program.",
  body = 'Tell us your category, volumes and timelines. Our team will respond with capacity, lead time and a path to first sample.',
  variant = 'red',
}: Props) {
  const red = variant === 'red'
  return (
    <section className={cn('relative overflow-hidden text-white', red ? 'bg-red' : 'bg-charcoal')}>
      <div className="edge py-16 md:py-32">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <Reveal><div className={cn('eyebrow mb-6', red ? 'text-white/70' : 'text-red')}>Start a conversation</div></Reveal>
            <TextReveal text={heading} as="h2" className="d-1 text-white max-w-3xl" />
            <Reveal delay={150}><p className={cn('mt-7 max-w-xl text-lg leading-relaxed', red ? 'text-white/85' : 'text-white/65')}>{body}</p></Reveal>
          </div>
          <Reveal delay={200} className="lg:justify-self-end">
            <Link to="/contact" className={cn('btn !py-4 !px-6 md:!px-8 text-[13px] !whitespace-normal md:!whitespace-nowrap text-center', red ? 'btn-paper' : 'btn-red')}>
              Start a sourcing conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
