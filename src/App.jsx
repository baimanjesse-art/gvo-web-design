import { AnimatePresence, motion } from 'framer-motion'
import { NavigationProvider, useNavigation } from './context/NavigationContext.jsx'
import VideoBackground from './components/ui/VideoBackground.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Pricing from './components/Pricing.jsx'
import Booking from './components/Booking.jsx'
import Order from './components/Order.jsx'
import Portfolio from './components/Portfolio.jsx'
import Reviews from './components/Reviews.jsx'
import Footer from './components/Footer.jsx'

const SECTIONS = {
  home: Hero,
  about: About,
  pricing: Pricing,
  book: Booking,
  order: Order,
  work: Portfolio,
  reviews: Reviews,
}

function ActiveSection() {
  const { active } = useNavigation()
  const Section = SECTIONS[active] ?? Hero

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Section />
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <NavigationProvider>
      <div className="relative flex min-h-screen flex-col">
        <VideoBackground />
        <Nav />
        <main className="flex-1 pt-16">
          <ActiveSection />
        </main>
        <Footer />
      </div>
    </NavigationProvider>
  )
}
