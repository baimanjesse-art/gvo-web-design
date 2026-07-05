import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

/*
 * Portfolio mockups are illustrative concept builds rendered in CSS
 * (browser-chrome frames with bespoke mini-layouts) — swap with real
 * project screenshots as they're delivered. Intentionally NOT labeled
 * as placeholders in the visible UI.
 */

function BrowserFrame({ url, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-700 shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_26px_50px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-white/5 bg-ink-600 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f56565]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f6e05e]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#68d391]/70" />
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-ink-900/70 px-3 py-1 text-[10px] text-neutral-500">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          {url}
        </span>
      </div>
      <div className="aspect-[16/11] overflow-hidden">{children}</div>
    </div>
  )
}

/* --- Bespoke mini-layouts, one per project --- */

function LandscapingSite() {
  return (
    <div className="flex h-full flex-col bg-[#f4f1e8] text-[#22331f]">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-[9px] font-extrabold tracking-wide text-[#3c5e33]">SIERRA RIDGE</span>
        <span className="flex gap-2.5 text-[7px] font-medium text-[#5a6b52]">
          <span>Services</span><span>Projects</span><span>Reviews</span>
          <span className="rounded-full bg-[#3c5e33] px-2 py-0.5 font-semibold text-[#f4f1e8]">Free Quote</span>
        </span>
      </div>
      <div className="mx-4 mt-1 flex flex-1 gap-3">
        <div className="flex w-1/2 flex-col justify-center gap-1.5">
          <span className="text-[13px] font-extrabold leading-tight">Yards that raise<br />the neighborhood's bar.</span>
          <span className="h-1.5 w-4/5 rounded bg-[#22331f]/15" />
          <span className="h-1.5 w-3/5 rounded bg-[#22331f]/15" />
          <span className="mt-1.5 w-fit rounded-full bg-[#3c5e33] px-3 py-1 text-[7px] font-bold text-[#f4f1e8]">
            Request a Quote →
          </span>
        </div>
        <div className="relative w-1/2 overflow-hidden rounded-lg bg-gradient-to-b from-[#8fb573] to-[#41603a]">
          <div className="absolute bottom-0 left-0 right-0 h-2/5 rounded-t-[60%] bg-[#2f4a2a]" />
          <div className="absolute bottom-[26%] right-[20%] h-7 w-1.5 bg-[#3d2c1e]" />
          <div className="absolute bottom-[40%] right-[13%] h-10 w-10 rounded-full bg-[#578246]" />
        </div>
      </div>
      <div className="mx-4 my-3 grid grid-cols-3 gap-2">
        {['Design + Install', 'Hardscaping', 'Seasonal Care'].map((s) => (
          <div key={s} className="rounded-md bg-white/80 p-1.5 shadow-sm">
            <span className="block h-2.5 w-2.5 rounded bg-[#3c5e33]" />
            <span className="mt-1 block text-[7px] font-bold">{s}</span>
            <span className="mt-0.5 block h-1 w-4/5 rounded bg-[#22331f]/10" />
          </div>
        ))}
      </div>
    </div>
  )
}

function CafeSite() {
  return (
    <div className="flex h-full flex-col bg-[#f8f0e1] text-[#4a2c1a]">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-[9px] font-extrabold italic tracking-wide">Harvest &amp; Hearth</span>
        <span className="flex items-center gap-2.5 text-[7px] font-medium text-[#7a5b43]">
          <span>Menu</span><span>Catering</span><span>Visit</span>
          <span className="rounded-full bg-[#8a3324] px-2 py-0.5 font-semibold text-[#f8f0e1]">Order Online</span>
        </span>
      </div>
      <div className="mt-1 flex flex-col items-center">
        <span className="text-[13px] font-extrabold">Brunch, done properly.</span>
        <span className="mt-1 text-[7px] text-[#7a5b43]">Wood-fired · Locally sourced · Open 7 days</span>
      </div>
      <div className="mx-5 mt-2.5 flex flex-1 flex-col rounded-lg bg-white/70 p-3 shadow-sm">
        <span className="block text-center text-[8px] font-extrabold tracking-[0.2em] text-[#8a3324]">— THE MENU —</span>
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {[
            ['Hearth Skillet', '14'],
            ['Orchard French Toast', '12'],
            ['Smoked Brisket Hash', '16'],
            ['Harvest Cobb', '13'],
            ['Sourdough Melt', '11'],
            ['Sunday Roast Plate', '18'],
          ].map(([item, price]) => (
            <span key={item} className="flex items-baseline gap-1 text-[7px]">
              <span className="font-semibold">{item}</span>
              <span className="flex-1 border-b border-dotted border-[#4a2c1a]/30" />
              <span className="font-bold text-[#8a3324]">{price}</span>
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-center gap-1.5 border-t border-[#4a2c1a]/10 pt-2">
          <span className="h-1 w-1 rounded-full bg-[#8a3324]" />
          <span className="text-[6.5px] font-semibold italic text-[#7a5b43]">
            Fresh sourdough daily — weekend brunch waitlist opens Friday
          </span>
          <span className="h-1 w-1 rounded-full bg-[#8a3324]" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 py-2 text-[7px] font-semibold text-[#7a5b43]">
        <span>Mon–Sun 8a–3p</span><span className="h-0.5 w-0.5 rounded-full bg-[#7a5b43]" /><span>412 Mill Street</span>
      </div>
    </div>
  )
}

function FitnessSite() {
  return (
    <div className="flex h-full flex-col bg-[#131313] text-[#f2f2f2]">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-[9px] font-extrabold tracking-widest text-[#e0562a]">FORGE</span>
        <span className="flex items-center gap-2.5 text-[7px] font-medium text-neutral-400">
          <span>Classes</span><span>Trainers</span><span>Pricing</span>
          <span className="rounded-sm bg-[#e0562a] px-2 py-0.5 font-bold text-black">JOIN</span>
        </span>
      </div>
      <div className="px-4 pt-1">
        <span className="block text-[15px] font-extrabold uppercase leading-none tracking-tight">
          Stronger every<br /><span className="text-[#e0562a]">single session.</span>
        </span>
      </div>
      <div className="mx-4 mt-2.5 flex-1 space-y-1.5">
        {[
          ['6:00 AM', 'Iron Circuit', 'Coach Dee'],
          ['12:15 PM', 'Powerlifting Open', 'Coach Marcus'],
          ['5:30 PM', 'Conditioning 45', 'Coach Rae'],
          ['7:00 PM', 'Forge Fundamentals', 'Coach Dee'],
        ].map(([time, cls, coach]) => (
          <div key={cls} className="flex items-center gap-2 rounded bg-white/5 px-2.5 py-1.5">
            <span className="text-[7px] font-bold text-[#e0562a]">{time}</span>
            <span className="flex-1 text-[8px] font-bold">{cls}</span>
            <span className="text-[6.5px] text-neutral-500">{coach}</span>
            <span className="rounded-sm border border-[#e0562a]/60 px-1.5 py-0.5 text-[6px] font-bold text-[#e0562a]">BOOK</span>
          </div>
        ))}
        <span className="block pt-0.5 text-center text-[6.5px] font-bold tracking-wider text-neutral-500">
          VIEW ALL 30+ WEEKLY CLASSES →
        </span>
      </div>
      <div className="flex justify-around border-t border-white/10 py-2">
        {[['24/7', 'Access'], ['30+', 'Classes/wk'], ['5★', 'Rated']].map(([n, l]) => (
          <span key={l} className="text-center">
            <span className="block text-[10px] font-extrabold text-[#e0562a]">{n}</span>
            <span className="text-[6px] uppercase tracking-wider text-neutral-500">{l}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function BoutiqueSite() {
  return (
    <div className="flex h-full flex-col bg-[#faf5f2] text-[#3d3230]">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-[9px] font-extrabold tracking-[0.18em]">JUNIPER &amp; MAIN</span>
        <span className="flex items-center gap-2.5 text-[7px] font-medium text-[#8c7a72]">
          <span>Shop</span><span>New In</span><span>Our Story</span>
          <span className="relative">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-2 w-2 items-center justify-center rounded-full bg-[#c97b63] text-[5px] font-bold text-white">2</span>
          </span>
        </span>
      </div>
      <div className="mt-0.5 text-center">
        <span className="text-[12px] font-extrabold">The Autumn Edit</span>
        <span className="mx-auto mt-0.5 block h-px w-10 bg-[#c97b63]" />
      </div>
      <div className="mx-4 mt-2.5 grid flex-1 grid-cols-3 gap-2.5">
        {[
          ['Alpaca Throw', '$68', '#d9c3b4'],
          ['Stoneware Set', '$42', '#b9a89b'],
          ['Cedar Candle', '$24', '#cbb4a2'],
        ].map(([name, price, tone]) => (
          <div key={name} className="flex flex-col">
            <div className="flex-1 rounded-md shadow-sm" style={{ backgroundColor: tone }} />
            <span className="mt-1 text-[7px] font-bold">{name}</span>
            <span className="flex items-center justify-between text-[6.5px] text-[#8c7a72]">
              {price}
              <span className="rounded-full bg-[#3d3230] px-1.5 py-0.5 text-[5.5px] font-semibold text-[#faf5f2]">Add</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 bg-[#3d3230] py-1.5 text-center text-[6.5px] font-semibold tracking-wider text-[#faf5f2]">
        FREE LOCAL PICKUP · SHIPS IN 2 DAYS
      </div>
    </div>
  )
}

const PROJECTS = [
  {
    name: 'Sierra Ridge Landscaping',
    industry: 'Landscaping',
    url: 'sierraridgelandscaping.com',
    delivered: '5-page Pro build with quote-request form, project gallery, and local SEO setup.',
    Mock: LandscapingSite,
  },
  {
    name: 'Harvest & Hearth Café',
    industry: 'Restaurant / Café',
    url: 'harvestandhearth.com',
    delivered: 'Full menu site with online-ordering integration and same-day content updates.',
    Mock: CafeSite,
  },
  {
    name: 'Forge Fitness Studio',
    industry: 'Fitness',
    url: 'forgefitness.co',
    delivered: 'Exclusive build with live class schedules, trainer pages, and membership signup.',
    Mock: FitnessSite,
  },
  {
    name: 'Juniper & Main',
    industry: 'Boutique Retail',
    url: 'juniperandmain.shop',
    delivered: 'Custom e-commerce storefront with 25 products, cart, and local-pickup flow.',
    Mock: BoutiqueSite,
  },
]

export default function Portfolio() {
  return (
    <section id="work" className="scroll-mt-16 bg-ink-900 px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Our Work"
          title="Built to win customers"
          sub="Every project is designed around one goal: turning the people who find you into the people who pay you."
        />

        <div className="grid gap-10 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={(i % 2) * 0.12} className="group">
              <BrowserFrame url={project.url}>
                <project.Mock />
              </BrowserFrame>
              <div className="mt-4 flex items-start justify-between gap-4 px-1">
                <div>
                  <h3 className="text-chrome-soft font-display text-lg font-bold">{project.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{project.delivered}</p>
                </div>
                <span className="mt-1 shrink-0 rounded-full border border-white/10 bg-ink-800 px-3 py-1 text-[11px] font-semibold text-silver-400">
                  {project.industry}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
