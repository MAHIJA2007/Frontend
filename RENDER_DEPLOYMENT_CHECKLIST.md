# ✅ Render Deployment Checklist

## Quick Steps to Deploy

### 1. Backend Deployment

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repository: `MAHIJA2007/Frontend`
4. Configure:
   - **Name**: `sustainable-platform-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Environment Variables** (Add these):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-random-secret-here>
   FRONTEND_URL=<will-be-set-after-frontend-deployment>
   ```

6. Click **"Create Web Service"**
7. **Copy the backend URL** (e.g., `https://sustainable-platform-backend.onrender.com`)

### 2. Frontend Deployment

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repository: `MAHIJA2007/Frontend`
4. Configure:
   - **Name**: `sustainable-platform-frontend`
   - **Root Directory**: `frontend`
   - **Root Directory**: `frontend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Environment Variables**:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://sustainable-platform-backend.onrender.com/api
   ```
   (Use your actual backend URL from step 1)

6. Click **"Create Web Service"**

### 3. Update Backend CORS

After frontend is deployed:
1. Go to backend service → **Environment**
2. Add/Update:
   ```
   FRONTEND_URL=https://sustainable-platform-frontend.onrender.com
   ```
3. **Redeploy** the backend service

### 4. MongoDB Setup

**Option A: MongoDB Atlas (Recommended)**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Network Access: Add `0.0.0.0/0` (or Render's IP)
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/sustainable-living`
6. Add to backend as `MONGODB_URI`

**Option B: Render MongoDB**
1. Render Dashboard → **New +** → **MongoDB**
2. Name: `sustainable-platform-db`
3. Copy Internal Database URL
4. Add to backend as `MONGODB_URI`

### 5. Seed Database (Optional)

After deployment, you can seed the database:
- Option 1: Run `node seed.js` locally with production `MONGODB_URI`
- Option 2: Create a one-time deployment script
- Option 3: Manually add data through admin panel

## Important Notes

⚠️ **Free Tier Limitations:**
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Consider upgrading for production use

🔒 **Security:**
- Use strong `JWT_SECRET` (random string)
- Never commit `.env` files
- Use MongoDB Atlas IP whitelist for production

📝 **URLs to Update:**
- Frontend: Update `NEXT_PUBLIC_API_URL` with backend URL
- Backend: Update `FRONTEND_URL` with frontend URL
- CORS: Already configured in code

## Testing After Deployment

1. Visit frontend URL
2. Test registration/login
3. Check API endpoints
4. Verify database connection
5. Test module/project completion

## Troubleshooting

- **Build fails**: Check logs in Render dashboard
- **CORS errors**: Verify `FRONTEND_URL` in backend env vars
- **Database connection**: Check MongoDB URI and IP whitelist
- **Port errors**: Render uses port 10000, code already handles this

---

**Your Repository**: https://github.com/MAHIJA2007/Frontend.git

