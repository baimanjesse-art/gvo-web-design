import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { TIERS, CUSTOM_TIER, ADDONS, fmt } from '../data/pricing.js'

const ALL_TIERS = [...TIERS, CUSTOM_TIER]

const INDUSTRIES = [
  'Landscaping',
  'Restaurant / Café',
  'Fitness & Wellness',
  'Retail & Boutique',
  'Home Services',
  'Beauty & Salon',
  'Professional Services',
  'Other',
]

/* Landscaping client intake questionnaire */
const LANDSCAPING_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfYrAjob2JjX6Ez1XRyNWBfrP4U00DIRYgsOcuXQ_E1bTmaZw/viewform?usp=header'

const STEPS = ['Business Info', 'Package', 'Intake', 'Payment']

const inputCls =
  'w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-sm text-neutral-200 outline-none transition placeholder:text-neutral-600 focus:border-silver-400/60 focus:ring-1 focus:ring-silver-400/40'
const labelCls = 'mb-1.5 block font-display text-xs font-semibold uppercase tracking-[0.14em] text-silver-500'
const errCls = 'mt-1.5 text-xs text-red-400/90'

function Stepper({ step }) {
  return (
    <ol className="mb-10 flex items-center justify-between gap-2">
      {STEPS.map((label, i) => {
        const n = i + 1
        const done = step > n
        const active = step === n
        return (
          <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold transition ${
                done || active ? 'btn-chrome !rounded-full !p-0' : 'border border-white/10 bg-ink-800 text-neutral-500'
              }`}
            >
              {done ? (
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
              ) : (
                n
              )}
            </span>
            <span
              className={`hidden font-display text-xs font-semibold sm:block ${
                active ? 'text-silver-100' : done ? 'text-silver-400' : 'text-neutral-600'
              }`}
            >
              {label}
            </span>
            {n < STEPS.length && <span className="chrome-hr hidden flex-1 opacity-40 sm:block" />}
          </li>
        )
      })}
    </ol>
  )
}

function CountStepper({ value, onChange }) {
  return (
    <span className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Remove one"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-neutral-400 transition hover:border-white/25 hover:text-silver-100"
      >
        −
      </button>
      <span className="w-5 text-center font-display text-sm font-bold text-silver-200">{value}</span>
      <button
        type="button"
        aria-label="Add one"
        onClick={() => onChange(Math.min(9, value + 1))}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-neutral-400 transition hover:border-white/25 hover:text-silver-100"
      >
        +
      </button>
    </span>
  )
}

export default function Order() {
  const [step, setStep] = useState(1)
  const [info, setInfo] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
  })
  const [tierId, setTierId] = useState(null)
  const [counts, setCounts] = useState({ featureToBasic: 0, featureToPro: 0 })
  const [checked, setChecked] = useState({ logo: false, copywriting: false, rush: false, ecommerce: false })
  const [maintenance, setMaintenance] = useState(false)
  const [errors, setErrors] = useState({})
  const [payNote, setPayNote] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const tier = ALL_TIERS.find((t) => t.id === tierId) || null
  const isCustom = tierId === 'custom'

  const totals = useMemo(() => {
    if (!tier || isCustom) return null
    let subtotal = tier.price
    if (tierId === 'basic') subtotal += counts.featureToBasic * 50
    if (tierId === 'pro') subtotal += counts.featureToPro * 100
    if (checked.logo) subtotal += 250
    if (checked.rush) subtotal += 150
    if (checked.ecommerce) subtotal += 600
    const copywriting = checked.copywriting ? Math.round(subtotal * 0.25) : 0
    const oneTime = subtotal + copywriting
    const monthly = (maintenance ? tier.monthly : 0) + (checked.ecommerce ? 25 : 0)
    return { subtotal, copywriting, oneTime, monthly, deposit: Math.round(oneTime / 2) }
  }, [tier, tierId, isCustom, counts, checked, maintenance])

  const selectedAddons = useMemo(() => {
    const lines = []
    if (tierId === 'basic' && counts.featureToBasic > 0)
      lines.push({ label: `Pro-tier features × ${counts.featureToBasic}`, amount: counts.featureToBasic * 50 })
    if (tierId === 'pro' && counts.featureToPro > 0)
      lines.push({ label: `Exclusive-tier features × ${counts.featureToPro}`, amount: counts.featureToPro * 100 })
    if (checked.logo) lines.push({ label: 'Logo Design', amount: 250 })
    if (checked.rush) lines.push({ label: 'Rush Delivery (50% faster)', amount: 150 })
    if (checked.ecommerce) lines.push({ label: 'E-commerce Add-On (up to 25 products)', amount: 600 })
    if (checked.copywriting)
      lines.push({ label: 'Professional Copywriting (+25%)', amount: totals ? totals.copywriting : null })
    return lines
  }, [tierId, counts, checked, totals])

  const validateStep1 = () => {
    const e = {}
    if (!info.businessName.trim()) e.businessName = 'Business name is required.'
    if (!info.contactName.trim()) e.contactName = 'Contact name is required.'
    if (!/^\S+@\S+\.\S+$/.test(info.email)) e.email = 'Enter a valid email address.'
    if (!info.industry) e.industry = 'Select your industry.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !tierId) {
      setErrors({ tier: 'Pick a package to continue.' })
      return
    }
    setErrors({})
    setStep((s) => Math.min(4, s + 1))
  }

  const back = () => {
    setErrors({})
    setPayNote(false)
    setStep((s) => Math.max(1, s - 1))
  }

  const submitOrder = () => {
    /* No backend yet — the order payload is logged for now and a confirmation
       screen is shown. Wire this to a real endpoint / email service later. */
    const order = {
      ...info,
      package: tier?.name,
      addons: selectedAddons.map((l) => l.label),
      maintenance: isCustom ? 'per contract' : maintenance,
      totals: totals ?? 'quoted per project',
      submittedAt: new Date().toISOString(),
    }
    console.log('GVO order submitted:', order)
    setSubmitted(true)
  }

  const setField = (key) => (ev) => setInfo((v) => ({ ...v, [key]: ev.target.value }))

  return (
    <section id="order" className="scroll-mt-16 bg-ink-850 px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Place Your Order"
          title="Start your build"
          sub="Four quick steps — tell us who you are, pick your package, and we'll take it from there."
        />

        <Reveal>
          <div className="rounded-2xl border border-white/8 bg-ink-800 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-9">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="btn-chrome mx-auto flex h-16 w-16 items-center justify-center !rounded-full !p-0">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l5 5L19 7" />
                  </svg>
                </div>
                <h3 className="text-chrome mt-6 font-display text-3xl font-extrabold">Order received</h3>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
                  Thanks, {info.contactName.split(' ')[0] || 'friend'} — we've got everything we need
                  to get started on <span className="text-silver-200">{info.businessName}</span>. We'll
                  reach out at <span className="text-silver-200">{info.email}</span> within 24 hours to
                  confirm details and arrange the deposit.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a href="#book" className="btn-chrome">Book your consultation now</a>
                  <a href="#home" className="btn-ghost">Back to top</a>
                </div>
              </div>
            ) : (
              <>
                <Stepper step={step} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {/* ---- Step 1: Business info ---- */}
                    {step === 1 && (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className={labelCls} htmlFor="order-business">Business name *</label>
                          <input id="order-business" className={inputCls} placeholder="e.g. Sierra Ridge Landscaping" value={info.businessName} onChange={setField('businessName')} />
                          {errors.businessName && <p className={errCls}>{errors.businessName}</p>}
                        </div>
                        <div>
                          <label className={labelCls} htmlFor="order-contact">Contact name *</label>
                          <input id="order-contact" className={inputCls} placeholder="Your full name" value={info.contactName} onChange={setField('contactName')} />
                          {errors.contactName && <p className={errCls}>{errors.contactName}</p>}
                        </div>
                        <div>
                          <label className={labelCls} htmlFor="order-email">Email *</label>
                          <input id="order-email" type="email" className={inputCls} placeholder="you@business.com" value={info.email} onChange={setField('email')} />
                          {errors.email && <p className={errCls}>{errors.email}</p>}
                        </div>
                        <div>
                          <label className={labelCls} htmlFor="order-phone">Phone</label>
                          <input id="order-phone" type="tel" className={inputCls} placeholder="(555) 555-5555" value={info.phone} onChange={setField('phone')} />
                        </div>
                        <div>
                          <label className={labelCls} htmlFor="order-industry">Industry *</label>
                          <select id="order-industry" className={inputCls} value={info.industry} onChange={setField('industry')}>
                            <option value="" disabled>Select your industry…</option>
                            {INDUSTRIES.map((ind) => (
                              <option key={ind} value={ind}>{ind}</option>
                            ))}
                          </select>
                          {errors.industry && <p className={errCls}>{errors.industry}</p>}
                        </div>
                      </div>
                    )}

                    {/* ---- Step 2: Package + add-ons ---- */}
                    {step === 2 && (
                      <div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {ALL_TIERS.map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setTierId(t.id)}
                              className={`rounded-xl border p-4 text-left transition ${
                                tierId === t.id
                                  ? 'border-silver-300/60 bg-ink-700 ring-1 ring-silver-300/40'
                                  : 'border-white/10 bg-ink-900 hover:border-white/25'
                              }`}
                            >
                              <span className="flex items-center justify-between">
                                <span className="font-display text-sm font-bold text-silver-200">{t.name}</span>
                                {t.popular && (
                                  <span className="rounded-full border border-silver-400/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-silver-300">
                                    Popular
                                  </span>
                                )}
                              </span>
                              <span className="text-chrome-soft mt-1 block font-display text-xl font-extrabold">
                                {t.price ? fmt(t.price) : 'Quoted'}
                              </span>
                              <span className="mt-1 block text-xs leading-relaxed text-neutral-500">{t.bestFor}</span>
                            </button>
                          ))}
                        </div>
                        {errors.tier && <p className={errCls}>{errors.tier}</p>}

                        <p className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.14em] text-silver-500">
                          Add-ons <span className="normal-case tracking-normal text-neutral-600">(optional — mix & match)</span>
                        </p>
                        <ul className="mt-3 divide-y divide-white/5 rounded-xl border border-white/10 bg-ink-900">
                          {ADDONS.map((addon) => {
                            if (addon.onlyTier && addon.onlyTier !== tierId) return null
                            const isCount = !!addon.countable
                            return (
                              <li key={addon.id} className="flex items-center justify-between gap-4 px-4 py-3.5">
                                <label className="flex flex-1 cursor-pointer items-center gap-3">
                                  {!isCount && (
                                    <input
                                      type="checkbox"
                                      checked={checked[addon.id]}
                                      onChange={(ev) => setChecked((v) => ({ ...v, [addon.id]: ev.target.checked }))}
                                      className="h-4 w-4 accent-silver-300"
                                    />
                                  )}
                                  <span className="text-sm text-neutral-300">
                                    {addon.label}
                                    <span className="ml-2 text-xs text-neutral-600">
                                      {addon.pct ? '+25% of project price' : `${fmt(addon.price)}${addon.unit ? ` ${addon.unit}` : ''}`}
                                    </span>
                                  </span>
                                </label>
                                {isCount && (
                                  <CountStepper
                                    value={counts[addon.id]}
                                    onChange={(n) => setCounts((v) => ({ ...v, [addon.id]: n }))}
                                  />
                                )}
                              </li>
                            )
                          })}
                          {!isCustom && tier && (
                            <li className="flex items-center justify-between gap-4 px-4 py-3.5">
                              <label className="flex flex-1 cursor-pointer items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={maintenance}
                                  onChange={(ev) => setMaintenance(ev.target.checked)}
                                  className="h-4 w-4 accent-silver-300"
                                />
                                <span className="text-sm text-neutral-300">
                                  Monthly maintenance plan
                                  <span className="ml-2 text-xs text-neutral-600">{fmt(tier.monthly)}/mo</span>
                                </span>
                              </label>
                            </li>
                          )}
                        </ul>

                        <div className="mt-6 flex items-center justify-between rounded-xl border border-silver-400/20 bg-ink-900 px-5 py-4">
                          <span className="font-display text-sm font-semibold text-silver-400">Estimated total</span>
                          <span className="text-right">
                            <span className="text-chrome block font-display text-2xl font-extrabold">
                              {isCustom ? 'Quoted per project' : tier && totals ? fmt(totals.oneTime) : '—'}
                            </span>
                            {!isCustom && totals && totals.monthly > 0 && (
                              <span className="text-xs text-neutral-500">+ {fmt(totals.monthly)}/mo</span>
                            )}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* ---- Step 3: Industry-specific intake ---- */}
                    {step === 3 && (
                      <div className="text-center">
                        {info.industry === 'Landscaping' ? (
                          <div>
                            <h3 className="text-chrome-soft font-display text-xl font-bold">
                              Landscaping intake questionnaire
                            </h3>
                            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
                              Tell us about your services, coverage area, and the jobs you want more
                              of — it takes about five minutes and gives us everything we need to
                              write and structure your site.
                            </p>
                            <a
                              href={LANDSCAPING_FORM_URL}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-chrome mt-7"
                            >
                              Open the intake form
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17L17 7M9 7h8v8" />
                              </svg>
                            </a>
                            <p className="mt-4 text-xs text-neutral-600">
                              Opens in a new tab — you can also finish it after placing your order.
                            </p>
                          </div>
                        ) : (
                          /* WIP: industry-specific intake forms beyond Landscaping are coming soon */
                          <div>
                            <h3 className="text-chrome-soft font-display text-xl font-bold">
                              Intake questionnaire
                            </h3>
                            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
                              Our intake form for{' '}
                              <span className="text-silver-200">
                                {info.industry === 'Other' ? 'your industry' : info.industry}
                              </span>{' '}
                              is coming soon — we'll email you a custom questionnaire within 24 hours
                              of receiving your order.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ---- Step 4: Payment placeholder ---- */}
                    {step === 4 && (
                      <div>
                        <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-silver-500">
                          Order summary
                        </h3>
                        <dl className="mt-4 space-y-2.5 text-sm">
                          <div className="flex justify-between gap-4">
                            <dt className="text-neutral-500">Business</dt>
                            <dd className="text-right text-neutral-200">{info.businessName}</dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="text-neutral-500">Contact</dt>
                            <dd className="text-right text-neutral-200">{info.contactName} · {info.email}</dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="text-neutral-500">Package</dt>
                            <dd className="text-right text-neutral-200">
                              {tier?.name}{' '}
                              <span className="text-neutral-500">
                                {isCustom ? '(quoted per project)' : `— ${fmt(tier.price)}`}
                              </span>
                            </dd>
                          </div>
                          {selectedAddons.map((line) => (
                            <div key={line.label} className="flex justify-between gap-4">
                              <dt className="text-neutral-500">{line.label}</dt>
                              <dd className="text-right text-neutral-200">
                                {line.amount != null ? fmt(line.amount) : 'quoted'}
                              </dd>
                            </div>
                          ))}
                          {!isCustom && maintenance && tier && (
                            <div className="flex justify-between gap-4">
                              <dt className="text-neutral-500">Monthly maintenance</dt>
                              <dd className="text-right text-neutral-200">{fmt(tier.monthly)}/mo</dd>
                            </div>
                          )}
                        </dl>

                        <div className="chrome-hr my-5" />

                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="text-sm text-neutral-500">One-time total</p>
                            <p className="text-chrome font-display text-3xl font-extrabold">
                              {isCustom ? 'Quoted' : totals ? fmt(totals.oneTime) : '—'}
                            </p>
                            {!isCustom && totals && totals.monthly > 0 && (
                              <p className="mt-1 text-xs text-neutral-500">plus {fmt(totals.monthly)}/mo ongoing</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-neutral-500">Deposit due today (50%)</p>
                            <p className="text-chrome-soft font-display text-2xl font-extrabold">
                              {isCustom ? 'Quoted' : totals ? fmt(totals.deposit) : '—'}
                            </p>
                          </div>
                        </div>

                        {/* PLACEHOLDER: integrate real PayPal/Venmo once business accounts are set up */}
                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                          <button type="button" onClick={() => setPayNote(true)} className="btn-ghost w-full !border-white/20" aria-describedby="pay-note">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                              <path d="M7.3 20.5H4.7a.6.6 0 0 1-.6-.7L6.8 4.3a1 1 0 0 1 1-.8h6.7c2.9 0 4.9 1.6 4.9 4.3 0 3.5-2.6 5.9-6.4 5.9h-2.7l-1 6.1a.8.8 0 0 1-.8.7h-1.2z" />
                            </svg>
                            Pay with PayPal
                          </button>
                          <button type="button" onClick={() => setPayNote(true)} className="btn-ghost w-full !border-white/20" aria-describedby="pay-note">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                              <path d="M17.8 3.5c.7 1.2 1 2.4 1 4 0 4.9-4.2 11.3-7.6 15h-5L3.4 5.3l5.5-.5 1.5 11.9c1.4-2.3 3.2-5.9 3.2-8.4 0-1.4-.2-2.3-.6-3.1l4.8-1.7z" />
                            </svg>
                            Pay with Venmo
                          </button>
                        </div>
                        <AnimatePresence>
                          {payNote && (
                            <motion.p
                              id="pay-note"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 overflow-hidden rounded-lg border border-silver-400/20 bg-ink-900 px-4 py-3 text-center text-xs text-neutral-400"
                            >
                              Payment setup coming soon — place your order below and we'll follow up
                              via email to arrange the deposit.
                            </motion.p>
                          )}
                        </AnimatePresence>

                        <button type="button" onClick={submitOrder} className="btn-chrome mt-6 w-full !py-4 text-base">
                          Place Order
                        </button>
                        <p className="mt-3 text-center text-xs text-neutral-600">
                          No payment is collected now. Submitting sends us your order details — we'll
                          confirm everything by email before any work or charges begin.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Wizard controls */}
                <div className="mt-9 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 1}
                    className={`btn-ghost !px-5 ${step === 1 ? 'invisible' : ''}`}
                  >
                    ← Back
                  </button>
                  {step < 4 && (
                    <button type="button" onClick={next} className="btn-chrome !px-8">
                      Continue →
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
