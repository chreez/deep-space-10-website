import React, { useState, useRef, useEffect } from 'react';
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
};

const DerekKnowledgeTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [derekAnimation, setDerekAnimation] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputAnimating, setInputAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const incorrectMessages = [
    "That's not my spirit animal, man.",
    "Try again, amateur.",
    "Think about it, dummy.",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't submit if input is still animating
    if (inputAnimating) return;
    
    const trimmedAnswer = answer.trim().toLowerCase();
    
    if (trimmedAnswer === 'dragon') {
      // Correct answer
      setMessage("You really know me, bro.");
      setShowMessage(false);
      setIsSuccess(true);
      setDerekAnimation(extendedStyles.celebrate);
      
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
        setShowMessage(true);
      }, 500);
      
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
      
      setMessage(message);
      setShowMessage(false);
      setIsShaking(true);
      setIsSuccess(false);
      setDerekAnimation((styles as any).wrongAnswer);
      
      // Scroll to Derek for incorrect answer
      const derekImage = document.querySelector(`.${styles.derekImage}`) as HTMLElement;
      if (derekImage) {
        derekImage.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      
      setTimeout(() => {
        setShowMessage(true);
        setIsShaking(false);
      }, 300);
      
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
    if (isOpen) {
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
    } else {
      setShowInput(false);
      setInputAnimating(false);
    }
  }, [isOpen]);

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
    setMessage(randomMessage);
    setShowMessage(false);
    
    setTimeout(() => {
      setShowMessage(true);
    }, 100);
    
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
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="derek-form"
      >
        Test Your Derek Knowledge 🧠
      </button>
      
      {isOpen && (
        <div id="derek-form" className={styles.formContainer}>

          <div className={styles.derekContainer}>
            <img 
              src="/derek.png" 
              alt="Derek" 
              className={`${styles.derekImage} ${(styles as any).derekEntry} ${showMessage && !derekAnimation ? styles.pulse : ''} ${derekAnimation}`}
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
              <div className={`${styles.speechBubble} ${isSuccess ? extendedStyles.success : ''}`}>
                <p>{message}</p>
              </div>
            )}
          </div>
          {showInput && (
            <form onSubmit={handleSubmit} className={`${styles.form} ${(styles as any).formEntry}`}>
              <div className={styles.inputGroup}>
                <label htmlFor="derek-answer" className={styles.label}>
                  What's Derek's favorite animal?
                </label>
                {isSuccess ? (
                  <span className={(styles as any).successAnswer}>dragon</span>
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
                <p id="derek-hint" className={styles.hint}>
                  Hint: Think mythical and powerful...
                </p>
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
          
        </div>
      )}
    </div>
  );
};

export default DerekKnowledgeTest;