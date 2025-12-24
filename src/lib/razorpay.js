// Razorpay Integration for CareerBoost AI

// Load Razorpay script
export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// Razorpay configuration
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_RvMV8TCAdy3ugd'

// Detect user currency based on location (simplified)
export const detectCurrency = () => {
  // You can use IP geolocation API for accurate detection
  // For now, defaulting to INR
  const userCountry = navigator.language || 'en-IN'
  return userCountry.includes('IN') ? 'INR' : 'USD'
}

// Payment plans with dual currency support
export const paymentPlans = {
  monthly: {
    id: 'monthly',
    name: 'Pro Monthly',
    priceINR: 299,
    priceUSD: 3.99,
    currency: 'INR', // Will be set dynamically
    description: 'Monthly subscription',
    features: [
      'Unlimited AI Resume Generation',
      'ATS Score Checker',
      'Cover Letter Generator',
      'Premium Templates',
      'Priority Support'
    ]
  },
  yearly: {
    id: 'yearly',
    name: 'Pro Yearly',
    priceINR: 2999,
    priceUSD: 39.99,
    currency: 'INR',
    description: 'Yearly subscription (Save 17%)',
    features: [
      'Everything in Monthly',
      'Save 17% annually',
      'Early access to new features',
      'Dedicated support',
      'Lifetime updates'
    ]
  },
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime Pro',
    priceINR: 4999,
    priceUSD: 59.99,
    currency: 'INR',
    description: 'One-time payment, lifetime access',
    features: [
      'Everything in Yearly',
      'Lifetime access',
      'All future features',
      'Priority support forever',
      'Best value!'
    ]
  }
}

// Get plan with correct currency
export const getPlanWithCurrency = (planId, currency = 'INR') => {
  const plan = paymentPlans[planId]
  if (!plan) return null

  return {
    ...plan,
    price: currency === 'USD' ? plan.priceUSD : plan.priceINR,
    currency: currency,
    displayPrice: currency === 'USD' 
      ? `$${plan.priceUSD}` 
      : `₹${plan.priceINR}`
  }
}

// Create Razorpay order
export const createRazorpayOrder = async (planId, userEmail, userName, currency = 'INR') => {
  const plan = getPlanWithCurrency(planId, currency)
  
  if (!plan) {
    throw new Error('Invalid plan selected')
  }

  // In production, call your backend API to create order
  // For now, returning mock order
  return {
    orderId: `order_${Date.now()}`,
    amount: plan.price * 100, // Convert to smallest unit (paise/cents)
    currency: plan.currency,
    planId: plan.id,
    planName: plan.name
  }
}

// Initialize Razorpay payment
export const initiateRazorpayPayment = async (planId, userEmail, userName, currency = 'INR') => {
  // Load Razorpay script
  const loaded = await loadRazorpay()
  
  if (!loaded) {
    alert('Razorpay SDK failed to load. Please check your internet connection.')
    return { success: false, error: 'SDK load failed' }
  }

  try {
    // Create order
    const order = await createRazorpayOrder(planId, userEmail, userName, currency)
    const plan = getPlanWithCurrency(planId, currency)

    // Razorpay options
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'CareerBoost AI',
      description: plan.description,
      image: 'https://your-logo-url.com/logo.png',
      order_id: order.orderId,
      prefill: {
        name: userName || '',
        email: userEmail || '',
      },
      theme: {
        color: '#9333ea'
      },
      handler: function (response) {
        return {
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature
        }
      },
      modal: {
        ondismiss: function() {
          return { success: false, error: 'Payment cancelled' }
        }
      }
    }

    // Open Razorpay checkout
    const razorpay = new window.Razorpay(options)
    
    return new Promise((resolve) => {
      razorpay.on('payment.success', function (response) {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          planId: planId,
          currency: currency
        })
      })

      razorpay.on('payment.error', function (response) {
        resolve({
          success: false,
          error: response.error.description
        })
      })

      razorpay.open()
    })

  } catch (error) {
    console.error('Payment error:', error)
    return { success: false, error: error.message }
  }
}

// Verify payment (call your backend)
export const verifyRazorpayPayment = async (paymentId, orderId, signature) => {
  // In production, verify signature on backend
  return {
    verified: true,
    paymentId,
    orderId
  }
}