# Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended for Frontend)

1. Go to: https://vercel.com/new
2. Import your GitHub repository: `samarthkumar096-commits/careerboost-ai`
3. Configure:
   - Framework Preset: `Vite`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add Environment Variables:
   - `VITE_STRIPE_PUBLIC_KEY` = `pk_test_51QHoXoSFzSkQ6u8thKZrbhD2Dg2Ae1xPQuJcV6GPmm5xrIKDdhoixq0uydtbObumUIKKWXVJpveHPEZXuPCMfLmO00DZzL7jh8`
   - `VITE_API_URL` = Your backend URL (from Railway/Render)
5. Click **Deploy**

**Your app will be live at:** `https://your-app.vercel.app`

### Option 2: Netlify

1. Go to: https://app.netlify.com/start
2. Connect to GitHub and select repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add Environment Variables:
   - `VITE_STRIPE_PUBLIC_KEY` = Your Stripe key
   - `VITE_API_URL` = Your backend URL
5. Click **Deploy**

### Option 3: Railway (For Backend)

1. Go to: https://railway.app/new
2. Select "Deploy from GitHub repo"
3. Choose `careerboost-ai` repository
4. Select `server` directory as root
5. Add Environment Variables:
   - `STRIPE_SECRET_KEY` = Your secret key
   - `CLIENT_URL` = Your frontend URL (from Vercel/Netlify)
   - `PORT` = 3000
6. Deploy

### Option 4: Render (For Backend)

1. Go to: https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - Name: `careerboost-api`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add Environment Variables
6. Create Web Service

## 🔗 Complete Deployment Flow

### Step 1: Deploy Backend First

Deploy backend on Railway or Render and get the URL (e.g., `https://your-api.railway.app`)

### Step 2: Deploy Frontend

Deploy frontend on Vercel/Netlify with backend URL in environment variables

### Step 3: Update Stripe Webhook

1. Go to: https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://your-api.railway.app/api/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy webhook signing secret
5. Add to backend environment variables

## 📋 Environment Variables Checklist

### Frontend (Vercel/Netlify)
- [ ] `VITE_STRIPE_PUBLIC_KEY`
- [ ] `VITE_API_URL`

### Backend (Railway/Render)
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] `CLIENT_URL`
- [ ] `PORT`

## 🎉 You're Live!

After deployment:
1. Frontend URL: `https://your-app.vercel.app`
2. Backend URL: `https://your-api.railway.app`
3. Test the payment flow with Stripe test cards

## 🔧 Troubleshooting

**CORS Error:**
- Make sure `CLIENT_URL` in backend matches your frontend URL

**Payment Not Working:**
- Verify Stripe keys are correct
- Check webhook is configured
- Test with Stripe test cards

**Build Failed:**
- Check Node version (use 18+)
- Verify all dependencies are in package.json