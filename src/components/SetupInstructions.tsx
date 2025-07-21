import { useState } from 'react'
import './SetupInstructions.css'

function SetupInstructions() {
  const [showInstallHint, setShowInstallHint] = useState(false)

  return (
    <section className="section setup-section" id="setup-instructions">
      <div className="container">
        <h2>Quick Setup</h2>
        <p className="section-subtitle">
          ⚠️ First launch will take a moment. Hang tight, Viking! 🪓
        </p>
        
        <div className="card-grid">
          <div className="modern-card">
            <div className="step-indicator">1</div>
            <h3>Download Modpack</h3>
            <p>Get the required mods from our GitHub repository.</p>
            <p className="download-instruction">Click on <strong>deepspace10.rar</strong> to download</p>
            <a 
              href="https://github.com/chreez/deep-space-10-valheim/releases" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="modern-btn card-btn"
              aria-label="Download deepspace10.rar modpack from GitHub (opens in new tab)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download Modpack
            </a>
          </div>

          <div className="modern-card">
            <div className="step-indicator">2</div>
            <h3>Install Files</h3>
            <p>Drop the files into your Valheim directory.</p>
            <button 
              className="hover-hint" 
              onClick={() => setShowInstallHint(!showInstallHint)}
              aria-expanded={showInstallHint}
            >
              Where's my install folder
            </button>
            {showInstallHint && (
              <div className="hint-box">
                Right click Valheim in Steam → Manage → Browse local files
              </div>
            )}
          </div>

          <div className="modern-card">
            <div className="step-indicator">3</div>
            <h3>Launch Game</h3>
            <p>Start Valheim normally through Steam. The mods will load automatically.</p>
            <div className="success-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="success-icon">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>A second window labeled <strong>'BepInEx'</strong> should launch, confirming successful mod installation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SetupInstructions