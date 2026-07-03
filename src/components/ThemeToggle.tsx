import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Keep the browser chrome (mobile URL bar) matched to the page background.
const THEME_COLOR = { light: '#FBFAF6', dark: '#141311' }

function apply(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('rk-theme', dark ? 'dark' : 'light')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? THEME_COLOR.dark : THEME_COLOR.light)
}

export default function ThemeToggle({ className }: { className?: string }) {
  // Dark is the site default (see the boot script in index.html) — the html class,
  // set before paint, is the source of truth here.
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const reduce = useReducedMotion()

  const toggle = () => {
    const next = !dark
    setDark(next)
    apply(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink',
        'transition-all duration-300 ease-out hover:border-red hover:text-red hover:-translate-y-px active:scale-90',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={reduce ? false : { rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={reduce ? undefined : { rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex"
        >
          {dark ? <Moon className="h-[17px] w-[17px]" strokeWidth={1.8} /> : <Sun className="h-[17px] w-[17px]" strokeWidth={1.8} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
