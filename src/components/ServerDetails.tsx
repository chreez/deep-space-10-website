import { useState, useEffect, useRef } from 'react'
import { copyToClipboard } from '../utils/clipboard'
import DerekKnowledgeTest from './DerekKnowledgeTest'
import './ServerDetails.css'

function ServerDetails() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [derekMessage, setDerekMessage] = useState<string | null>(null)
  const ipButtonRef = useRef<HTMLButtonElement>(null)

  // Check localStorage on mount
  useEffect(() => {
    const completed = localStorage.getItem('derekQuizCompleted') === 'true'
    setQuizCompleted(completed)
    
    // Scroll to Derek image if quiz is completed
    if (completed) {
      setTimeout(() => {
        const derekImage = document.querySelector('img[alt="Derek"]') as HTMLImageElement
        if (derekImage) {
          derekImage.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        if (ipButtonRef.current) {
          // Keep scroll position when focusing the IP button
          ipButtonRef.current.focus({ preventScroll: true } as any)
        }
      }, 100)
    }
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
      
      // Random copy messages for server address
      const serverCopyMessages = [
        'Nice copy bro',
        'Server secured, captain!',
        'You got the coords!'
      ]
      const randomMessage = serverCopyMessages[
        Math.floor(Math.random() * serverCopyMessages.length)
      ]
      setDerekMessage(randomMessage)
      
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
      
      // Clear Derek's message after 3 seconds
      setTimeout(() => {
        setDerekMessage(null)
      }, 3000)
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
              ref={ipButtonRef}
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
          
          <div className="password-container">
            <div className="ip-label">Password</div>
            <DerekKnowledgeTest onQuizCompleted={handleQuizCompleted} externalMessage={derekMessage} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServerDetails
