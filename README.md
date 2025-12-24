# ResumeAI - Your AI Career Partner

A modern web application for creating ATS-friendly resumes, cover letters, and optimizing your career documents with AI. Includes Stripe payment integration for Pro subscriptions.

## Features

- **Create Resume**: Build ATS-friendly resumes with AI assistance
- **Cover Letter Generator**: Generate professional cover letters
- **ATS Score Checker**: Check your resume compatibility with ATS systems
- **AI Optimizer**: Enhance your resume with AI-powered tips
- **Pro Subscription**: Stripe-powered payment system with multiple plans
- **Lifetime Access**: One-time payment option

## Tech Stack

### Frontend
- **React 18** + Vite
- **Tailwind CSS** for styling
- **React Router v6** for navigation
- **Lucide React** for icons
- **Stripe.js** for payment processing

### Backend
- **Express.js** server
- **Stripe API** for payments
- **Webhook handling** for subscription events

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Stripe account (get one at https://stripe.com)
- npm or yarn package manager

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/samarthkumar096-commits/careerboost-ai.git
cd careerboost-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your Stripe publishable key to `.env`:
```
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key_here
VITE_API_URL=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your Stripe keys to `server/.env`:
```
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
CLIENT_URL=http://localhost:5173
PORT=3000
```

5. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:3000`

## Stripe Configuration

### 1. Get Stripe API Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### 2. Create Products in Stripe

Go to Stripe Dashboard → Products and create:

**Pro Plan (Monthly Subscription)**
- Name: Pro Plan
- Price: ₹999/month (or your preferred amount)
- Billing period: Monthly
- Copy the **Price ID** (starts with `price_`)

**Lifetime Plan (One-time Payment)**
- Name: Lifetime Access
- Price: ₹4999 (or your preferred amount)
- Billing period: One-time
- Copy the **Price ID**

### 3. Update Price IDs

Edit `src/config/stripe.js` and replace with your actual Price IDs:

```javascript
export const pricingPlans = {
  pro: {
    priceId: 'price_YOUR_PRO_PRICE_ID', // Replace this
    // ...
  },
  lifetime: {
    priceId: 'price_YOUR_LIFETIME_PRICE_ID', // Replace this
    // ...
  }
}
```

### 4. Setup Webhooks (for production)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe CLI:
```bash
stripe login
```

3. Forward webhooks to local server:
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

4. Copy the webhook signing secret (starts with `whsec_`) to `server/.env`

For production, add your production webhook endpoint in Stripe Dashboard.

## Testing Payments

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

## Project Structure

```
careerboost-ai/
├── src/
│   ├── components/      # Reusable components
│   │   └── Navigation.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Resume.jsx
│   │   ├── ATSScore.jsx
│   │   ├── Profile.jsx
│   │   ├── Pricing.jsx
│   │   ├── Success.jsx
│   │   └── Cancel.jsx
│   ├── config/         # Configuration files
│   │   └── stripe.js   # Stripe config & pricing
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── server/             # Backend server
│   ├── index.js        # Express server with Stripe
│   ├── package.json
│   └── .env.example
├── public/             # Static assets
├── index.html          # HTML template
└── package.json        # Frontend dependencies
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/create-checkout-session` - Create Stripe checkout session
- `POST /api/webhook` - Handle Stripe webhook events
- `POST /api/create-portal-session` - Create customer portal session

## Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Add environment variables in hosting platform

### Backend (Railway/Render/Heroku)
1. Deploy the `server` folder
2. Add environment variables
3. Update `VITE_API_URL` in frontend to production URL

## Environment Variables

### Frontend (.env)
```
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_API_URL=http://localhost:3000
```

### Backend (server/.env)
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLIENT_URL=http://localhost:5173
PORT=3000
```

## License

MIT License

## Author

Samarth Kumar

## Support

For issues or questions, please open an issue on GitHub.