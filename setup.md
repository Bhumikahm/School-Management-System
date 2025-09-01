# 🚀 Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- MySQL 8.0+ running
- Git installed

## Step 1: Environment Setup

Create a `.env.local` file in the root directory with:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

## Step 2: Database Setup

1. **Start MySQL service**
2. **Create database:**
   ```sql
   CREATE DATABASE school_management;
   USE school_management;
   ```
3. **Tables will be created automatically on first run**

## Step 3: Email Configuration (Gmail)

1. **Enable 2FA on your Gmail account**
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Use the generated password in EMAIL_PASS**

## Step 4: Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Step 5: Test the System

1. **Open http://localhost:3000**
2. **Sign up with a new account**
3. **Check email for OTP**
4. **Verify OTP**
5. **Sign in**
6. **Add your first school**

## Troubleshooting

### Database Connection Issues
- Check MySQL service is running
- Verify credentials in `.env.local`
- Ensure database exists

### Email Issues
- Check Gmail 2FA is enabled
- Verify App Password is correct
- Check spam folder for OTP emails

### Port Issues
- Change port in `package.json` if 3000 is busy
- Use `npm run dev -- -p 3001`

## File Structure
```
project/
├── app/                    # Next.js app router
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard page
│   ├── addSchool/        # Add school page
│   ├── showSchools/      # View schools page
│   └── auth/             # Auth pages
├── components/            # React components
├── lib/                   # Utility functions
├── public/                # Static assets
└── .env.local            # Environment variables
```

## Features Available
✅ User registration with OTP verification  
✅ User login with JWT authentication  
✅ Dashboard with statistics  
✅ Add new schools with image upload  
✅ View all schools in grid layout  
✅ Responsive design for all devices  
✅ Secure file upload handling  
✅ Email integration for OTP  
✅ MySQL database with auto-table creation  

## Next Steps
1. Customize the design
2. Add more school fields
3. Implement search functionality
4. Add user roles and permissions
5. Deploy to production
