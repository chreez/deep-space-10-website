import { useState } from 'react'
import './SetupInstructions.css'
import GameDirectoryTree from './GameDirectoryTree'

function SetupInstructions() {
  const [showInstallHint, setShowInstallHint] = useState(false)
  const [hoveredLegend, setHoveredLegend] = useState<'existing' | 'modpack' | null>(null)
  const [hoveredItem, setHoveredItem] = useState<'existing' | 'modpack' | null>(null)
  
  const getHighlightClass = (itemType: 'existing' | 'modpack') => {
    if (hoveredLegend === itemType || hoveredItem === itemType) {
      return 'highlight-effect'
    }
    return ''
  }
  
  const scrollToServerDetails = () => {
    document.getElementById('server-details')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="section setup-section" id="setup-instructions">
      <div className="container">
        <h2>Install</h2>
        <p className="section-subtitle">
          ⚠️ Initial launch will take a moment. Hang tight, Viking! 🪓
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
            <div className="download-wait-hint">
              <p>While the download completes, why not...</p>
              <button 
                className="link-button"
                onClick={scrollToServerDetails}
                aria-label="Scroll to server details section"
              >
                Get the server password →
              </button>
            </div>
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
                <h4>📂 Find Your Valheim Directory</h4>
                <button 
                  className="hover-hint" 
                  onClick={() => setShowInstallHint(!showInstallHint)}
                  aria-expanded={showInstallHint}
                >
                  Where's my install folder?
                </button>
                {showInstallHint && (
                  <div className="hint-box">
                    <strong>Steam:</strong> Right click Valheim → Manage → Browse local files<br/>
                    <strong>Default location:</strong> <code>C:/Program Files (x86)/Steam/steamapps/common/Valheim</code>
                  </div>
                )}
              </div>

              <div className="install-step">
                <h4>📋 Copy All Files</h4>
                <p>Copy the <strong>entire contents</strong> of the extracted folder into your Valheim directory.</p>
                <div className="directory-structure">
                  <div className="directory-header">Your Valheim folder should look like this after installation:</div>
                  <div className={`directory-tree ${hoveredLegend || hoveredItem ? 'has-hover' : ''}`}>
                    <div className="tree-item">
                      <span className="folder-icon">📁</span> Valheim/
                    </div>
                    <div 
                      className={`tree-item indent ${getHighlightClass('existing')}`}
                      onMouseEnter={() => setHoveredItem('existing')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="file-icon existing">✅</span> valheim_Data/
                    </div>
                    <div 
                      className={`tree-item indent ${getHighlightClass('modpack')}`}
                      onMouseEnter={() => setHoveredItem('modpack')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="file-icon modpack">📦</span> <strong>BepInEx/</strong> <span className="tag">← from modpack</span>
                    </div>
                    <div 
                      className={`tree-item indent ${getHighlightClass('modpack')}`}
                      onMouseEnter={() => setHoveredItem('modpack')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="file-icon modpack">📦</span> <strong>doorstop_libs/</strong> <span className="tag">← from modpack</span>
                    </div>
                    <div 
                      className={`tree-item indent ${getHighlightClass('existing')}`}
                      onMouseEnter={() => setHoveredItem('existing')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="file-icon existing">✅</span> valheim.exe
                    </div>
                    <div 
                      className={`tree-item indent ${getHighlightClass('existing')}`}
                      onMouseEnter={() => setHoveredItem('existing')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="file-icon existing">✅</span> UnityPlayer.dll
                    </div>
                    <div 
                      className={`tree-item indent ${getHighlightClass('modpack')}`}
                      onMouseEnter={() => setHoveredItem('modpack')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="file-icon modpack">📄</span> <strong>doorstop_config.ini</strong> <span className="tag">← from modpack</span>
                    </div>
                    <div 
                      className={`tree-item indent ${getHighlightClass('modpack')}`}
                      onMouseEnter={() => setHoveredItem('modpack')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="file-icon modpack">📄</span> <strong>winhttp.dll</strong> <span className="tag">← from modpack</span>
                    </div>
                  </div>
                  <div className="directory-footer">
                    <div 
                      className="legend-item legend-existing"
                      onMouseEnter={() => setHoveredLegend('existing')}
                      onMouseLeave={() => setHoveredLegend(null)}
                    >
                      <span className="file-icon existing">✅</span>
                      <span>Existing game files</span>
                    </div>
                    <div 
                      className="legend-item legend-modpack"
                      onMouseEnter={() => setHoveredLegend('modpack')}
                      onMouseLeave={() => setHoveredLegend(null)}
                    >
                      <span className="file-icon modpack">📦📄</span>
                      <span>New modpack files</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        <GameDirectoryTree />
      </div>
    </section>
  )
}

export default SetupInstructions