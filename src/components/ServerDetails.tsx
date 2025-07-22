import { useState, useEffect } from 'react'
import { copyToClipboard } from '../utils/clipboard'
import DerekKnowledgeTest from './DerekKnowledgeTest'
import './ServerDetails.css'

function ServerDetails() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  // Check localStorage on mount
  useEffect(() => {
    const completed = localStorage.getItem('derekQuizCompleted') === 'true'
    setQuizCompleted(completed)
  }, [])

  const handleQuizCompleted = () => {
    setQuizCompleted(true)
    localStorage.setItem('derekQuizCompleted', 'true')
  }

  const handleCopyIP = async () => {
    // Only allow copying if quiz is completed
    if (!quizCompleted) {
      return
    }
    
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
              className={`modern-ip-field ${isCopying ? 'copied' : ''} ${!quizCompleted ? 'redacted' : ''}`}
              onClick={handleCopyIP}
              aria-label={quizCompleted ? "Copy server IP address to clipboard" : "Complete Derek's quiz to reveal server address"}
              aria-live="polite"
              aria-atomic="true"
              disabled={!quizCompleted}
            >
              <span>{quizCompleted ? '95.173.217.154:2456' : 'REDACTED'}</span>
              {!quizCompleted && (
                <div className="redacted-hint">Complete Derek's quiz to reveal</div>
              )}
              <div className={`modern-tooltip ${showTooltip ? 'show' : ''}`}>
                Copied to clipboard!
              </div>
            </button>
          </div>
          
          <div className="password-hint">
            <div className="ip-label">Password Hint</div>
            <p>Derek's favorite animal</p>
          </div>
          
          <DerekKnowledgeTest onQuizCompleted={handleQuizCompleted} />
        </div>
      </div>
    </section>
  )
}

export default ServerDetails