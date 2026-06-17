import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Reveal from './motion/Reveal'
import TextReveal from './motion/TextReveal'

type Props = {
  eyebrow?: string
  title: string
  intro?: ReactNode
  align?: 'left' | 'center'
  dark?: boolean // true = on dark/red bg (white title)
  accent?: 'red' | 'white'
  className?: string
  size?: 'd-1' | 'd-2'
}

export default function SectionHeading({
  eyebrow, title, intro, align = 'left', dark = false, accent = 'red', className, size = 'd-2',
}: Props) {
  const accentText = accent === 'white' ? 'text-white/75' : 'text-red'
  const accentBg = accent === 'white' ? 'bg-white/75' : 'bg-red'
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <div className={cn('eyebrow mb-5 flex items-center gap-3', align === 'center' && 'justify-center')}>
            <span className={cn('h-px w-8', accentBg)} />
            <span className={accentText}>{eyebrow}</span>
          </div>
        </Reveal>
      )}
      <TextReveal text={title} as="h2" className={cn(size, dark ? 'text-white' : 'text-ink')} />
      {intro && (
        <Reveal delay={180}>
          <p className={cn('mt-6 text-lg leading-relaxed text-pretty', dark ? 'text-white/70' : 'text-stone')}>{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
