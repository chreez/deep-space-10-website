import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/modules/DerekKnowledgeTest.module.css';

// Extend the styles type to include our new animation classes
const extendedStyles = styles as typeof styles & {
  bounce: string;
  spin: string;
  celebrate: string;
  success: string;
  confetti: string;
};

const DerekKnowledgeTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [derekAnimation, setDerekAnimation] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const incorrectMessages = [
    "That's not my spirit animal, man.",
    "Try again, amateur.",
    "C'mon, I wore that shirt *every day*.",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedAnswer = answer.trim().toLowerCase();
    
    // Scroll Derek into view when answer is submitted
    const derekImage = document.querySelector(`.${styles.derekImage}`) as HTMLElement;
    if (derekImage) {
      derekImage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
    
    if (trimmedAnswer === 'dragon') {
      setMessage("You really know me, bro.");
      setShowMessage(false);
      setIsSuccess(true);
      setDerekAnimation(extendedStyles.celebrate);
      
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
    } else if (trimmedAnswer.includes(' ')) {
      setMessage("The format contains spaces. Try without spaces.");
      setShowMessage(false);
      setIsShaking(true);
      setIsSuccess(false);
      
      setTimeout(() => {
        setShowMessage(true);
        setIsShaking(false);
      }, 300);
    } else if (trimmedAnswer === 'cat' || trimmedAnswer === 'cats') {
      setMessage("You think I'd pick a cat? Bro.");
      setShowMessage(false);
      setIsShaking(true);
      setIsSuccess(false);
      
      setTimeout(() => {
        setShowMessage(true);
        setIsShaking(false);
      }, 300);
    } else {
      const randomMessage = incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
      setMessage(randomMessage);
      setShowMessage(false);
      setIsShaking(true);
      setIsSuccess(false);
      
      setTimeout(() => {
        setShowMessage(true);
        setIsShaking(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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
              <div className={`${styles.speechBubble} ${isSuccess ? extendedStyles.success : ''}`}>
                <p>{message}</p>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="derek-answer" className={styles.label}>
                What's Derek's favorite animal?
              </label>
              <input
                ref={(el) => {
                  inputRef.current = el;
                  // Scroll into view when the input is rendered
                  if (el) {
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
                className={`${styles.input} ${isShaking ? styles.shake : ''}`}
                placeholder="Enter your guess..."
                aria-describedby="derek-hint"
              />
              <p id="derek-hint" className={styles.hint}>
                Hint: Think mythical and powerful... Press Enter to submit.
              </p>
            </div>
          </form>
          
        </div>
      )}
    </div>
  );
};

export default DerekKnowledgeTest;