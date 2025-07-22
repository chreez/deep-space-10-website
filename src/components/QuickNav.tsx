import { useState, useEffect } from 'react';
import { scrollToInstallFiles } from '../utils/scroll';
import './QuickNav.css';

function QuickNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

    let isInstallFilesInView = false;
    let scrolled = false;

    // Set up Intersection Observer for Install Files section
    const installFilesSection = document.getElementById('install-files');
    let observer: IntersectionObserver | null = null;

    if (installFilesSection) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Consider section in view if more than 30% is visible
            isInstallFilesInView = entry.isIntersecting && entry.intersectionRatio > 0.3;
            updateVisibility();
          });
        },
        {
          threshold: [0, 0.3, 0.5, 1],
          rootMargin: '-50px 0px' // Add margin to hide button slightly before section comes into view
        }
      );

      observer.observe(installFilesSection);
    }

    // Handle scroll for general visibility
    const handleScroll = () => {
      scrolled = window.scrollY > 300;
      updateVisibility();
    };

    const updateVisibility = () => {
      setIsVisible(scrolled && !isInstallFilesInView);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="quick-nav">
      <button
        className="quick-nav-button"
        onClick={scrollToInstallFiles}
        aria-label="Quick jump to install instructions"
        title="Jump to Install Files"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Install Files</span>
      </button>
    </div>
  );
}

export default QuickNav;