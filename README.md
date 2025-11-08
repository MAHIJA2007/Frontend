# 🌱 Sustainable Living Education Platform (FEDF-PS50)

A comprehensive web application designed to educate students about sustainable living practices through interactive lessons, DIY projects, and practical resources.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## 🎯 Overview

This platform addresses the lack of engaging, interactive platforms for learning sustainable living practices. It provides:
- Interactive learning modules on sustainability topics
- DIY project tutorials with step-by-step instructions
- Resource library for eco-friendly living
- Progress tracking and gamification
- Admin panel for content management

## ✨ Features

### For Students/Users:
- 📚 **Interactive Learning Modules** - Courses on renewable energy, waste reduction, water conservation, etc.
- 🛠️ **DIY Project Library** - Hands-on projects with materials list and instructions
- 📖 **Resource Hub** - Guides, calculators, and educational materials
- 📊 **Progress Dashboard** - Track completed modules, projects, and carbon footprint reduction
- 🏆 **Gamification** - Earn points, badges, and achievements
- 👤 **User Authentication** - Secure login and personalized experience

### For Administrators:
- ✏️ **Content Management** - Create, update, and delete modules, projects, and resources
- 📈 **User Analytics** - Monitor user engagement and progress
- 🔐 **Role-Based Access** - Separate admin and user permissions

## 🚀 Tech Stack

### Backend:
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

### Frontend:
- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **State Management:** React Context API

## 📁 Project Structure

```
sustainable-living-platform/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── moduleController.js   # Module CRUD operations
│   │   ├── projectController.js  # Project CRUD operations
│   │   └── resourceController.js # Resource CRUD operations
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Module.js             # Module model
│   │   ├── Project.js            # Project model
│   │   └── Resource.js           # Resource model
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── moduleRoutes.js       # Module routes
│   │   ├── projectRoutes.js      # Project routes
│   │   └── resourceRoutes.js     # Resource routes
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server setup
│   ├── seed.js                   # Database seeder
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js           # Homepage
│   │   │   ├── layout.js         # Root layout
│   │   │   ├── globals.css       # Global styles
│   │   │   ├── login/            # Login page
│   │   │   ├── register/         # Register page
│   │   │   ├── dashboard/        # User dashboard
│   │   │   ├── modules/          # Modules listing
│   │   │   ├── projects/         # Projects listing
│   │   │   └── resources/        # Resources listing
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation bar
│   │   │   └── Footer.js         # Footer
│   │   ├── contexts/
│   │   │   └── AuthContext.js    # Authentication context
│   │   └── lib/
│   │       └── api.js            # API configuration
│   ├── .env.local                # Environment variables
│   ├── next.config.js            # Next.js configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   └── package.json
│
└── README.md
```

## 🛠️ Installation

### Prerequisites:
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd sustainable-living-platform
```

### Step 2: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sustainable-living
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

4. Start MongoDB:
- If using MongoDB Compass, make sure MongoDB service is running
- Or start MongoDB manually: `mongod`

5. Seed the database:
```bash
node seed.js
```

6. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🎮 Usage

### Accessing the Application:
1. Open your browser and go to `http://localhost:3000`
2. You can either register a new account or use demo credentials:

**Demo Credentials:**
- **Admin:** admin@sustainable.com / admin123
- **User:** user@sustainable.com / user123

### User Flow:
1. **Register/Login** - Create an account or login
2. **Explore Modules** - Browse and start learning modules
3. **Complete Projects** - Follow DIY project tutorials
4. **Access Resources** - View educational resources
5. **Track Progress** - Monitor your dashboard for stats

### Admin Flow:
1. **Login as Admin** - Use admin credentials
2. **Manage Content** - Create/edit/delete modules, projects, resources
3. **View Analytics** - Monitor user engagement (dashboard feature)

## 📡 API Documentation

### Authentication Endpoints:

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Module Endpoints:

#### Get All Modules
```http
GET /api/modules
```

#### Get Single Module
```http
GET /api/modules/:id
```

#### Create Module (Admin Only)
```http
POST /api/modules
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Module Title",
  "description": "Module description",
  "category": "renewable-energy",
  "difficulty": "beginner",
  "duration": 30,
  "content": "Module content...",
  "points": 10,
  "carbonImpact": 5
}
```

#### Complete Module
```http
POST /api/modules/:id/complete
Authorization: Bearer <token>
```

### Project Endpoints:

#### Get All Projects
```http
GET /api/projects
```

#### Get Single Project
```http
GET /api/projects/:id
```

#### Complete Project
```http
POST /api/projects/:id/complete
Authorization: Bearer <token>
```

#### Like Project
```http
POST /api/projects/:id/like
Authorization: Bearer <token>
```

### Resource Endpoints:

#### Get All Resources
```http
GET /api/resources
```

#### Get Single Resource
```http
GET /api/resources/:id
```

## 🤝 Contributing

This project was developed for FEDF-PS50 - Front End Development and Frameworks course. Contributions are welcome!

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

Developed as part of the Front End Development and Frameworks (FEDF-PS50) course project.

## 🙏 Acknowledgments

- Design thinking methodology
- Sustainable development goals (SDGs)
- Environmental education best practices

---

**Built with 💚 for a sustainable future**
