import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import TextReveal from './motion/TextReveal'
import Img from './motion/Img'

type Props = {
  eyebrow: string
  title: string
  intro?: ReactNode
  image: string
  imageAlt: string
}

const EASE = [0.16, 1, 0.3, 1] as const

/** Interior-page hero — light, with a masked headline and a wide parallax photo band. */
export default function PageHero({ eyebrow, title, intro, image, imageAlt }: Props) {
  return (
    <section className="bg-paper">
      <div className="edge pt-36 md:pt-44 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow flex items-center gap-3 text-red mb-7"
        >
          <span className="h-px w-8 bg-red" /> {eyebrow}
        </motion.div>
        <TextReveal text={title} as="h1" className="d-1 max-w-5xl text-ink" delay={0.08} inView={false} />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-stone text-pretty"
          >
            {intro}
          </motion.p>
        )}
      </div>
      <div className="edge pb-2">
        <Img src={image} alt={imageAlt} className="aspect-[16/7] w-full" parallax inView={false} eager />
      </div>
    </section>
  )
}
