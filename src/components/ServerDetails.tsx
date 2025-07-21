import { useState } from 'react'
import { copyToClipboard } from '../utils/clipboard'
import './ServerDetails.css'

function ServerDetails() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isCopying, setIsCopying] = useState(false)

  const handleCopyIP = async () => {
    const success = await copyToClipboard('95.173.217.154:2456')
    
    if (success) {
      setIsCopying(true)
      setShowTooltip(true)
      
      // Haptic feedback for mobile
      if ('vibrate' in navigator) {
        navigator.vibrate(50)
      }
      
      setTimeout(() => {
        setIsCopying(false)
      }, 500)
      
      setTimeout(() => {
        setShowTooltip(false)
      }, 2000)
    }
  }

  return (
    <section className="section server-section" id="server-details">
      <div className="container">
        <h2>Server Details</h2>
        <div className="server-panel">
          <div className="ip-container">
            <div className="ip-label">Server Address</div>
            <button 
              className={`modern-ip-field ${isCopying ? 'copied' : ''}`}
              onClick={handleCopyIP}
              aria-label="Copy server IP address to clipboard"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>95.173.217.154:2456</span>
              <div className={`modern-tooltip ${showTooltip ? 'show' : ''}`}>
                Copied to clipboard!
              </div>
            </button>
          </div>
          
          <div className="password-hint">
            <div className="ip-label">Password Hint</div>
            <p>Derek's favorite animal</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServerDetails