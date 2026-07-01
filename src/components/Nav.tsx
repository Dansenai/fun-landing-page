import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Home, Menu, X, ArrowUpRight, Building2, Layers, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV } from '@/data/site'
import { cn } from '@/lib/utils'
import Logo from './Logo'

// Quick-access items for the mobile bottom dock (the rest live behind "Menu").
const DOCK = [
  { label: 'Home', path: '/', Icon: Home, end: true },
  { label: 'About', path: '/about', Icon: Building2 },
  { label: 'Capabilities', path: '/capabilities', Icon: Layers },
  { label: 'Contact', path: '/contact', Icon: Phone },
]

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

  const dockItem = 'relative flex flex-col items-center justify-center gap-1 rounded-full px-2 py-1.5 min-w-[52px] transition-all duration-200 active:scale-90'
  const dockLabel = 'relative z-10 font-mono text-[8px] uppercase tracking-[0.06em] leading-none whitespace-nowrap'

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out text-ink backdrop-blur-xl',
          scrolled ? 'bg-paper/90 border-b border-line shadow-[0_1px_30px_-12px_rgba(0,0,0,0.2)]' : 'bg-paper/85 border-b border-line'
        )}
      >
        <div className="edge flex items-center justify-center lg:justify-between h-[74px]">
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
        </div>
      </header>

      {/* ===== Mobile bottom dock (quick nav + full menu) ===== */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(14px,env(safe-area-inset-bottom))] pointer-events-none">
        <nav
          aria-label="Quick navigation"
          className="pointer-events-auto flex items-stretch gap-0.5 rounded-full border border-white/10 bg-ink/95 px-2 py-2 text-paper backdrop-blur-md shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)]"
        >
          {DOCK.map(({ label, path, Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) => cn(dockItem, isActive ? 'text-red' : 'text-paper/70 hover:text-paper')}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="dockActive"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-white/[0.09]"
                    />
                  )}
                  <Icon className={cn('relative z-10 h-[19px] w-[19px] transition-transform duration-300', isActive && 'scale-110')} strokeWidth={1.7} />
                  <span className={dockLabel}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
          <button type="button" onClick={() => setOpen(true)} aria-label="Open full menu" className={cn(dockItem, 'text-paper/70 hover:text-paper')}>
            <Menu className="relative z-10 h-[19px] w-[19px]" strokeWidth={1.7} />
            <span className={dockLabel}>Menu</span>
          </button>
        </nav>
      </div>

      {/* ===== Mobile right-edge "Enquire Now" tab ===== */}
      <Link
        to="/contact"
        aria-label="Enquire now"
        className="lg:hidden fixed right-0 top-1/2 z-40 origin-right -translate-y-1/2 rounded-l-xl bg-red text-white shadow-lg shadow-red/30 transition-all duration-200 hover:pr-3.5 hover:shadow-xl hover:shadow-red/40 active:scale-95"
      >
        <span className="block px-2.5 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] [writing-mode:vertical-rl] rotate-180">
          Enquire&nbsp;Now
        </span>
      </Link>

      {/* Drawer rendered through a portal to <body> — the header's backdrop-blur would otherwise
          become the containing block for this fixed overlay and trap it inside the bar. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
              <motion.div
                className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-paper border-l border-line flex flex-col shadow-2xl"
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between h-[74px] px-6 border-b border-line shrink-0">
                  <Logo compact />
                  <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2 text-ink"><X className="h-6 w-6" /></button>
                </div>
                <nav className="flex flex-col px-6 py-4 overflow-y-auto">
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
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
