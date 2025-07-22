# Project Context for Claude

## Project: deep.space.10.website
*Initialized: 2025-07-21*

## Overview
Deep Space 10 website - A React/TypeScript/Vite application with BepInEx mod tools and Derek voice information.

## Key Files
- `netlify.toml` - Netlify deployment configuration (NODE_VERSION must be 20+)
- `vite.config.ts` - Vite build configuration
- `src/` - React application source code
- `public/` - Static assets (images, etc.)

## Build Requirements
- **Node.js**: Version 20 or higher required (Vite 7.0.5 requirement)
- **Build command**: `npm ci && npm run build`
- **Output directory**: `dist`

## Important Notes
- **Always ensure NODE_VERSION in netlify.toml is set to "20" or higher**
- Vite 7.0.5 requires Node.js ^20.19.0 || >=22.12.0
- All static assets must be in the `public/` directory for Netlify builds
- Build locally with `npm run build` before pushing to verify no errors

## Current Tasks
{Empty - to be filled by user}
