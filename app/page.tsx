import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Portfolio from './components/Portfolio'
import ComingSoon from './components/ComingSoon'
import Process from './components/Process'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div style={{ width: '100%', height: '0.5px', background: 'var(--dim)' }} />
        <Manifesto />
        <div style={{ width: '100%', height: '0.5px', background: 'var(--dim)' }} />
        <Portfolio />
        <div style={{ width: '100%', height: '0.5px', background: 'var(--dim)' }} />
        <ComingSoon id="artist" title="Artist" />
        <div style={{ width: '100%', height: '0.5px', background: 'var(--dim)' }} />
        <ComingSoon id="carclub" title="Car Club" />
        <div style={{ width: '100%', height: '0.5px', background: 'var(--dim)' }} />
        <ComingSoon id="skateteam" title="Skate Team" />
        <div style={{ width: '100%', height: '0.5px', background: 'var(--dim)' }} />
        <Process />
        <div style={{ width: '100%', height: '0.5px', background: 'var(--dim)' }} />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
