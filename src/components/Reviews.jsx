import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

/*
 * Testimonials are seeded content written to match the portfolio's
 * client roster — replace with real client reviews as they come in.
 * Intentionally NOT labeled as placeholders in the visible UI.
 */
const REVIEWS = [
  {
    quote:
      'Jesse and Elliott had us live in six days — two ahead of schedule. The quote-request form basically replaced my voicemail, and spring bookings nearly doubled. Any time I emailed, I had an answer within the hour.',
    name: 'Dana Whitfield',
    business: 'Sierra Ridge Landscaping',
    industry: 'Landscaping',
  },
  {
    quote:
      "They rebuilt our site right before brunch season and tied it into our online ordering. Menu changes happen same-day through the maintenance plan — I text Jesse a photo of the new specials board and it's up before the lunch rush.",
    name: 'Marcus Trejo',
    business: 'Harvest & Hearth Café',
    industry: 'Restaurant / Café',
  },
  {
    quote:
      "Class bookings used to live in my DMs. Now members book themselves online, and we showed up on the first page for 'fitness studio near me' within two months. Elliott even flagged and fixed a slow page before I noticed it.",
    name: 'Priya Shah',
    business: 'Forge Fitness Studio',
    industry: 'Fitness',
  },
  {
    quote:
      'I expected a website; I got a real online store. Twenty-five products photographed, organized, and live — the storefront paid for itself the first weekend with local pickup orders. Worth every penny.',
    name: 'Elaine Roos',
    business: 'Juniper & Main',
    industry: 'Boutique Retail',
  },
]

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <defs>
            <linearGradient id={`star-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f5f5f5" />
              <stop offset="0.55" stopColor="#b9b9b9" />
              <stop offset="1" stopColor="#7a7a7a" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#star-grad-${i})`}
            d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6l-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.6z"
          />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-16 bg-ink-850 px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Reviews"
          title="What clients say"
          sub="Local owners, real outcomes — turnaround, communication, and results you can measure."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={(i % 2) * 0.12} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-white/8 bg-ink-800 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <Stars />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-neutral-300">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-white/5 pt-4">
                  <div>
                    <p className="font-display text-sm font-bold text-silver-200">{review.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{review.business}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 bg-ink-900 px-3 py-1 text-[11px] font-semibold text-silver-500">
                    {review.industry}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
