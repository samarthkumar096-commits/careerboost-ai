# 💳 Razorpay Payment Integration - Complete Guide

## ✅ What's Added:

Complete Razorpay payment system with:
- ✅ Indian payments (UPI, Cards, Net Banking, Wallets)
- ✅ International payments (Visa, Mastercard, Amex)
- ✅ 3 pricing tiers (Monthly, Yearly, Lifetime)
- ✅ Secure checkout
- ✅ Beautiful pricing page

---

## 🚀 Setup Razorpay (5 Minutes - FREE!)

### **Step 1: Create Razorpay Account**

1. **Go to:** https://razorpay.com/

2. **Click:** "Sign Up"

3. **Sign up** with email/phone

4. **Verify** email/phone

5. **Complete KYC** (for live mode - optional for testing)

---

### **Step 2: Get API Keys**

1. **Go to:** https://dashboard.razorpay.com/app/keys

2. **You'll see:**
   ```
   Test Mode Keys (for development)
   
   Key ID: rzp_test_XXXXXXXXXXXXXXXX
   Key Secret: XXXXXXXXXXXXXXXXXXXXXXXX
   ```

3. **Copy Key ID** (starts with `rzp_test_`)

---

### **Step 3: Add to .env**

Update `.env` file:

```env
# Stripe (keep for backup)
VITE_STRIPE_PUBLIC_KEY=pk_test_51QHoXoSFzSkQ6u8thKZrbhD2Dg2Ae1xPQuJcV6GPmm5xrIKDdhoixq0uydtbObumUIKKWXVJpveHPEZXuPCMfLmO00DZzL7jh8
VITE_API_URL=http://localhost:3000

# Supabase (authentication)
VITE_SUPABASE_URL=https://kjovhrtgunlxfflklsap.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqb3ZocnRndW5seGZmbGtsc2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NjM1NTQsImV4cCI6MjA4MTIzOTU1NH0.ckUthyXsZFYCJnXgTGnjay6UJnxaPb9xFkwDnc5MrJk

# Razorpay (payment)
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_here
```

---

### **Step 4: Run App**

```bash
npm install
npm run dev
```

**Test payment at:** http://localhost:5173/pricing

---

## 💰 Pricing Plans:

### **Monthly Pro - ₹299/month**
- Unlimited AI Resume Generation
- ATS Score Checker
- Cover Letter Generator
- Premium Templates
- Priority Support

### **Yearly Pro - ₹2,999/year** (Save ₹588!)
- Everything in Monthly
- Save 17% annually
- Early access to features
- Dedicated support

### **Lifetime Pro - ₹4,999** (Best Value!)
- Everything in Yearly
- Lifetime access
- All future features
- Priority support forever

---

## 🎯 Payment Methods Supported:

### **Indian Payments:**
- ✅ UPI (Google Pay, PhonePe, Paytm)
- ✅ Credit/Debit Cards
- ✅ Net Banking (All major banks)
- ✅ Wallets (Paytm, Mobikwik, etc.)
- ✅ EMI options

### **International Payments:**
- ✅ Visa
- ✅ Mastercard
- ✅ American Express
- ✅ International Debit Cards

---

## 🔐 Security:

- ✅ PCI DSS Level 1 Compliant
- ✅ 256-bit SSL encryption
- ✅ 3D Secure authentication
- ✅ Fraud detection
- ✅ Trusted by 8M+ businesses

---

## 🧪 Test Payment:

### **Test Cards:**

**Success:**
```
Card: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
```

**Failure:**
```
Card: 4000 0000 0000 0002
```

**Test UPI:**
```
UPI ID: success@razorpay
```

---

## 🌐 Go Live (Production):

### **Step 1: Complete KYC**

1. Go to: https://dashboard.razorpay.com/app/account
2. Complete business verification
3. Submit documents
4. Wait for approval (1-2 days)

### **Step 2: Get Live Keys**

1. Go to: https://dashboard.razorpay.com/app/keys
2. Switch to "Live Mode"
3. Copy live keys:
   ```
   Key ID: rzp_live_XXXXXXXXXXXXXXXX
   Key Secret: XXXXXXXXXXXXXXXXXXXXXXXX
   ```

### **Step 3: Update .env**

```env
VITE_RAZORPAY_KEY_ID=rzp_live_your_live_key
```

---

## 💡 Backend Integration (Optional):

For production, create backend API:

### **Create Order API:**

```javascript
// POST /api/razorpay/create-order
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

app.post('/api/razorpay/create-order', async (req, res) => {
  const { amount, currency, planId } = req.body
  
  const order = await razorpay.orders.create({
    amount: amount * 100, // paise
    currency: currency,
    receipt: `receipt_${Date.now()}`,
    notes: { planId }
  })
  
  res.json(order)
})
```

### **Verify Payment API:**

```javascript
// POST /api/razorpay/verify
const crypto = require('crypto')

app.post('/api/razorpay/verify', (req, res) => {
  const { orderId, paymentId, signature } = req.body
  
  const text = orderId + '|' + paymentId
  const generated = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(text)
    .digest('hex')
  
  if (generated === signature) {
    // Payment verified!
    // Update user subscription in database
    res.json({ verified: true })
  } else {
    res.json({ verified: false })
  }
})
```

---

## 📊 Dashboard Features:

### **Razorpay Dashboard:**
- View all transactions
- Refund payments
- Download reports
- Analytics
- Customer management

**Access:** https://dashboard.razorpay.com/

---

## 🎨 Customization:

### **Change Prices:**

Edit `src/lib/razorpay.js`:

```javascript
export const paymentPlans = {
  monthly: {
    price: 299, // Change this
    // ...
  }
}
```

### **Change Theme Color:**

Edit `src/lib/razorpay.js`:

```javascript
theme: {
  color: '#9333ea' // Your brand color
}
```

---

## 🆘 Troubleshooting:

**Payment not opening:**
- Check Razorpay key is correct
- Verify internet connection
- Check browser console for errors

**Payment failing:**
- Use test cards in test mode
- Check amount is > ₹1
- Verify currency is 'INR'

**Webhook not working:**
- Add webhook URL in dashboard
- Verify webhook secret
- Check server logs

---

## 📱 Mobile Support:

Razorpay checkout works perfectly on:
- ✅ Android (Chrome, Firefox)
- ✅ iOS (Safari, Chrome)
- ✅ Mobile browsers
- ✅ WebView (for apps)

---

## 🎉 Features:

### **✅ Working:**
- Beautiful pricing page
- 3 pricing tiers
- Razorpay checkout
- Multiple payment methods
- Test mode ready
- Mobile responsive

### **✅ Next Steps:**
1. Add Razorpay key to .env
2. Test payment flow
3. Complete KYC for live mode
4. Add backend verification
5. Go live!

---

## 🚀 Quick Start:

```bash
# 1. Get Razorpay key
Go to: https://dashboard.razorpay.com/app/keys

# 2. Add to .env
VITE_RAZORPAY_KEY_ID=rzp_test_your_key

# 3. Run app
npm run dev

# 4. Test payment
Go to: http://localhost:5173/pricing
```

---

## 💳 Why Razorpay?

- ✅ **Indian + International** payments
- ✅ **Easy integration** (5 minutes)
- ✅ **Low fees** (2% + GST)
- ✅ **Instant settlements**
- ✅ **Great support**
- ✅ **Trusted** by 8M+ businesses

---

**Your payment system is ready!** 💰

**Happy Selling!** 🚀💳