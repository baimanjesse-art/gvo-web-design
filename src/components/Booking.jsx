import { useEffect } from 'react'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

/* PLACEHOLDER: replace with real Calendly link before deployment */
const CALENDLY_URL =
  'https://calendly.com/gvo-web-design/consultation?hide_gdpr_banner=1&background_color=0a0a0a&text_color=e8e8e8&primary_color=c0c0c0'

const HOURS = [
  { days: 'Mon – Fri', hours: '5:30 PM – 9:00 PM' },
  { days: 'Sat – Sun', hours: '11:00 AM – 8:00 PM' },
]

export default function Booking() {
  useEffect(() => {
    // Calendly inline embed script — injected once, reused on re-mounts
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <section id="book" className="scroll-mt-16 bg-ink-900 px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Book a Consultation"
          title="Let's talk about your project"
          sub="Pick a time that works for you — consultations are free, no pressure, and usually take about 20 minutes."
        />

        <Reveal>
          <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {HOURS.map((slot) => (
              <div
                key={slot.days}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/8 bg-ink-800 px-5 py-3.5 sm:w-auto"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-silver-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                <span className="font-display text-sm font-semibold text-silver-200">{slot.days}</span>
                <span className="text-sm text-neutral-400">{slot.hours}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-ink-800 p-2">
            {/* PLACEHOLDER: replace with real Calendly link */}
            <div
              className="calendly-inline-widget"
              data-url={CALENDLY_URL}
              style={{ minWidth: '300px', height: '700px' }}
            />
          </div>
          <p className="mt-4 text-center text-xs text-neutral-600">
            Calendar not loading?{' '}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="text-silver-400 underline underline-offset-2 hover:text-silver-200"
            >
              Open our scheduling page in a new tab
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
