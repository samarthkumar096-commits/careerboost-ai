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

// Payment plans
export const paymentPlans = {
  monthly: {
    id: 'monthly',
    name: 'Pro Monthly',
    price: 299, // ₹299/month
    currency: 'INR',
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
    price: 2999, // ₹2999/year (Save ₹588!)
    currency: 'INR',
    description: 'Yearly subscription (Save 17%)',
    features: [
      'Everything in Monthly',
      'Save ₹588 per year',
      'Early access to new features',
      'Dedicated support',
      'Lifetime updates'
    ]
  },
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime Pro',
    price: 4999, // ₹4999 one-time
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

// Create Razorpay order
export const createRazorpayOrder = async (planId, userEmail, userName) => {
  const plan = paymentPlans[planId]
  
  if (!plan) {
    throw new Error('Invalid plan selected')
  }

  // In production, call your backend API to create order
  // For now, returning mock order
  return {
    orderId: `order_${Date.now()}`,
    amount: plan.price * 100, // Convert to paise
    currency: plan.currency,
    planId: plan.id,
    planName: plan.name
  }
}

// Initialize Razorpay payment
export const initiateRazorpayPayment = async (planId, userEmail, userName) => {
  // Load Razorpay script
  const loaded = await loadRazorpay()
  
  if (!loaded) {
    alert('Razorpay SDK failed to load. Please check your internet connection.')
    return { success: false, error: 'SDK load failed' }
  }

  try {
    // Create order
    const order = await createRazorpayOrder(planId, userEmail, userName)
    const plan = paymentPlans[planId]

    // Razorpay options
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'CareerBoost AI',
      description: plan.description,
      image: 'https://your-logo-url.com/logo.png', // Add your logo
      order_id: order.orderId,
      prefill: {
        name: userName || '',
        email: userEmail || '',
      },
      theme: {
        color: '#9333ea' // Purple theme
      },
      handler: function (response) {
        // Payment successful
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
          planId: planId
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
  // For now, returning success
  return {
    verified: true,
    paymentId,
    orderId
  }
}