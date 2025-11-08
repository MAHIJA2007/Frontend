# 🚀 Quick Setup Guide

## Prerequisites Checklist:
- ✅ Node.js installed (v16+)
- ✅ MongoDB installed and running (or MongoDB Compass)
- ✅ VS Code or your preferred code editor
- ✅ Terminal access

## Step-by-Step Setup:

### 1. Start MongoDB
Open MongoDB Compass and ensure MongoDB is running on `mongodb://localhost:27017`

### 2. Setup Backend

Open terminal in the project root:

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Seed the database with sample data
node seed.js

# Start the backend server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### 3. Setup Frontend

Open a NEW terminal window:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

You should see:
```
✓ Ready in X ms
○ Local: http://localhost:3000
```

### 4. Access the Application

Open your browser and go to: `http://localhost:3000`

### 5. Login with Demo Accounts

**Admin Account:**
- Email: admin@sustainable.com
- Password: admin123

**User Account:**
- Email: user@sustainable.com  
- Password: user123

## Troubleshooting:

### MongoDB Connection Error:
- Ensure MongoDB is running in MongoDB Compass
- Check if the connection string in `backend/.env` is correct
- Try: `mongodb://localhost:27017/sustainable-living`

### Port Already in Use:
**Backend (Port 5000):**
```bash
# Kill process on port 5000
npx kill-port 5000
```

**Frontend (Port 3000):**
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Module Not Found Errors:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Clear Browser Cache:
- Press Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Or use Incognito/Private mode

## Testing the Application:

1. **Register a new user** - Go to Sign Up and create an account
2. **Browse Modules** - Click "Modules" in navigation
3. **View Projects** - Click "Projects" to see DIY projects
4. **Check Resources** - Click "Resources" for guides and tools
5. **View Dashboard** - Click your profile icon to see progress

## Development Commands:

### Backend:
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
node seed.js     # Reseed database
```

### Frontend:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

## Need Help?

If you encounter any issues:
1. Check that both servers are running
2. Verify MongoDB is connected
3. Check browser console for errors
4. Check terminal logs for error messages

Happy coding! 🌱
