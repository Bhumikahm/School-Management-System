#!/bin/bash

# 🚀 Render Deployment Script for School Management System
echo "🚀 Starting deployment to Render..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/your-repo.git"
    exit 1
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Deploy to Render - $(date)"
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ Push failed. Please check your git configuration."
    exit 1
fi

echo "✅ Code pushed to GitHub!"

# Deployment instructions
echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to [Render Dashboard](https://dashboard.render.com)"
echo "2. Click 'New +' → 'Blueprint'"
echo "3. Connect your GitHub repository"
echo "4. Render will detect render.yaml automatically"
echo "5. Click 'Apply' to deploy"
echo ""
echo "🔧 Don't forget to:"
echo "- Set up your database (PostgreSQL recommended)"
echo "- Configure environment variables in Render"
echo "- Test your deployed application"
echo ""
echo "📚 See RENDER_DEPLOYMENT.md for detailed instructions"
