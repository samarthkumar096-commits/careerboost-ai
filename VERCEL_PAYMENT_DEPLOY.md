# 🚀 VERCEL DEPLOYMENT COMPLETE GUIDE

## ✅ BACKEND DEPLOYED!

**Backend Repo:** https://github.com/samarthkumar096-commits/careerboost-backend

**Backend URL:** https://careerboost-backend.vercel.app

---

## 📋 DEPLOYMENT CHECKLIST

### ✅ Step 1: Deploy Backend (DONE!)

- [x] Backend repo created
- [x] Code pushed to GitHub
- [ ] **YOU DO THIS:** Deploy to Vercel
- [ ] **YOU DO THIS:** Add environment variables
- [ ] **YOU DO THIS:** Copy backend URL

---

### 🎯 Step 2: Deploy Backend to Vercel (DO THIS NOW!)

#### 1. Open Vercel Dashboard
```
https://vercel.com/dashboard
```

#### 2. Import Backend Project
```
1. Click "Add New" → "Project"
2. Click "Import Git Repository"
3. Search: "careerboost-backend"
4. Click "Import"
```

#### 3. Configure Project
```
Framework Preset: Other
Root Directory: ./
Build Command: (leave empty)
Output Directory: (leave empty)  
Install Command: npm install
```

#### 4. Add Environment Variables

**IMPORTANT: Add these 3 variables:**

```
Variable 1:
Name: RAZORPAY_KEY_ID
Value: rzp_test_RvMV8TCAdy3ugd

Variable 2:
Name: RAZORPAY_KEY_SECRET
Value: [GET FROM RAZORPAY DASHBOARD]

Variable 3:
Name: RAZORPAY_WEBHOOK_SECRET
Value: [OPTIONAL - for webhooks]
```

**Select:** ✅ Production ✅ Preview ✅ Development

#### 5. Deploy!
```
Click "Deploy" button
Wait 1-2 minutes
✅ Backend deployed!
```

#### 6. Copy Your Backend URL
```
After deployment, you'll get:
https://careerboost-backend.vercel.app

OR

https://careerboost-backend-xxx.vercel.app

COPY THIS URL!
```

---

### ✅ Step 3: Update Frontend Environment Variables

#### 1. Go to Frontend Project
```
https://vercel.com/dashboard
→ Select "careerboost-ai"
→ Settings
→ Environment Variables
```

#### 2. Add Backend URL
```
Name: VITE_API_URL
Value: [PASTE YOUR BACKEND URL HERE]

Example: https://careerboost-backend.vercel.app

Select: ✅ Production ✅ Preview ✅ Development
```

#### 3. Verify Razorpay Key
```
Name: VITE_RAZORPAY_KEY_ID
Value: rzp_test_RvMV8TCAdy3ugd

(Should already exist, if not add it)
```

#### 4. Redeploy Frontend
```
Go to Deployments tab
Click "..." on latest deployment
Click "Redeploy"
```

---

### ✅ Step 4: Test Payment Flow

#### 1. Open Your App
```
https://careerboost-ai.vercel.app/pricing
```

#### 2. Check Maintenance Notice is GONE
```
❌ Should NOT see: "Payment System Under Maintenance"
✅ Should see: Normal pricing cards with "Get Started" buttons
```

#### 3. Test Payment
```
1. Click "Get Started" on any plan
2. Razorpay modal should open
3. Use test card:
   Card: 4111 1111 1111 1111
   CVV: 123
   Expiry: 12/25
4. Complete payment
5. Should see success message
```

---

## 🔍 TROUBLESHOOTING

### Backend Not Responding

**Check:**
```
1. Vercel deployment status (should be green)
2. Environment variables are set
3. Test health endpoint:
   https://your-backend-url.vercel.app/api/health
```

**Should return:**
```json
{
  "status": "ok",
  "message": "CareerBoost AI Backend Server Running",
  "payment": "Razorpay"
}
```

---

### Payment Button Not Working

**Check:**
```
1. Browser console for errors
2. Network tab for API calls
3. VITE_API_URL is correct in Vercel
4. Backend is responding
```

**Debug in console:**
```javascript
console.log(import.meta.env.VITE_API_URL)
console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)
```

---

### Razorpay Modal Not Opening

**Check:**
```
1. VITE_RAZORPAY_KEY_ID is set
2. Backend returned orderId
3. Razorpay script loaded
4. No console errors
```

---

## 📊 DEPLOYMENT STATUS

### Backend
- [x] Repo created
- [x] Code pushed
- [ ] **Deployed to Vercel** ← DO THIS
- [ ] **Environment variables added** ← DO THIS
- [ ] **Health check passing** ← VERIFY THIS

### Frontend
- [x] Code updated
- [x] Payments enabled
- [ ] **VITE_API_URL added** ← DO THIS
- [ ] **Redeployed** ← DO THIS
- [ ] **Payment tested** ← DO THIS

---

## 🎯 QUICK COMMANDS

### Test Backend Health
```bash
curl https://careerboost-backend.vercel.app/api/health
```

### Test Order Creation
```bash
curl -X POST https://careerboost-backend.vercel.app/api/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount":29900,"currency":"INR","planId":"monthly"}'
```

---

## ✅ SUCCESS CHECKLIST

After completing all steps, verify:

- [ ] Backend deployed and running
- [ ] Health endpoint returns 200 OK
- [ ] Frontend has VITE_API_URL set
- [ ] Pricing page shows "Get Started" buttons
- [ ] Clicking button opens Razorpay modal
- [ ] Test payment completes successfully
- [ ] Payment verification works

---

## 🎉 DONE!

Once all checkboxes are ✅, your payment system is LIVE!

**Test it:** https://careerboost-ai.vercel.app/pricing

---

## 📞 NEED HELP?

**Backend not deploying?**
- Check Vercel deployment logs
- Verify package.json is correct
- Check vercel.json configuration

**Payment not working?**
- Check browser console
- Check Network tab
- Verify environment variables
- Test backend health endpoint

---

**Made with ❤️ by CareerBoost AI Team**
