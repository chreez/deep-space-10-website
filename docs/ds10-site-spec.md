# DS-10 Splash Site — Complete Design Spec (v0.3)

## 🧭 Purpose
This single-page site introduces players to the DS-10 Valheim modded server and provides clear, minimal instructions for setup and connection.

## 🎨 Visual Design System

### Colors
| Name              | Hex       | Usage                      |
| ----------------- | --------- | -------------------------- |
| Deep Space Black  | `#0B0C10` | Page background            |
| Meteor Gray       | `#1F1F23` | Cards, panels              |
| Moonstone Steel   | `#C7CCD6` | Text, subtle borders       |
| Runestone Blue    | `#4B91E2` | Links, hover, accents      |
| Solar Flare Amber | `#D88C3D` | Button hover, glow effects |
| Blood Mead Red    | `#9E2B25` | Rare alerts or highlights  |

### Typography
* **Primary Font**: "Orbitron", sans-serif (Google Fonts)
  * Hero Title: 700 weight, 4rem (64px)
  * Section Headers: 600 weight, 2rem (32px)
  * Body Text: 400 weight, 1rem (16px)
* **Secondary Font**: "Inter", sans-serif
  * UI Elements: 500 weight, 0.875rem (14px)
  * Button Text: 600 weight, 1rem (16px)
* **Monospace**: "JetBrains Mono", monospace
  * IP Address: 400 weight, 1.125rem (18px)

### Typography Rules
- Body text max width: `640px`
- Tracking: `0.5px` for body text, `1px` for headings
- Line height: 1.6 for body text, 1.2 for headings

### Layout
- Single-column mobile-first layout
- Max width container: `640px`
- Padding: `2rem` horizontal, `4rem` top
- Vertical rhythm between sections: `2rem`
- Step cards:
  - Background: Meteor Gray (`#1F1F23`)
  - Border-radius: `12px`
  - Padding: `1rem 1.5rem`
  - Box shadow: `0 2px 8px rgba(0, 0, 0, 0.3)`

### Buttons
- Base: Runestone Blue (`#4B91E2`) background, white text
- Hover: Solar Flare Amber (`#D88C3D`) background
- Radius: `8px`
- Padding: `0.75rem 2rem`
- Transition: `all 0.2s ease-in-out`
- Font weight: 600

## 🧱 Page Structure

### 🪐 Hero Section
* Server Name: **DS-10**
* Tagline: *Connect your longship to the starforge.*
* Two CTA buttons with modern styling:
  * **"Server Details"**: Smooth scroll to `#server-details` section
  * **"Quick Start"**: Smooth scroll to `#setup-instructions` section
* Animated background with constellation overlay
* Full viewport height (`100vh`)

### 🧑‍🚀 Setup Instructions
⚠️ The first time you load Valheim it will be slow. Don't worry — you'll get through this. 🪓

* **Step 1**: Download the modpack:
   * `https://github.com/chreez/deep-space-10-valheim/releases`
   * Click on **deepspace10.rar** to download
   * Display as a clear hyperlink button
* **Step 2**: Place the files into your Valheim install directory
   * Hover or click hint: "Where do I find it?"
   * Reveal: "Right click Valheim in your Steam Library → Manage → Browse local files"
* **Step 3**: Start the game like normal
   * A second window labeled 'BepInEx' should launch, confirming successful mod installation

Each step appears as a **Meteor Gray card** with a **Runestone Blue step number**.

### 🌌 Server Connection Block
Title: **Server Details**
* **IP Address Input Field**
   * Looks like a read-only text box
   * On click: Copies IP to clipboard
   * Tooltip: "Copied!" on success
   * Background: Meteor Gray
   * Border: 1px solid Moonstone Steel
* **Label**: `IP Address:`
   * Example content: `95.173.217.154:2456`
* **Password Hint**
   * Label: `Password Hint:`
   * Content: `Derek's favorite animal`

## 🎨 Animation & Effects

### Vanta.NET Background Configuration
```javascript
{
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x4B91E2,        // Runestone Blue
  backgroundColor: 0x0B0C10,  // Deep Space Black
  points: 10.00,
  maxDistance: 22.00,
  spacing: 16.00
}
```

