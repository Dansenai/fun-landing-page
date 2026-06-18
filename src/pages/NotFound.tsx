import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="min-h-[80svh] flex items-center bg-paper text-ink">
      <div className="edge text-center py-20 md:py-32">
        <div className="font-mono text-sm tracking-[0.2em] text-red uppercase">Error 404</div>
        <h1 className="d-1 mt-5 text-ink">This page wasn't on the line.</h1>
        <p className="mt-5 text-lg text-stone max-w-md mx-auto">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn btn-red mt-9"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
      </div>
    </section>
  )
}
