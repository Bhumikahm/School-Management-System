# 🏫 School Management System

A comprehensive, modern web application for managing educational institutions built with Next.js, TypeScript, and MySQL.

## ✨ Features

### 🔐 Authentication & Security
- **User Registration** with comprehensive validation
- **User Login** with JWT token authentication
- **OTP Verification System** via email for account verification
- **Password Security** using bcrypt hashing (12 rounds)
- **JWT Token Management** with 7-day expiration
- **Protected Routes** requiring authentication

### 🏫 School Management
- **Add New Schools** with complete information
- **School Image Upload** (JPEG, PNG, WebP) with 5MB limit
- **View All Schools** in responsive grid layout
- **Search & Filter** schools by name, city, or state
- **School Details** display with all information

### 📊 Dashboard & Analytics
- **User Welcome** with personalized greeting
- **Quick Actions** for adding schools and viewing all schools
- **Statistics Overview** with user and school counts
- **Modern Glassmorphism Design** with backdrop blur effects

### 🗄️ Database Features
- **MySQL Database** with connection pooling
- **Automatic Table Creation** for users, OTPs, and schools
- **CRUD Operations** for schools management
- **User Authentication** queries with proper indexing

### 📧 Email Integration
- **Nodemailer Integration** for email services
- **OTP Delivery** via email for account verification
- **Gmail SMTP** configuration support
- **HTML Email Templates** with professional styling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
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

4. **Set up MySQL Database**
   ```sql
   CREATE DATABASE school_management;
   USE school_management;
   ```
   
   The application will automatically create the required tables on first run.

5. **Configure Email (Gmail)**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password
   - Use the App Password in EMAIL_PASS

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The system automatically creates these tables:

### Users Table
```sql
users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  contact VARCHAR(15) NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### OTP Verification Table
```sql
otps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

### Schools Table
```sql
schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(15) NOT NULL,
  image TEXT NOT NULL,
  email_id VARCHAR(100) NOT NULL
)
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 13** with App Router
- **React 18** with hooks and functional components
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible UI components
- **React Hook Form** for form management
- **Zod** for schema validation

### Backend
- **Next.js API Routes** with RESTful endpoints
- **MySQL** with mysql2 driver
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** for email services
- **Multer** for file uploads

### Development Tools
- **ESLint** for code quality
- **TypeScript** configuration
- **Hot Reload** during development

## 📱 Features Overview

### Home Page
- Beautiful landing page with animated background
- Feature showcase with interactive cards
- Call-to-action buttons for signup/signin

### Authentication Flow
1. User signs up with email, username, and password
2. OTP is sent to email address
3. User verifies OTP to activate account
4. User can sign in with credentials
5. JWT token is issued for authenticated sessions

### Dashboard
- Welcome message with user's full name
- Quick action cards for adding schools and viewing all schools
- Statistics cards showing system metrics
- Navigation to different sections

### School Management
- **Add School**: Form with validation for school details and image upload
- **View Schools**: Responsive grid layout with school cards
- **School Details**: Complete information display with images

## 🔧 Configuration

### Database Connection
The system uses connection pooling for optimal performance:
```typescript
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
});
```

### File Upload
- Supported formats: JPEG, JPG, PNG
- Maximum size: 5MB
- Storage location: `public/schoolImages/`
- Automatic directory creation

### Security Features
- Password hashing with bcrypt (12 rounds)
- JWT tokens with 7-day expiration
- Input validation with Zod schemas
- Protected API routes
- File upload security validation

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Ensure all environment variables are set in your production environment:
- Database credentials
- JWT secret
- Email configuration
- Next.js configuration

### Database Setup
- Create production MySQL database
- Set up proper user permissions
- Configure connection pooling for production load

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔮 Future Enhancements

- [ ] User role management (Admin, Teacher, Student)
- [ ] Advanced search and filtering
- [ ] School performance analytics
- [ ] Student enrollment system
- [ ] Attendance tracking
- [ ] Grade management
- [ ] Parent portal
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Advanced security features

---

**Built with ❤️ using Next.js and modern web technologies**
