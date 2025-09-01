#!/bin/bash

echo "🚂 Deploying School Management System to Railway..."
echo ""

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Git working directory is not clean. Please commit your changes first."
    echo "   Run: git add . && git commit -m 'Ready for Railway deployment'"
    exit 1
fi

echo "✅ Git working directory is clean"
echo ""

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Ready for Railway deployment with PostgreSQL support"
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ Failed to push to GitHub. Please check your git configuration."
    exit 1
fi

echo "✅ Code pushed to GitHub successfully!"
echo ""

echo "🚀 Next Steps for Railway Deployment:"
echo ""
echo "1. Go to [Railway Dashboard](https://railway.app)"
echo "2. Click 'Start a New Project'"
echo "3. Select 'Deploy from GitHub repo'"
echo "4. Choose: Bhumikahm/School-Management-System"
echo "5. Railway will automatically detect it's a Node.js app"
echo "6. Click 'Deploy'"
echo ""
echo "7. Add PostgreSQL Database:"
echo "   - Click 'New' → 'Database' → 'PostgreSQL'"
echo "   - Railway will create a free database"
echo ""
echo "8. Configure Environment Variables:"
echo "   - Copy from railway-env.txt"
echo "   - Update NEXTAUTH_URL with your Railway app URL"
echo ""
echo "9. Test your deployment!"
echo ""
echo "📚 See RAILWAY_DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Your School Management System will be live on Railway!"
