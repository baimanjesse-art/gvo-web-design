import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './ui/Logo.jsx'
import { useNavigation } from '../context/NavigationContext.jsx'

const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Order', id: 'order' },
  { label: 'Our Work', id: 'work' },
  { label: 'Reviews', id: 'reviews' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { active, goTo } = useNavigation()

  const handleNav = (id) => {
    goTo(id)
    setOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button onClick={() => handleNav('home')} className="cursor-pointer border-0 bg-transparent p-0">
          <Logo />
        </button>

        {/* Desktop tabs */}
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                className={`relative cursor-pointer rounded-md px-3.5 py-2 font-display text-sm font-semibold transition ${
                  active === link.id ? 'text-silver-100' : 'text-neutral-400 hover:text-silver-100'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-silver-200"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <button onClick={() => handleNav('book')} className="btn-chrome !px-5 !py-2.5">
            Book a Consultation
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-silver-200 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/5 bg-ink-950/95 backdrop-blur-md lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {[...LINKS, { label: 'Book Consultation', id: 'book' }].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className={`block w-full rounded-md px-3 py-2.5 text-left font-display text-sm font-semibold transition ${
                      active === link.id ? 'bg-white/5 text-silver-100' : 'text-neutral-300 hover:bg-white/5 hover:text-silver-100'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
