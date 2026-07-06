import { motion } from 'framer-motion'
import { useNavigation } from '../context/NavigationContext.jsx'

export default function Hero() {
  const { goTo } = useNavigation()

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl text-center"
      >
        <p className="mb-5 font-display text-xs font-semibold uppercase tracking-[0.34em] text-silver-500">
          GVO Web Design
        </p>
        <h1 className="text-chrome font-display text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Good Vibes Only
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
          Websites built for local businesses that want to grow. Designed, launched, and
          maintained by a team that treats your business like its own.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button onClick={() => goTo('book')} className="btn-chrome w-full sm:w-auto">
            Book a Consultation
          </button>
          <button onClick={() => goTo('pricing')} className="btn-ghost w-full sm:w-auto">
            View Pricing
          </button>
        </div>
      </motion.div>
    </section>
  )
}
