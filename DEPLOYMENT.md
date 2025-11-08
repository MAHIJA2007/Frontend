# 🚀 Deployment Guide for Render

This guide will help you deploy both the backend and frontend to Render.

## Prerequisites

1. GitHub account with the repository pushed
2. Render account (sign up at https://render.com)
3. MongoDB Atlas account (for production database) OR use Render's MongoDB service

## Step 1: Deploy Backend to Render

### Option A: Using Render Dashboard

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**: `MAHIJA2007/Frontend`
4. **Configure the service**:
   - **Name**: `sustainable-platform-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<generate-a-random-secret-key>
   ```

6. **Click "Create Web Service"**

### Option B: Using render.yaml (Recommended)

1. Go to Render Dashboard → **New +** → **"Blueprint"**
2. Connect your GitHub repository
3. Render will automatically detect `render.yaml` and deploy both services

## Step 2: Deploy Frontend to Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**: `MAHIJA2007/Frontend`
4. **Configure the service**:
   - **Name**: `sustainable-platform-frontend`
   - **Root Directory**: `frontend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://sustainable-platform-backend.onrender.com/api
   ```
   (Replace with your actual backend URL)

6. **Click "Create Web Service"**

## Step 3: Set Up MongoDB

### Option A: MongoDB Atlas (Recommended for Production)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist Render's IP (or use 0.0.0.0/0 for development)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/sustainable-living`
6. Add this to backend environment variables as `MONGODB_URI`

### Option B: Render MongoDB (Free Tier)

1. In Render Dashboard → **New +** → **"MongoDB"**
2. Name it: `sustainable-platform-db`
3. Copy the Internal Database URL
4. Add to backend environment variables as `MONGODB_URI`

## Step 4: Update CORS Settings

After deploying backend, update `backend/server.js` CORS settings:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://sustainable-platform-frontend.onrender.com'],
  credentials: true
}));
```

Or use environment variable:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

## Step 5: Seed the Database

After deployment, you can seed the database by:

1. SSH into your backend service (if available)
2. Or create a one-time script that runs on first deployment
3. Or manually run the seed script locally pointing to production database

## Environment Variables Summary

### Backend (.env)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sustainable-living
JWT_SECRET=your-super-secret-jwt-key-change-this
FRONTEND_URL=https://sustainable-platform-frontend.onrender.com
```

### Frontend (.env.local)
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://sustainable-platform-backend.onrender.com/api
```

## Troubleshooting

### Backend Issues:
- **Port Error**: Render uses port 10000 by default, make sure your code uses `process.env.PORT`
- **MongoDB Connection**: Check connection string and IP whitelist
- **Build Fails**: Check build logs in Render dashboard

### Frontend Issues:
- **API Connection**: Verify `NEXT_PUBLIC_API_URL` is correct
- **Build Fails**: Check Node version compatibility
- **CORS Errors**: Update backend CORS settings

## Custom Domains

1. In Render Dashboard → Your Service → Settings
2. Add Custom Domain
3. Update DNS records as instructed
4. Update environment variables with new domain

## Monitoring

- Check logs in Render Dashboard
- Monitor service health
- Set up alerts for downtime

## Cost

- **Free Tier**: Both services can run on free tier
- **Limitations**: Services spin down after 15 minutes of inactivity
- **Upgrade**: For always-on services, upgrade to paid plan

---

**Note**: Free tier services may take 30-60 seconds to start after inactivity.

