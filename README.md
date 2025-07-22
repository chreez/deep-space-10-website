# DS-10 Valheim Server Website

A modern, responsive splash page for the DS-10 modded Valheim server, featuring a space-themed design with constellation animations and smooth user interactions.

## 🚀 Features

- **Modern Gaming Aesthetic**: Clean, contemporary design with animated constellation background
- **Dual Navigation**: Hero section with "Server Details" and "Quick Start" CTAs
- **Step-by-Step Setup Guide**: Clear instructions for mod installation with visual indicators
- **Server Connection Info**: One-click IP copying with visual feedback
- **Deep Linking Support**: Direct links to specific sections via URL parameters
- **Smart Navigation**: QuickNav appears on scroll, server hints during downloads
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Accessibility First**: WCAG 2.1 AA compliant with full keyboard navigation

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules with custom animations
- **Testing**: Playwright for E2E tests
- **Deployment**: Netlify-ready configuration

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/chreez/deep-space-10-website.git
cd deep-space-10-website

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui
```

## 🏗️ Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚢 Deployment

The site is configured for automatic deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Deploy settings are pre-configured in `netlify.toml`
3. Push to `main` branch triggers automatic deployment

## 📁 Project Structure

```
/
├── src/
│   ├── components/       # React components
│   │   ├── Hero.tsx     # Hero section with dual CTAs
│   │   ├── SetupInstructions.tsx
│   │   ├── ServerDetails.tsx
│   │   ├── QuickNav.tsx # Floating navigation
│   │   └── Background.tsx # Constellation animation
│   ├── hooks/           # Custom React hooks
│   │   └── usePermalink.ts # URL-based navigation
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── tests/               # Playwright E2E tests
├── docs/                # Design specifications
└── netlify.toml         # Deployment configuration
```

## 🎨 Design System

### Colors
- Deep Space Black: `#0B0C10`
- Meteor Gray: `#1F1F23`
- Moonstone Steel: `#C7CCD6`
- Runestone Blue: `#4B91E2`
- Solar Flare Amber: `#D88C3D`

### Typography
- Primary: Orbitron (headings)
- Secondary: Inter (body text)
- Monospace: JetBrains Mono (server IP)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📍 Deep Linking

The site supports URL parameters for direct section navigation:

- `?section=install` or `?section=1` - Installation instructions
- `?section=install-files` or `?section=2` - File installation step
- `?section=server` or `?section=3` - Server connection details
- `?section=password` - Server password section

Example: `https://deep-space-10.netlify.app/?section=server`

## 🔗 Links

- **Live Site**: [https://deep-space-10.netlify.app/](https://deep-space-10.netlify.app/)
- **Modpack**: [DS-10 Valheim Releases](https://github.com/chreez/deep-space-10-valheim/releases) 
- **Design Spec**: [View Spec](./docs/ds10-site-spec.md)
