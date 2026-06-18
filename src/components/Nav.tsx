import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV } from '@/data/site'
import { cn } from '@/lib/utils'
import Logo from './Logo'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    // Lenis ignores body overflow, so stop it explicitly while the menu is open;
    // the overflow lock stays as a fallback for the reduced-motion / no-Lenis case.
    if (open) window.__lenis?.stop()
    else window.__lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      window.__lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out text-ink backdrop-blur-xl',
        scrolled ? 'bg-paper/90 border-b border-line shadow-[0_1px_30px_-12px_rgba(0,0,0,0.2)]' : 'bg-paper/85 border-b border-line'
      )}
    >
      <div className="edge flex items-center justify-between h-[74px]">
        <Link to="/" aria-label="Radnik Exports — home"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'font-mono text-[11px] uppercase tracking-[0.18em] link-underline transition-colors',
                  isActive ? 'text-ink' : 'text-stone hover:text-ink'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-red !py-3 !px-5">Start an inquiry</Link>
        </nav>

        <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="lg:hidden p-2 -mr-2 text-ink">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-paper border-l border-line flex flex-col"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between h-[74px] px-6 border-b border-line">
                <Logo compact />
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2 text-ink"><X className="h-6 w-6" /></button>
              </div>
              <nav className="flex flex-col px-6 py-4">
                {[{ label: 'Home', path: '/' }, ...NAV].map((item, i) => (
                  <motion.div key={item.path} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                    <NavLink to={item.path} className="flex items-center justify-between py-4 d-3 border-b border-line group text-ink">
                      {item.label}
                      <ArrowUpRight className="h-5 w-5 text-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                  </motion.div>
                ))}
                <Link to="/contact" className="btn btn-red justify-center mt-8">Start an inquiry</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
