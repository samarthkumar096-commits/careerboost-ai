# CareerBoost AI - Backend Server

Express.js server with Stripe payment integration.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Stripe keys to `.env`:
- Get your keys from: https://dashboard.stripe.com/apikeys
- STRIPE_SECRET_KEY: Your secret key (starts with `sk_`)
- STRIPE_WEBHOOK_SECRET: Your webhook signing secret (starts with `whsec_`)

4. Start the server:
```bash
npm run dev
```

## Stripe Setup

### 1. Create Products & Prices

Go to Stripe Dashboard → Products and create:

**Pro Plan (Monthly)**
- Name: Pro Plan
- Price: ₹999/month
- Copy the Price ID (starts with `price_`)

**Lifetime Plan**
- Name: Lifetime Access
- Price: ₹4999 (one-time)
- Copy the Price ID

### 2. Update Frontend Config

Update `src/config/stripe.js` with your Price IDs:
```javascript
priceId: 'price_YOUR_ACTUAL_PRICE_ID'
```

### 3. Setup Webhook

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks to local server:
```bash
stripe listen --forward-to localhost:3000/api/webhook
```
4. Copy the webhook signing secret to `.env`

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/webhook` - Stripe webhook handler
- `POST /api/create-portal-session` - Customer portal

## Testing

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

Any future expiry date and any 3-digit CVC.