import Logo from './ui/Logo.jsx'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Book Consultation', href: '#book' },
  { label: 'Order', href: '#order' },
  { label: 'Our Work', href: '#work' },
  { label: 'Reviews', href: '#reviews' },
]

/* PLACEHOLDER: swap in the real contact email / phone before launch */
const CONTACT = {
  email: 'hello@gvowebdesign.com',
  phone: '(555) 012-3456',
}

/* PLACEHOLDER: point these at the real social profiles before launch */
const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5.5A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5zM17.6 6a.9.9 0 1 0 .9.9.9.9 0 0 0-.9-.9z" />
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V10H8.5v3H11v8h2.5z" />
    ),
  },
  {
    label: 'X',
    href: '#',
    icon: <path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L2.2 3h6.4l4.4 5.9L17.5 3zm-1.1 16h1.7L7.7 4.7H5.9L16.4 19z" />,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm6 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9V9z" />,
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-950 px-4 pb-8 pt-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="text-chrome-soft mt-5 font-display text-sm font-bold tracking-wide">
              Good Vibes Only.
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-500">
              Websites built for local businesses that want to grow — designed, launched, and
              maintained by GVO.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-neutral-500 transition hover:border-white/25 hover:text-silver-200"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-silver-600">
              Quick links
            </p>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-neutral-500 transition hover:text-silver-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-silver-600">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 text-neutral-500 transition hover:text-silver-200">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/[^\d]/g, '')}`} className="flex items-center gap-2.5 text-neutral-500 transition hover:text-silver-200">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </svg>
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-neutral-600">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                <span>
                  Mon–Fri 5:30–9:00 PM
                  <br />
                  Sat–Sun 11:00 AM–8:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="chrome-hr mt-12 opacity-50" />
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-neutral-600 sm:flex-row">
          <p>© {new Date().getFullYear()} GVO Web Design. All rights reserved.</p>
          <p className="font-display font-semibold tracking-[0.2em] text-silver-700">GOOD VIBES ONLY</p>
        </div>
      </div>
    </footer>
  )
}
