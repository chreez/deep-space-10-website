import { useEffect } from 'react';

// Mapping of section names/numbers to element IDs
const SECTION_MAP: Record<string, string> = {
  // Name-based
  'install': 'setup-instructions',
  'setup': 'setup-instructions',
  'install-files': 'install-files',
  'server': 'server-details',
  'server-details': 'server-details',
  'password': 'server-details',
  
  // Number-based
  '1': 'setup-instructions',
  '2': 'install-files',
  '3': 'server-details'
};

export function usePermalink() {
  useEffect(() => {
    // Function to handle navigation
    const navigateToSection = () => {
      // Get URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const section = urlParams.get('section');
      
      if (section) {
        // Normalize the section parameter (lowercase, trim)
        const normalizedSection = section.toLowerCase().trim();
        const targetId = SECTION_MAP[normalizedSection];
        
        if (targetId) {
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              // Calculate offset for better visibility
              const offset = 100;
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - offset;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
              
              // Add a temporary highlight effect
              element.classList.add('section-highlight');
              setTimeout(() => {
                element.classList.remove('section-highlight');
              }, 2000);
            }
          }, 300);
        }
      }
    };

    // Navigate on initial load
    navigateToSection();

    // Listen for URL changes (for single-page navigation)
    window.addEventListener('popstate', navigateToSection);

    return () => {
      window.removeEventListener('popstate', navigateToSection);
    };
  }, []);
}

// Helper function to create permalink URLs
export function createPermalink(section: string): string {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?section=${encodeURIComponent(section)}`;
}