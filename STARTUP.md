# 🚀 IMMEDIATE STARTUP GUIDE

## ⚡ Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Create `.env.local` in the root directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### 3. Test Database Connection
```bash
npm run db:test
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open Browser
Navigate to: http://localhost:3000

---

## 🔧 Detailed Setup

### Database Setup
1. **Start MySQL service**
2. **Create database** (optional - will be created automatically):
   ```sql
   CREATE DATABASE school_management;
   ```

### Email Setup (Gmail)
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password: Google Account → Security → App Passwords
3. Use the generated password in `EMAIL_PASS`

---

## 🎯 What You'll Get

✅ **Complete Authentication System**
- User registration with email verification
- Secure login with JWT tokens
- OTP verification via email

✅ **School Management**
- Add schools with image uploads
- View all schools in beautiful grid
- Responsive design for all devices

✅ **Modern Dashboard**
- Real-time statistics
- Interactive cards and animations
- Glassmorphism design

✅ **Security Features**
- Password hashing with bcrypt
- Protected API routes
- Input validation with Zod

---

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npm run db:test

# Manual MySQL connection
mysql -u root -p
```

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Email Not Working
- Check Gmail 2FA is enabled
- Verify App Password is correct
- Check spam folder for OTP emails

---

## 📱 Test the System

1. **Sign Up** with a new account
2. **Check Email** for OTP
3. **Verify OTP** to activate account
4. **Sign In** with credentials
5. **Add Your First School**
6. **View All Schools**

---

## 🎨 Features Overview

- **Landing Page**: Beautiful animated homepage
- **Authentication**: Complete user management
- **Dashboard**: Interactive statistics and actions
- **School Management**: CRUD operations with images
- **Responsive Design**: Works on all devices
- **Modern UI**: Glassmorphism with animations

---

## 🔮 Next Steps

After getting it running:
1. Customize the design
2. Add more school fields
3. Implement search functionality
4. Add user roles
5. Deploy to production

---

## 📞 Need Help?

- Check the `README.md` for detailed documentation
- Review `setup.md` for step-by-step instructions
- Run `npm run db:test` to diagnose database issues
- Check console logs for error details

---

**🎉 You're all set! The School Management System is ready to use.**
