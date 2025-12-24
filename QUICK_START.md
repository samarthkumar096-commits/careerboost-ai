# ⚡ Quick Start Guide

## 🎯 Get Running in 5 Minutes!

### 1️⃣ Clone & Install

```bash
git clone https://github.com/samarthkumar096-commits/careerboost-ai.git
cd careerboost-ai
npm install
cd server && npm install && cd ..
```

### 2️⃣ Get API Keys

**Stripe (Payment):**
- Go to: https://dashboard.stripe.com/test/apikeys
- Copy Publishable key (pk_test_...)
- Copy Secret key (sk_test_...)

**OpenRouter (AI Features):**
- Go to: https://openrouter.ai/keys
- Sign up (free $5 credits!)
- Create key
- Copy API key (sk-or-v1-...)

### 3️⃣ Create Products in Stripe

Go to: https://dashboard.stripe.com/test/products

**Pro Plan:**
- Name: Pro Plan
- Price: $9/month (Recurring)
- Copy Price ID

**Lifetime:**
- Name: Lifetime Access  
- Price: $49 (One-time)
- Copy Price ID

### 4️⃣ Configure Environment

**Frontend (.env) - Already configured! ✅**

**Backend (server/.env) - Create this file:**

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
OPENROUTER_API_KEY=your_openrouter_key
CLIENT_URL=http://localhost:5173
PORT=3000
```

### 5️⃣ Update Price IDs

Edit `src/config/stripe.js`:
- Replace `price_REPLACE_WITH_YOUR_PRO_PRICE_ID`
- Replace `price_REPLACE_WITH_YOUR_LIFETIME_PRICE_ID`

### 6️⃣ Run!

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
cd server
npm run dev
```

### 7️⃣ Open & Test

Open: http://localhost:5173

Test with card: `4242 4242 4242 4242`

---

## ✨ Features Ready to Use

✅ AI Resume Builder
✅ ATS Score Checker  
✅ Stripe Payments
✅ Modern UI

---

## 🆘 Need Help?

**AI not working?**
- Add OpenRouter API key to server/.env

**Payment not working?**
- Update Price IDs in src/config/stripe.js
- Use test card: 4242 4242 4242 4242

**Server not starting?**
- Check server/.env file exists
- Run: cd server && npm install

---

## 🚀 You're Ready!

Everything is set up and ready to go! 🎉