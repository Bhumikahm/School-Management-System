# 🚂 Deploy School Management System to Railway (FREE!)

## 🎯 **Why Railway?**
- ✅ **FREE tier**: $5 monthly credit (enough for your app)
- ✅ **PostgreSQL included**: No need for external database
- ✅ **Easy deployment**: Connect GitHub, auto-deploy
- ✅ **Great performance**: Fast and reliable

## 📋 **Prerequisites**
- Railway account (free)
- GitHub repository with your code
- 5 minutes of your time

## 🚀 **Step-by-Step Deployment**

### **1. Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign in with GitHub

### **2. Deploy Your App**
1. Click "Deploy from GitHub repo"
2. Select `Bhumikahm/School-Management-System`
3. Railway will automatically detect it's a Node.js app
4. Click "Deploy"

### **3. Add PostgreSQL Database**
1. In your project dashboard, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will create a free PostgreSQL database
4. Note down the connection details

### **4. Configure Environment Variables**
In your Railway app settings, add these variables:

```env
# Database Configuration (Railway will provide these)
DB_HOST=${DATABASE_URL}
DB_USER=${DATABASE_USER}
DB_PASSWORD=${DATABASE_PASSWORD}
DB_NAME=${DATABASE_NAME}

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email Configuration
EMAIL_USER=bhumikahm2003@gmail.com
EMAIL_PASS=kqnvrzvqdbsvzjqu

# Next.js Configuration
NEXTAUTH_URL=https://your-app-name.railway.app
NEXTAUTH_SECRET=your-nextauth-secret-key

# Production Settings
NODE_ENV=production
```

### **5. Update Database Connection**
Railway uses PostgreSQL, so we need to update the database connection. The system will automatically use the DATABASE_URL.

## 🎉 **What You Get**
- **Live URL**: `https://your-app-name.railway.app`
- **Free PostgreSQL database**
- **Automatic deployments** on every git push
- **SSL certificate** included
- **Global CDN** for fast loading

## 🔧 **Database Setup**
Railway will automatically create the database tables when you first sign up. No manual SQL needed!

## 📱 **Testing After Deployment**
1. Visit your app URL
2. Sign up for a new account
3. Check email verification
4. Test login and dashboard
5. Test school management features

## 💰 **Cost Breakdown**
- **App hosting**: FREE (included in $5 credit)
- **Database**: FREE (included in $5 credit)
- **Bandwidth**: FREE (included in $5 credit)
- **Total cost**: $0/month

## 🚨 **If You Hit Limits**
- Railway gives you $5 free credit monthly
- Your app will use about $2-3/month
- You can upgrade to paid plan if needed ($5/month)

## 🎊 **Success!**
Your School Management System will be live on the internet with:
- ✅ Professional domain
- ✅ SSL security
- ✅ Fast performance
- ✅ Automatic updates
- ✅ Database included

---

**Ready to deploy? Follow the steps above and your app will be live in minutes!**
