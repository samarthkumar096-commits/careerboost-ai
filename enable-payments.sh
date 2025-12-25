#!/bin/bash

# Enable Payments Script
# This script enables payment functionality in CareerBoost AI

echo "🚀 Enabling Payment System..."
echo ""

# Step 1: Update payment config
echo "📝 Step 1: Updating payment configuration..."
cat > src/config/payment.js << 'EOF'
// Payment Configuration
// Set to true to enable payments, false to show maintenance mode

export const PAYMENTS_ENABLED = true

// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'https://careerboost-backend.vercel.app'

// Razorpay Configuration
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_RvMV8TCAdy3ugd'
EOF

echo "✅ Payment config updated!"
echo ""

# Step 2: Check if backend URL is set
echo "📝 Step 2: Checking environment variables..."
if grep -q "VITE_API_URL" .env 2>/dev/null; then
    echo "✅ VITE_API_URL found in .env"
else
    echo "⚠️  VITE_API_URL not found in .env"
    echo "   Add this to your .env file:"
    echo "   VITE_API_URL=https://careerboost-backend.vercel.app"
fi

if grep -q "VITE_RAZORPAY_KEY_ID" .env 2>/dev/null; then
    echo "✅ VITE_RAZORPAY_KEY_ID found in .env"
else
    echo "⚠️  VITE_RAZORPAY_KEY_ID not found in .env"
    echo "   Add this to your .env file:"
    echo "   VITE_RAZORPAY_KEY_ID=rzp_test_RvMV8TCAdy3ugd"
fi

echo ""
echo "✅ Payment system enabled!"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy backend to Vercel"
echo "2. Add environment variables in Vercel dashboard"
echo "3. Redeploy frontend"
echo "4. Test payment flow"
echo ""
echo "📚 See VERCEL_PAYMENT_DEPLOY.md for detailed instructions"