### Button Glow Effect
```css
.join-button {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(75, 145, 226, 0.5); }
  50% { box-shadow: 0 0 30px rgba(75, 145, 226, 0.8); }
}
```

### Rune Pulse Animation (IP Copy)
```css
@keyframes rune-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(75, 145, 226, 0.7);
    transform: scale(1);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(75, 145, 226, 0);
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(75, 145, 226, 0);
    transform: scale(1);
  }
}
```

## 🛠️ Technical Specifications

### Tech Stack
* **Framework**: React 18+ with TypeScript
* **Build Tool**: Vite
* **Styling**: CSS Modules with PostCSS
* **Animation Library**: Vanta.js (NET effect)
* **Deployment**: Netlify

### Browser Support
* Chrome/Edge 90+
* Firefox 88+
* Safari 14+
* Mobile Safari iOS 14+
* Chrome Android 90+

### Performance Budgets
* First Contentful Paint: < 1.5s
* Time to Interactive: < 3.5s
* Total bundle size: < 250KB gzipped
* Vanta.js lazy loaded after initial render

### External Dependencies
- Google Fonts (Orbitron, Inter)
- JetBrains Mono (optional, for monospace)
- Vanta.js CDN
- three.js via CDN

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance
* Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
* Text over Vanta background must have solid backdrop or blur effect
* All interactive elements must have visible focus indicators

### ARIA Labels
```html
<!-- Hero Buttons -->
<button aria-label="Scroll to server connection details">Server Details</button>
<button aria-label="Scroll to setup instructions">Quick Start</button>

<!-- IP Copy Field -->
<button 
  role="button"
  aria-label="Copy server IP address to clipboard"
  aria-live="polite"
  aria-atomic="true"
>
  <span id="ip-address">95.173.217.154:2456</span>
  <span id="copy-status" aria-hidden="true"></span>
</button>

<!-- Download Button -->
<a 
  href="https://github.com/chreez/deep-space-10-valheim/releases"
  aria-label="Download deepspace10.rar modpack from GitHub (opens in new tab)"
  target="_blank"
  rel="noopener noreferrer"
>
  Download Modpack
</a>
```

### Keyboard Navigation
* Tab order: Hero CTA → Download button → Installation hints → IP copy field
* Enter/Space activates buttons
* Escape closes any open tooltips
* Focus trap not required (single page, no modals)

### Focus States
* All interactive elements: 2px solid outline, color: `#4B91E2`, offset: 2px
* Buttons: Additional box-shadow on focus
* Links: Underline appears on focus (not just hover)

## 🔧 Error Handling

### Clipboard API Fallback
```javascript
async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    showTooltip("Copied!");
    triggerRunePulse();
  } catch (err) {
    // Fallback for older browsers or permission denied
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      showTooltip("Copied!");
      triggerRunePulse();
    } catch (fallbackErr) {
      showTooltip("Select and copy manually");
    }
    
    document.body.removeChild(textArea);
  }
}
```

### GitHub Releases Fallback
* If GitHub is unreachable, display alternative Discord link for modpack
* Cache latest release URL in environment variable for redundancy

## 🚀 Deployment & CI/CD

### Netlify Configuration
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
```

### GitHub Integration
* **Repository**: GitHub repo with main branch protection
* **Build Triggers**: 
  * Production: Push to `main` branch
  * Preview: Pull requests automatically deployed
* **Environment Variables**:
  * `VITE_SERVER_IP`: Server IP address
  * `VITE_GITHUB_RELEASE_URL`: Latest modpack URL
  * `VITE_DISCORD_BACKUP_URL`: Fallback modpack location

### GitHub Actions Workflow
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - uses: netlify/actions/deploy@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          netlify-auth-token: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          netlify-site-id: ${{ secrets.NETLIFY_SITE_ID }}
```

## ✅ Acceptance Criteria
* Download link is a button styled like other CTAs:
   * Label: `Download Modpack`
   * Opens GitHub Releases in a new tab
   * Background: Runestone Blue (`#4B91E2`), hover: Solar Flare Amber (`#D88C3D`)
   * Icon: Optional SVG download icon inline left of label
   * Padding: `0.75rem 2rem`, Radius: `8px`, white text
