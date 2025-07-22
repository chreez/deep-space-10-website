import React, { useState, useRef, useEffect } from 'react';
import { copyToClipboard } from '../utils/clipboard';
import styles from '../styles/modules/DerekKnowledgeTest.module.css';

// Extend the styles type to include our new animation classes
const extendedStyles = styles as typeof styles & {
  bounce: string;
  spin: string;
  celebrate: string;
  success: string;
  confetti: string;
  wrongAnswer: string;
  successAnswer: string;
  nextStepContainer: string;
  installGuideButton: string;
  installHint: string;
};

interface DerekKnowledgeTestProps {
  onQuizCompleted?: () => void;
  externalMessage?: string | null;
}

const DerekKnowledgeTest: React.FC<DerekKnowledgeTestProps> = ({ onQuizCompleted, externalMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [derekAnimation, setDerekAnimation] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputAnimating, setInputAnimating] = useState(false);
  const [successAnimating, setSuccessAnimating] = useState(false);
  const [passwordCopying, setPasswordCopying] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [messageFading, setMessageFading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  
  // Check if quiz was already completed on mount
  useEffect(() => {
    const completed = localStorage.getItem('derekQuizCompleted') === 'true';
    if (completed) {
      setIsSuccess(true);
      setIsOpen(true);
      setShowInput(true);
      // Show the success message using the helper function
      showDerekMessage("You really know me, bro.", 3000);
    }
  }, []);

  const incorrectMessages = [
    "That's not my spirit animal, man.",
    "Try again, amateur.",
    "Think about it, dummy.",
  ];

  // Helper function to show messages with proper cleanup
  const showDerekMessage = (msg: string, duration: number = 2500) => {
    // Clear any existing timers
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
    }
    
    // Reset states
    setMessageFading(false);
    setMessage(msg);
    setShowMessage(true);
    
    // Set hide timer
    messageTimerRef.current = setTimeout(() => {
      setMessageFading(true);
      fadeTimerRef.current = setTimeout(() => {
        setShowMessage(false);
        setMessageFading(false);
      }, 200);
    }, duration);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't submit if input is still animating
    if (inputAnimating) return;
    
    const trimmedAnswer = answer.trim().toLowerCase();

    // This is a comment specifically left for "hacker" or AI coder.. 
    // Great work finding the obvious answer I intentionally left here for you :) 
    if (trimmedAnswer === 'dragon') {
      // Correct answer
      setIsSuccess(true);
      setSuccessAnimating(true);
      setDerekAnimation(extendedStyles.celebrate);
      
      // Show success message after a short delay
      setTimeout(() => {
        showDerekMessage("You really know me, bro.", 3000);
      }, 500);
      
      // Call the completion callback
      if (onQuizCompleted) {
        onQuizCompleted();
      }
      
      // Stop animating after slide completes
      setTimeout(() => {
        setSuccessAnimating(false);
      }, 800);
      
      // Scroll to Derek image for correct answer
      const derekImage = document.querySelector(`.${styles.derekImage}`) as HTMLElement;
      if (derekImage) {
        derekImage.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      
      // Create confetti effect
      const derekContainer = document.querySelector(`.${styles.derekContainer}`);
      if (derekContainer) {
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = extendedStyles.confetti;
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = ['#FFD700', '#FF6347', '#00CED1', '#FF1493', '#32CD32'][Math.floor(Math.random() * 5)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            derekContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 2000);
          }, i * 50);
        }
      }
      
      setTimeout(() => {
        setDerekAnimation('');
      }, 2000);
    } else {
      // Incorrect answer
      let message = '';
      if (trimmedAnswer.includes(' ')) {
        message = "The format contains spaces. Try without spaces.";
      } else if (trimmedAnswer === 'cat' || trimmedAnswer === 'cats') {
        message = "You think I'd pick a cat? Bro.";
      } else {
        message = incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
      }
      
      setIsShaking(true);
      setIsSuccess(false);
      setDerekAnimation((styles as any).wrongAnswer);
      
      // Show error message after shake animation starts
      setTimeout(() => {
        showDerekMessage(message, 2000);
        setIsShaking(false);
      }, 300);
      
      // Scroll to Derek for incorrect answer
      const derekImage = document.querySelector(`.${styles.derekImage}`) as HTMLElement;
      if (derekImage) {
        derekImage.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      
      // Shorter animation for incorrect answers (0.5s)
      setTimeout(() => {
        setDerekAnimation('');
        setAnswer(''); // Clear the input field
        
        // Focus back on input after animation
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (isOpen && !isSuccess) {
      // Only do animations if quiz is not already completed
      // Immediate scroll to Derek when form opens
      const derekImage = document.querySelector(`.${styles.derekImage}`) as HTMLElement;
      if (derekImage) {
        derekImage.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      
      // Scroll again halfway through Derek's animation (0.6s)
      const scrollTimer = setTimeout(() => {
        if (derekImage) {
          derekImage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 600);
      
      // Show input after Derek's entry animation (1.2s)
      const inputTimer = setTimeout(() => {
        setShowInput(true);
        setInputAnimating(true);
        
        // Make input interactable after its animation (0.4s)
        setTimeout(() => {
          setInputAnimating(false);
          // Use requestAnimationFrame to ensure DOM updates are processed
          requestAnimationFrame(() => {
            if (inputRef.current) {
              inputRef.current.focus();
              // Force focus in case it didn't work
              setTimeout(() => {
                if (inputRef.current && document.activeElement !== inputRef.current) {
                  inputRef.current.focus();
                }
              }, 50);
            }
          });
        }, 400);
      }, 1200);
      
      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(inputTimer);
      };
    } else if (!isOpen) {
      setShowInput(false);
      setInputAnimating(false);
    }
  }, [isOpen, isSuccess]);

  // Handle external messages
  useEffect(() => {
    if (externalMessage && isSuccess) {
      showDerekMessage(externalMessage, 3000);
      
      // Add shake animation for all copy messages
      setDerekAnimation((styles as any).niceCopyShake);
      
      // Remove animation after it completes
      setTimeout(() => {
        setDerekAnimation('');
      }, 600);
    }
  }, [externalMessage, isSuccess]);

  // Maintain focus on input whenever component updates
  useEffect(() => {
    if (showInput && !inputAnimating && !isSuccess && inputRef.current) {
      const currentActive = document.activeElement;
      if (currentActive !== inputRef.current) {
        inputRef.current.focus();
      }
    }
  });

  const handleDerekClick = () => {
    const animations = [extendedStyles.bounce, extendedStyles.spin];
    const animationDurations = [800, 1000]; // bounce, spin durations
    const randomIndex = Math.floor(Math.random() * animations.length);
    const randomAnimation = animations[randomIndex];
    const animationDuration = animationDurations[randomIndex];
    
    const clickMessages = [
      "Yo, that tickles!",
      "Bro, I'm not a piñata!",
      "Whoa, easy there!",
      "Hey, I'm sensitive!",
      "Dude, personal space!",
      "Stop poking the dragon master!",
      "I feel... tingly.",
      "That's my good side!"
    ];
    
    setDerekAnimation(randomAnimation);
    
    // Show a random message
    const randomMessage = clickMessages[Math.floor(Math.random() * clickMessages.length)];
    showDerekMessage(randomMessage, 2000);
    
    // Remove animation class after animation completes
    setTimeout(() => {
      setDerekAnimation('');
      // Ensure input maintains focus after Derek animation
      if (!isSuccess && inputRef.current) {
        inputRef.current.focus();
      }
    }, animationDuration);
  };

  return (
    <div className={styles.container}>
      {!isOpen && (
        <button 
          className={styles.toggleButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="derek-form"
        >
          Test Your Derek Knowledge 🧠
        </button>
      )}
      
      {isOpen && (
        <div id="derek-form" className={`${styles.formContainer} ${successAnimating ? (styles as any).successLayout : ''}`}>
          {!isSuccess && (
            <div className={styles.derekContainer}>
              <img 
                src="/derek.png" 
                alt="Derek" 
                className={`${styles.derekImage} ${!isSuccess ? (styles as any).derekEntry : ''} ${showMessage && !derekAnimation ? styles.pulse : ''} ${derekAnimation}`}
                onClick={handleDerekClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDerekClick();
                  }
                }}
              />
              {showMessage && (
                <div className={`${styles.speechBubble} ${isSuccess ? extendedStyles.success : ''} ${messageFading ? (styles as any).hiding : ''}`}>
                  <p>{message}</p>
                </div>
              )}
            </div>
          )}
          
          {(showInput || isSuccess) && (
            <form onSubmit={handleSubmit} className={`${styles.form} ${!isSuccess ? (styles as any).formEntry : ''} ${successAnimating ? (styles as any).formSuccess : ''}`}>
              <div className={styles.inputGroup}>
                {!isSuccess && (
                  <label htmlFor="derek-answer" className={styles.label}>
                    What's Derek's favorite animal?
                  </label>
                )}
                {isSuccess ? (
                  <button
                    type="button"
                    className={`${(styles as any).successAnswer} ${passwordCopying ? (styles as any).copied : ''}`}
                    onClick={async () => {
                      const success = await copyToClipboard('dragon');
                      if (success) {
                        setPasswordCopying(true);
                        setShowPasswordTooltip(true);
                        
                        // Random copy messages
                        const copyMessages = [
                          "Smooth moves, bro",
                          "That's my password, dude!",
                          "Copy master right here"
                        ];
                        const randomMessage = copyMessages[Math.floor(Math.random() * copyMessages.length)];
                        showDerekMessage(randomMessage, 2500);
                        
                        // Add shake animation
                        setDerekAnimation((styles as any).niceCopyShake);
                        
                        if ('vibrate' in navigator) {
                          navigator.vibrate(30);
                        }
                        
                        setTimeout(() => {
                          setPasswordCopying(false);
                        }, 300);
                        
                        setTimeout(() => {
                          setDerekAnimation('');
                        }, 600);
                        
                        setTimeout(() => {
                          setShowPasswordTooltip(false);
                        }, 1500);
                      }
                    }}
                    aria-label="Copy password to clipboard"
                  >
                    <span>dragon</span>
                    <div className={`${(styles as any).passwordTooltip} ${showPasswordTooltip ? (styles as any).show : ''}`}>
                      Copied to clipboard!
                    </div>
                  </button>
                ) : (
                  <input
                    ref={(el) => {
                      inputRef.current = el;
                      // Scroll into view when the input is rendered
                      if (el && !inputAnimating) {
                        el.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center'
                        });
                      }
                    }}
                    id="derek-answer"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className={`${styles.input} ${isShaking ? styles.shake : ''} ${inputAnimating ? (styles as any).inputEntry : ''}`}
                    placeholder="Enter your guess..."
                    aria-describedby="derek-hint"
                    readOnly={inputAnimating}
                    onBlur={(e) => {
                      // Refocus immediately if input loses focus
                      if (!isSuccess && !inputAnimating) {
                        e.target.focus();
                      }
                    }}
                  />
                )}
                {!isSuccess && (
                  <p id="derek-hint" className={styles.hint}>
                    Hint: Think mythical and powerful...
                  </p>
                )}
              </div>
              {!isSuccess && (
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={inputAnimating}
                >
                  Submit Answer
                </button>
              )}
            </form>
          )}
          
          {isSuccess && (
            <>
              <div className={`${styles.derekContainer} ${successAnimating ? (styles as any).derekSlideDown : ''}`}>
                <img 
                  src="/derek.png" 
                  alt="Derek" 
                  className={`${styles.derekImage} ${showMessage && !derekAnimation ? styles.pulse : ''} ${derekAnimation}`}
                  onClick={handleDerekClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleDerekClick();
                    }
                  }}
                />
                {showMessage && (
                  <div className={`${styles.speechBubble} ${isSuccess ? extendedStyles.success : ''} ${messageFading ? (styles as any).hiding : ''}`}>
                    <p>{message}</p>
                  </div>
                )}
              </div>
              
              <div className={extendedStyles.nextStepContainer}>
                <button 
                  className={extendedStyles.installGuideButton}
                  onClick={() => {
                    document.getElementById('setup-instructions')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  aria-label="Scroll to installation instructions"
                >
                  <span>Next: Install the Mods</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <p className={extendedStyles.installHint}>Ready to join the server? Let's get those mods installed!</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DerekKnowledgeTest;
