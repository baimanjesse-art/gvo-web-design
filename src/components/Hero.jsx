import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] scroll-mt-16 flex-col items-center justify-center overflow-hidden bg-black px-4 pb-20 pt-24"
    >
      {/* Soft silver glow behind the logo video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(200,200,200,0.10) 0%, rgba(120,120,120,0.04) 45%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[600px]"
      >
        {/*
          Animated chrome logo with light-sweep effect (1620x1276, ~5s, H.264/AAC).
          Edges are feathered via CSS mask so the video's black background
          melts into the hero with no visible frame.
        */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-video-mask h-auto w-full select-none"
          aria-label="GVO Web Design animated chrome logo"
        >
          <source src="/videos/gvo-logo-sweep.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative -mt-4 max-w-2xl text-center"
      >
        <h1 className="text-chrome font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Good Vibes Only
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          Websites built for local businesses that want to grow — designed, launched, and
          maintained by a team that treats your business like its own.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a href="#book" className="btn-chrome w-full sm:w-auto">
            Book a Consultation
          </a>
          <a href="#pricing" className="btn-ghost w-full sm:w-auto">
            View Pricing
          </a>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-silver-600 transition hover:text-silver-300"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.a>

      {/* Blend hero black into the page's ink background */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink-900" />
    </section>
  )
}
