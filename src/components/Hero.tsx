import './Hero.css'

function Hero() {
  const scrollToServerDetails = () => {
    document.getElementById('server-details')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToSetupInstructions = () => {
    document.getElementById('setup-instructions')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <h1 className="hero-title">DS-10</h1>
      <p className="hero-tagline">Connect your longship to the starforge.</p>
      <div className="hero-buttons">
        <button 
          className="modern-btn hero-cta" 
          onClick={scrollToServerDetails}
          aria-label="Scroll to server connection details"
        >
          <span>Server Details</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <button 
          className="modern-btn hero-cta secondary" 
          onClick={scrollToSetupInstructions}
          aria-label="Scroll to setup instructions"
        >
          <span>Quick Start</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Hero