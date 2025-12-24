import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

// Pricing plans
// TODO: Replace priceId values with actual Price IDs from Stripe Dashboard
// Get them from: https://dashboard.stripe.com/test/products
export const pricingPlans = {
  free: {
    name: 'Free',
    price: 0,
    currency: '$',
    features: [
      '1 Resume per month',
      '1 Cover Letter per month',
      'Basic ATS Score',
      'Standard templates'
    ]
  },
  pro: {
    name: 'Pro',
    price: 9,
    currency: '$',
    priceId: 'price_REPLACE_WITH_YOUR_PRO_PRICE_ID', // TODO: Replace this with actual Price ID from Stripe
    features: [
      'Unlimited Resumes',
      'Unlimited Cover Letters',
      'Advanced ATS Score',
      'Premium templates',
      'AI Optimizer',
      'Priority support'
    ]
  },
  lifetime: {
    name: 'Lifetime',
    price: 49,
    currency: '$',
    priceId: 'price_REPLACE_WITH_YOUR_LIFETIME_PRICE_ID', // TODO: Replace this with actual Price ID from Stripe
    features: [
      'Everything in Pro',
      'Lifetime access',
      'All future updates',
      'VIP support',
      'Early access to new features'
    ]
  }
}

export const createCheckoutSession = async (priceId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    })
    
    const session = await response.json()
    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}