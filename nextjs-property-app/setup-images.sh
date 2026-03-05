#!/bin/bash

# Script to copy images from original project to Next.js public folder

echo "Setting up images for Next.js project..."

# Create public/images directory if it doesn't exist
mkdir -p public/images

# Copy images from original project
# Adjust the path based on where you run this script from

# If running from nextjs-property-app folder:
cp -r ../assets/images/* public/images/
cp ../assets/css/lgg.png public/images/
cp ../assets/css/bgg.png public/images/

echo "✅ Images copied successfully!"
echo ""
echo "Images copied to public/images/:"
ls -la public/images/

echo ""
echo "Next steps:"
echo "1. Run 'npm install' to install dependencies"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
