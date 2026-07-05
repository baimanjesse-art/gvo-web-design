import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Pricing from './components/Pricing.jsx'
import Booking from './components/Booking.jsx'
import Order from './components/Order.jsx'
import Portfolio from './components/Portfolio.jsx'
import Reviews from './components/Reviews.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Pricing />
        <Booking />
        <Order />
        <Portfolio />
        <Reviews />
      </main>
      <Footer />
    </div>
  )
}
