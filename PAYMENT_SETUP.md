# 💳 Payment System Setup Guide

## 🚀 Quick Start

### Step 1: Deploy Backend Server

#### Option A: Railway (Recommended - FREE)

1. **Go to Railway**
   ```
   https://railway.app
   ```

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose: `careerboost-ai`
   - Select folder: `server`

3. **Add Environment Variables**
   ```
   RAZORPAY_KEY_ID=rzp_test_RvMV8TCAdy3ugd
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   PORT=3001
   ```

4. **Get Your Backend URL**
   ```
   Example: https://careerboost-server.up.railway.app
   ```

#### Option B: Render (FREE)

1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `server`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables (same as above)

#### Option C: Local Development

```bash
cd server
npm install
npm run dev
```

---

### Step 2: Update Frontend Environment Variables

**In Vercel Dashboard:**

1. Go to: https://vercel.com/dashboard
2. Select: `careerboost-ai`
3. Settings → Environment Variables
4. Add:

```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_RAZORPAY_KEY_ID=rzp_test_RvMV8TCAdy3ugd
```

---

### Step 3: Enable Payments

**Method 1: Via Config File (Recommended)**

Edit `src/config/payment.js`:

```javascript
export const PAYMENTS_ENABLED = true  // Change to true
```

**Method 2: Via Pricing Page**

Edit `src/pages/Pricing.jsx` line 15:

```javascript
const PAYMENTS_ENABLED = true  // Change from false to true
```

---

### Step 4: Get Razorpay Keys

1. **Sign up at Razorpay**
   ```
   https://razorpay.com
   ```

2. **Get Test Keys** (for development)
   - Dashboard → Settings → API Keys
   - Generate Test Key
   - Copy Key ID and Key Secret

3. **Get Live Keys** (for production)
   - Complete KYC verification
   - Activate live mode
   - Generate Live Keys

---

### Step 5: Test Payment Flow

1. **Open your app**
   ```
   https://careerboost-ai.vercel.app/pricing
   ```

2. **Click "Get Started"** on any plan

3. **Use Test Cards:**

   **For Success:**
   ```
   Card: 4111 1111 1111 1111
   CVV: Any 3 digits
   Expiry: Any future date
   ```

   **For Failure:**
   ```
   Card: 4000 0000 0000 0002
   ```

4. **Check Console** for payment logs

---

## 🔧 Troubleshooting

### Payment Button Not Working

**Check:**
1. `PAYMENTS_ENABLED = true` in config
2. Backend server is running
3. `VITE_API_URL` is correct
4. Razorpay keys are valid

**Debug:**
```javascript
// In browser console:
console.log(import.meta.env.VITE_API_URL)
console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)
```

---

### Backend Not Responding

**Check:**
1. Railway/Render deployment status
2. Environment variables are set
3. Server logs for errors

**Test Backend:**
```bash
curl https://your-backend-url.railway.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "Server is running",
  "payment": "Razorpay"
}
```

---

### Payment Verification Failing

**Check:**
1. `RAZORPAY_KEY_SECRET` is correct
2. Backend `/api/verify-payment` endpoint working
3. Network tab for API errors

---

## 📊 Payment Flow

```
User clicks "Get Started"
   ↓
Frontend calls: POST /api/create-order
   ↓
Backend creates Razorpay order
   ↓
Returns: orderId, amount, currency
   ↓
Frontend opens Razorpay checkout
   ↓
User completes payment
   ↓
Razorpay returns: payment_id, order_id, signature
   ↓
Frontend calls: POST /api/verify-payment
   ↓
Backend verifies signature
   ↓
Returns: success/failure
   ↓
Update user subscription in database
   ↓
Show success message
```

---

## 🔐 Security Checklist

- [ ] Never commit `RAZORPAY_KEY_SECRET` to Git
- [ ] Use environment variables for all keys
- [ ] Verify payment signature on backend
- [ ] Use HTTPS for production
- [ ] Enable webhook signature verification
- [ ] Log all payment events
- [ ] Handle failed payments gracefully

---

## 🎯 Production Checklist

- [ ] Backend deployed and running
- [ ] Environment variables set in Vercel
- [ ] `PAYMENTS_ENABLED = true`
- [ ] Razorpay live keys configured
- [ ] Test payment flow end-to-end
- [ ] Webhook endpoint configured
- [ ] Error handling implemented
- [ ] Success/failure pages ready

---

## 📞 Support

**Issues?**
- Check server logs in Railway/Render
- Check browser console for errors
- Test backend health endpoint
- Verify all environment variables

**Still stuck?**
- Open GitHub issue
- Check Razorpay dashboard for payment logs
- Review backend API logs

---

## 🎉 Success!

Once everything is set up:

✅ Users can select plans
✅ Payment modal opens
✅ Payments are processed
✅ Verification happens automatically
✅ Users get access to Pro features

---

**Made with ❤️ by CareerBoost AI Team**
