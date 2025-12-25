# Environment Variables Setup

## Required Variables

### Frontend (.env)
```env
# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_RvMV8TCAdy3ugd

# Backend API
VITE_API_URL=https://careerboost-backend.vercel.app

# Supabase (if using)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# Gemini AI (if using)
VITE_GEMINI_API_KEY=your_gemini_key
```

### Backend (.env)
```env
# Razorpay
RAZORPAY_KEY_ID=rzp_test_RvMV8TCAdy3ugd
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Server
PORT=3001
```

## How to Add in Vercel

### Frontend
1. Go to: https://vercel.com/dashboard
2. Select: careerboost-ai
3. Settings → Environment Variables
4. Add each variable
5. Select: Production, Preview, Development
6. Save

### Backend
1. Go to: https://vercel.com/dashboard
2. Select: careerboost-backend
3. Settings → Environment Variables
4. Add each variable
5. Select: Production, Preview, Development
6. Save

## Get Razorpay Keys

1. Sign up: https://razorpay.com
2. Dashboard → Settings → API Keys
3. Generate Test Key
4. Copy Key ID and Secret

## After Adding Variables

1. Redeploy both projects
2. Wait 1-2 minutes
3. Test payment flow
