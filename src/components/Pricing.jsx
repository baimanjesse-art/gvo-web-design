import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { TIERS, CUSTOM_TIER, ADDONS, PAYMENT_TERMS, fmt } from '../data/pricing.js'
import { useNavigation } from '../context/NavigationContext.jsx'

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-silver-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  )
}

function DetailRow({ label, children }) {
  return (
    <div>
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-silver-600">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function TierCard({ tier, delay }) {
  const { goTo } = useNavigation()
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`relative flex h-full flex-col rounded-2xl border p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${
          tier.popular
            ? 'border-silver-400/40 bg-ink-700/90 ring-1 ring-silver-400/25 backdrop-blur-sm'
            : 'border-white/8 bg-ink-800/90 backdrop-blur-sm'
        }`}
      >
        {tier.popular && (
          <span className="btn-chrome absolute -top-3.5 left-1/2 -translate-x-1/2 !rounded-full !px-4 !py-1 text-[11px] uppercase tracking-widest">
            Most Popular
          </span>
        )}

        <h3 className="font-display text-lg font-bold text-silver-200">{tier.name}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-chrome font-display text-4xl font-extrabold">{fmt(tier.price)}</span>
          <span className="text-sm text-neutral-500">one-time</span>
        </div>
        <p className="mt-1 text-sm text-neutral-500">
          + {fmt(tier.monthly)}/mo maintenance <span className="text-neutral-600">(optional)</span>
        </p>

        <p className="mt-5 text-sm leading-relaxed text-neutral-400">{tier.bestFor}</p>

        <div className="chrome-hr my-6" />

        <div className="flex flex-1 flex-col gap-5">
          <DetailRow label="What's included">
            <ul className="space-y-2">
              {tier.includes.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-neutral-300">
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DetailRow>

          <DetailRow label="Turnaround">
            <p className="text-sm text-neutral-300">{tier.turnaround}</p>
          </DetailRow>

          <DetailRow label={`Monthly plan (${fmt(tier.monthly)}/mo) includes`}>
            <ul className="flex flex-wrap gap-1.5">
              {tier.monthlyIncludes.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-ink-900 px-2.5 py-1 text-xs text-neutral-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </DetailRow>
        </div>

        <button onClick={() => goTo('order')} className={`${tier.popular ? 'btn-chrome' : 'btn-ghost'} mt-7 w-full`}>
          Choose {tier.name}
        </button>
      </article>
    </Reveal>
  )
}

export default function Pricing() {
  const { goTo } = useNavigation()
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Flat pricing. No surprises."
          sub="One-time build price, optional monthly maintenance, and add-ons you can mix and match across tiers."
        />

        <div className="grid gap-6 pt-4 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} delay={i * 0.1} />
          ))}
        </div>

        {/* Custom tier, full-width card */}
        <Reveal className="mt-6">
          <article className="flex flex-col gap-8 rounded-2xl border border-white/8 bg-ink-800/90 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm md:flex-row md:items-center md:p-9">
            <div className="md:w-1/3">
              <h3 className="font-display text-lg font-bold text-silver-200">{CUSTOM_TIER.name}</h3>
              <p className="text-chrome mt-3 font-display text-3xl font-extrabold">Quoted per project</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{CUSTOM_TIER.bestFor}</p>
            </div>
            <div className="grid flex-1 gap-5 sm:grid-cols-3">
              <DetailRow label="What's included">
                <p className="text-sm text-neutral-300">{CUSTOM_TIER.includes[0]}</p>
              </DetailRow>
              <DetailRow label="Turnaround">
                <p className="text-sm text-neutral-300">{CUSTOM_TIER.turnaround}</p>
              </DetailRow>
              <DetailRow label="Monthly plan">
                <p className="text-sm text-neutral-300">{CUSTOM_TIER.monthlyIncludes[0]}</p>
              </DetailRow>
            </div>
            <div className="md:pl-2">
              <button onClick={() => goTo('book')} className="btn-chrome w-full md:w-auto">
                Book a Consultation
              </button>
            </div>
          </article>
        </Reveal>

        {/* Add-ons */}
        <Reveal className="mt-14">
          <h3 className="text-chrome-soft text-center font-display text-2xl font-bold">
            Pick-a-Feature Add-Ons
          </h3>
          <p className="mt-2 text-center text-sm text-neutral-500">
            Mix & match features across tiers instead of buying a full upgrade.
          </p>
          <div className="mx-auto mt-7 max-w-3xl overflow-hidden rounded-2xl border border-white/8 bg-ink-800/90 backdrop-blur-sm">
            <ul className="divide-y divide-white/5">
              {ADDONS.map((addon) => (
                <li key={addon.id} className="flex items-center justify-between gap-4 px-6 py-4">
                  <span className="text-sm text-neutral-300">{addon.label}</span>
                  <span className="text-chrome-soft shrink-0 font-display text-sm font-bold">
                    {addon.pct ? '+25%' : fmt(addon.price)}
                    {addon.unit && !addon.pct && (
                      <span className="ml-1.5 font-body text-xs font-normal text-neutral-500">
                        {addon.unit}
                      </span>
                    )}
                    {addon.pct && (
                      <span className="ml-1.5 font-body text-xs font-normal text-neutral-500">
                        of project price
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Payment terms */}
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-xl border border-white/8 bg-ink-900/85 px-6 py-5 backdrop-blur-sm">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-silver-600">
              Payment terms
            </p>
            <ul className="mt-3 space-y-2">
              {PAYMENT_TERMS.map((term) => (
                <li key={term} className="flex gap-2 text-xs leading-relaxed text-neutral-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-silver-600" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
