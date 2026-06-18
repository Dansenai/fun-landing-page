import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { COMPANY } from '@/data/site'
import Nav from './Nav'
import Footer from './Footer'
import SmoothScroll from './motion/SmoothScroll'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-paper">
        <ScrollToTop />
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />

        <a
          href={`https://wa.me/${COMPANY.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-5 right-5 z-40 hidden lg:inline-flex items-center justify-center h-12 w-12 rounded-full bg-red text-white shadow-lg shadow-red/30 transition-transform hover:scale-110"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </SmoothScroll>
  )
}
