import { useEffect, useState } from 'react'
import './SetupInstructions.css'

function SetupInstructions() {
  const [OS, setOS] = useState('')

  useEffect(() => {
    setOS(getOS())
  }, [])

  const getOS = () => {
    if (navigator.userAgent.indexOf('Win') != -1) {
      return 'Windows'
    }
    return ''
  }

  return (
    <section className="section setup-section" id="setup-instructions">
      <div className="container">
        <h2 className="section-title">Installation</h2>
        <p className="section-subtitle">
          Join your fellow cadets on Deep Space 10!<br />
          Installation is quick and easy.
        </p>
        
        <div className="card-grid">
          <div className="modern-card">
            <div className="step-indicator">1</div>
            <h3>Download Modpack</h3>
            <p>Get the required mods from our GitHub repository.</p>
            <p className="download-instruction">Click on <strong>deepspace10.zip</strong> to download</p>
            <a 
              href="https://github.com/chreez/deep-space-10-valheim/releases" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="modern-btn card-btn"
              aria-label="Download deepspace10.zip modpack from GitHub (opens in new tab)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download Modpack
            </a>
          </div>

          <div className="modern-card install-card" id="install-files">
            <div className="step-indicator">2</div>
            <h3>Install Files</h3>
            
            <div className="install-steps">
              <div className="install-step">
                <h4>📁 Extract the Archive</h4>
                <p>Extract <strong>deepspace10.zip</strong> using Windows Explorer, 7-Zip, or your preferred tool.</p>
                <div className="hint-box">
                  <strong>Important:</strong> Extract to a temporary folder first. Do NOT extract directly into your Valheim folder!
                </div>
              </div>

              <div className="install-step">
                <h4>📂 Copy to Valheim</h4>
                <p>After extracting, copy the contents into your Valheim installation folder:</p>
                <code className="path-display">
                  {OS === 'Windows' 
                    ? 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Valheim'
                    : 'Steam/steamapps/common/Valheim'}
                </code>
                <div className="hint-box">
                  <strong>Steam Shortcut:</strong> Right-click Valheim in Steam → Manage → Browse Local Files
                </div>
              </div>

              <div className="install-step">
                <h4>✅ Confirm Installation</h4>
                <p>Your Valheim folder should contain these new items:</p>
                <ul className="file-list">
                  <li>📁 <code>BepInEx</code> folder</li>
                  <li>📄 <code>doorstop_config.ini</code></li>
                  <li>📄 <code>winhttp.dll</code></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="modern-card">
            <div className="step-indicator">3</div>
            <h3>Launch & Play</h3>
            <p>Start Valheim through Steam normally. The mods will load automatically!</p>
            <div className="launch-tips">
              <p><strong>First Launch:</strong> Mods may take 30-60 seconds to initialize.</p>
              <p><strong>Mod Menu:</strong> Press <kbd>F1</kbd> in-game to access mod settings.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SetupInstructions