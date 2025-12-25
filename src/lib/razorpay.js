// Razorpay Integration for CareerBoost AI

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

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

// Create Razorpay order via backend
export const createRazorpayOrder = async (planId, userEmail, userName, currency = 'INR') => {
  const plan = getPlanWithCurrency(planId, currency)
  
  if (!plan) {
    throw new Error('Invalid plan selected')
  }

  try {
    const response = await fetch(`${API_URL}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: plan.price * 100, // Convert to smallest unit (paise/cents)
        currency: plan.currency,
        planId: plan.id,
        planName: plan.name,
        userEmail,
        userName,
      }),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Failed to create order')
    }

    return data
  } catch (error) {
    console.error('Order creation error:', error)
    throw error
  }
}

// Verify payment via backend
export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_URL}/api/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Payment verification failed')
    }

    return data
  } catch (error) {
    console.error('Payment verification error:', error)
    throw error
  }
}

// Initialize Razorpay payment
export const initiateRazorpayPayment = async (planId, userEmail, userName, currency = 'INR') => {
  // Load Razorpay script
  const loaded = await loadRazorpay()
  
  if (!loaded) {
    return { 
      success: false, 
      error: 'Razorpay SDK failed to load. Please check your internet connection.' 
    }
  }

  try {
    // Create order via backend
    const order = await createRazorpayOrder(planId, userEmail, userName, currency)
    const plan = getPlanWithCurrency(planId, currency)

    // Razorpay options
    const options = {
      key: order.key || RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'CareerBoost AI',
      description: plan.description,
      image: 'https://careerboost-ai.vercel.app/logo.png',
      order_id: order.orderId,
      prefill: {
        name: userName || '',
        email: userEmail || '',
      },
      theme: {
        color: '#9333ea'
      },
      handler: async function (response) {
        // Verify payment on backend
        try {
          const verificationResult = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            planId: planId,
            userEmail: userEmail,
          })

          return {
            success: true,
            ...verificationResult,
          }
        } catch (error) {
          return {
            success: false,
            error: error.message,
          }
        }
      },
      modal: {
        ondismiss: function() {
          return { success: false, error: 'Payment cancelled by user' }
        }
      }
    }

    // Open Razorpay checkout
    const razorpay = new window.Razorpay(options)
    
    return new Promise((resolve) => {
      razorpay.on('payment.success', async function (response) {
        try {
          const verificationResult = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            planId: planId,
            userEmail: userEmail,
          })

          resolve({
            success: true,
            ...verificationResult,
            planId: planId,
            currency: currency,
          })
        } catch (error) {
          resolve({
            success: false,
            error: error.message,
          })
        }
      })

      razorpay.on('payment.error', function (response) {
        resolve({
          success: false,
          error: response.error.description || 'Payment failed',
        })
      })

      razorpay.open()
    })

  } catch (error) {
    console.error('Payment error:', error)
    return { success: false, error: error.message }
  }
}
