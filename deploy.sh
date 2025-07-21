#!/bin/bash

# Deploy to Netlify using CLI
echo "Building project..."
npm run build

echo "Deploying to Netlify..."
netlify deploy --prod --dir=dist

echo "Deployment complete!"