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

Add your Stripe secret key:
```env
STRIPE_SECRET_KEY=your_secret_key_here
STRIPE_WEBHOOK_SECRET=
CLIENT_URL=http://localhost:5173
PORT=3000
```

### 3. Create Products in Stripe

Go to: https://dashboard.stripe.com/test/products

#### Pro Plan (Monthly Subscription)
- Click "+ Add product"
- Name: `Pro Plan`
- Description: `Monthly subscription with unlimited features`
- Price: `$9.00 USD` (Recurring, Monthly)
- Save and copy the **Price ID** (starts with `price_`)

#### Lifetime Plan (One-time Payment)
- Click "+ Add product"
- Name: `Lifetime Access`
- Description: `One-time payment for lifetime access`
- Price: `$49.00 USD` (One time)
- Save and copy the **Price ID** (starts with `price_`)

### 4. Update Price IDs

Edit `src/config/stripe.js` and replace:

```javascript
pro: {
  priceId: 'price_YOUR_ACTUAL_PRO_PRICE_ID', // Replace with Pro plan Price ID
},
lifetime: {
  priceId: 'price_YOUR_ACTUAL_LIFETIME_PRICE_ID', // Replace with Lifetime Price ID
}
```

### 5. Run the Application

**Terminal 1 (Frontend):**
```bash
npm run dev
```
Opens at: http://localhost:5173

**Terminal 2 (Backend):**
```bash
cd server
npm run dev
```
Runs at: http://localhost:3000

### 6. Test Payment

1. Open http://localhost:5173
2. Click "Upgrade to Pro" banner
3. Select a plan (Pro $9/month or Lifetime $49)
4. Use Stripe test card: `4242 4242 4242 4242`
5. Expiry: Any future date (e.g., 12/25)
6. CVC: Any 3 digits (e.g., 123)
7. Complete payment ✅

## 🧪 Stripe Test Cards

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`
- **Insufficient funds:** `4000 0000 0000 9995`

## 💰 Pricing Plans

- **Free:** $0 - Limited features
- **Pro:** $9/month - Unlimited everything
- **Lifetime:** $49 one-time - Lifetime access

## 📋 Setup Checklist

- [ ] Cloned repository
- [ ] Installed frontend dependencies (`npm install`)
- [ ] Installed backend dependencies (`cd server && npm install`)
- [ ] Created `server/.env` with Stripe secret key
- [ ] Created Pro Plan product in Stripe Dashboard ($9/month)
- [ ] Created Lifetime Plan product in Stripe Dashboard ($49)
- [ ] Copied both Price IDs from Stripe
- [ ] Updated Price IDs in `src/config/stripe.js`
- [ ] Started frontend server (`npm run dev`)
- [ ] Started backend server (`cd server && npm run dev`)
- [ ] Tested payment with test card
- [ ] Payment successful! 🎉

## 🚀 You're Ready!

Your Stripe keys are configured. Just:
1. Create the 2 products in Stripe Dashboard
2. Copy and update the Price IDs
3. Run both servers
4. Start accepting payments!

## 🔗 Important Links

- Stripe Dashboard: https://dashboard.stripe.com
- Test Products: https://dashboard.stripe.com/test/products
- Test Logs: https://dashboard.stripe.com/test/logs
- API Keys: https://dashboard.stripe.com/test/apikeys

## 📞 Need Help?

- Check Stripe Dashboard logs for payment errors
- Check browser console for frontend errors
- Check server terminal for backend errors
- Verify Price IDs are correct in `src/config/stripe.js`