* Hero section is full-screen with animated background featuring:
   * Modern gradient mesh background
   * Subtle animated grid overlay
   * **Constellation visualization overlay:**
     * Animated star points connected by subtle lines
     * Stars use Runestone Blue (`#4B91E2`) with glow effect
     * Lines fade in/out with 0.1-0.3 opacity
     * Slow rotation/drift animation (30-60s full cycle)
     * Must not interfere with text readability
     * Responsive to viewport size
* Hero section has two CTA buttons with modern design:
   * **"Server Details"** button: Smooth scroll to `#server-details`
   * **"Quick Start"** button: Smooth scroll to `#setup-instructions`
   * Both with gradient backgrounds and hover states
   * Shimmer effect on hover
   * Buttons displayed side-by-side with appropriate spacing
* Setup instructions use card-based grid layout:
   * Responsive grid (3 columns desktop, 1 column mobile)
   * Cards with hover lift effect
   * Step indicators with gradient backgrounds
* GitHub modpack link opens in new tab
* Download instructions clearly specify to click **deepspace10.rar**
* Hovering/clicking "Where do I find it?" reveals Steam instructions
* **IP address field copies to clipboard with confirmation:**
   * Displays "Copied to clipboard!" text feedback
   * Text appears below or near the IP field
   * Confirmation remains visible for 2-3 seconds
* When the copy occurs, a visual pulse animation plays:
   * Scale transform with glow effect
   * Color transition to Solar Flare Amber during animation
   * Duration: 500ms with cubic-bezier easing
   * Animation must be smooth and modern
* Password hint appears in styled container below IP input
* Step 3 includes BepInEx confirmation text:
   * States "A second window labeled 'BepInEx' should launch, confirming successful mod installation"
* Layout is responsive and readable on mobile and desktop
* All interactive elements have proper ARIA labels and keyboard support
* Clipboard fallback mechanism works in older browsers
* All colors, spacing, and typography match defined design system
* Modern gaming aesthetic throughout with smooth micro-interactions

## 🧪 Testing Criteria

### Automated Visual & Behavior Tests (Playwright)
Create and run a Playwright test suite that:
1. Loads the splash page at `/`
2. Confirms Vanta background is attached to `#vanta-bg` element
3. Checks that `.join-button` has background color `#4B91E2` initially, and `#D88C3D` on hover
4. Validates text content and card count in setup instructions section
5. Ensures font family `Orbitron` is applied to hero title
6. Screenshots the layout at viewport widths: `375px`, `768px`, `1280px`
7. Compares layout and colors to approved baseline snapshots
8. Tests smooth scroll behavior from hero buttons to respective sections
9. Verifies clipboard functionality and tooltip appearance
10. Confirms keyboard navigation works correctly
11. Validates ARIA labels announce correctly
12. Tests clipboard fallback when permissions are denied
13. Verifies all external links open in new tabs
14. Confirms responsive behavior at all breakpoints

Test command:
```sh
npx playwright test --project=chromium
```

### Manual Testing Checklist
- [ ] Vanta background loads and animates smoothly
- [ ] All text is readable over animated background
- [ ] Hover states work correctly on all interactive elements
- [ ] Mobile touch interactions work properly
- [ ] Page loads within performance budget
- [ ] No console errors in production build

## 📁 File Structure
```
/
├── index.html          # Main entry point
├── src/
│   ├── App.tsx        # Root React component
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── SetupInstructions.tsx
│   │   └── ServerDetails.tsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── modules/
│   └── utils/
│       └── clipboard.ts
├── public/
│   └── fonts/         # Local font files (fallback)
├── netlify.toml
└── package.json
```

## 📝 Version History
### v0.3 (Current)
* Merged style guide and design spec into single document
* Updated typography to use Orbitron, Inter, and JetBrains Mono
* Added complete visual design system inline
* Included animation specifications and effects
* Consolidated all requirements into unified spec

### v0.2
* Added technical specifications and browser support
* Included accessibility requirements and ARIA labels
* Added typography specifications
* Defined error handling and fallback behaviors
* Added Netlify/GitHub CI/CD configuration

### v0.1
* Initial design specification
* Basic structure and visual requirements