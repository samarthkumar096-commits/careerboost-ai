# CareerBoost AI - Complete Setup Guide

## 🎯 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/samarthkumar096-commits/careerboost-ai.git
cd careerboost-ai
npm install
cd server
npm install
cd ..
```

### 2. Configure Stripe Keys

#### Frontend (.env) - Already configured ✅
The publishable key is already set in `.env` file.

#### Backend (server/.env) - You need to create this
Create `server/.env` file manually:

```bash
cd server
touch .env
```

Add your Stripe secret key (the one you provided):
```env
STRIPE_SECRET_KEY=your_secret_key_here
STRIPE_WEBHOOK_SECRET=
CLIENT_URL=http://localhost:5173
PORT=3000
```

### 3. Create Products in Stripe

Go to: https://dashboard.stripe.com/test/products

#### Pro Plan (Monthly)
- Click "+ Add product"
- Name: `Pro Plan`
- Price: `999 INR` (Recurring, Monthly)
- Save and copy the **Price ID**

#### Lifetime Plan (One-time)
- Click "+ Add product"
- Name: `Lifetime Access`
- Price: `4999 INR` (One time)
- Save and copy the **Price ID**

### 4. Update Price IDs

Edit `src/config/stripe.js` and replace:
```javascript
priceId: 'price_REPLACE_WITH_YOUR_PRO_PRICE_ID'
```
with your actual Price IDs from Stripe.

### 5. Run the Application

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd server
npm run dev
```

### 6. Test Payment

1. Open http://localhost:5173
2. Click "Upgrade to Pro"
3. Use test card: `4242 4242 4242 4242`
4. Expiry: Any future date (12/25)
5. CVC: Any 3 digits (123)

## 🧪 Stripe Test Cards

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

## 📋 Checklist

- [ ] Installed dependencies
- [ ] Created `server/.env` with secret key
- [ ] Created products in Stripe Dashboard
- [ ] Updated Price IDs in `src/config/stripe.js`
- [ ] Started frontend server
- [ ] Started backend server
- [ ] Tested payment successfully

## 🚀 You're Ready!

Your Stripe keys are already configured. Just:
1. Create the products in Stripe Dashboard
2. Update the Price IDs
3. Run both servers
4. Start accepting payments!

## 📞 Need Help?

Check Stripe Dashboard logs: https://dashboard.stripe.com/test/logs