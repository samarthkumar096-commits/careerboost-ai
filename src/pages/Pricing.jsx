import { ArrowLeft, Check, Crown, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navigation from '../components/Navigation'
import { pricingPlans, stripePromise, createCheckoutSession } from '../config/stripe'

export default function Pricing() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(null)

  const handleSubscribe = async (priceId, planName) => {
    if (!priceId) return
    
    setLoading(planName)
    try {
      const stripe = await stripePromise
      const session = await createCheckoutSession(priceId)
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        alert(result.error.message)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-600 text-lg">Unlock your career potential with AI-powered tools</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{pricingPlans.free.name}</h3>
              <div className="text-4xl font-bold mb-2">₹{pricingPlans.free.price}</div>
              <p className="text-gray-600">Forever free</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {pricingPlans.free.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition"
            >
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-xl border-2 border-purple-400 relative transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </span>
            </div>

            <div className="text-center mb-6 text-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-6 h-6" />
                <h3 className="text-2xl font-bold">{pricingPlans.pro.name}</h3>
              </div>
              <div className="text-4xl font-bold mb-2">₹{pricingPlans.pro.price}</div>
              <p className="text-purple-100">Per month</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {pricingPlans.pro.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-white">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleSubscribe(pricingPlans.pro.priceId, 'pro')}
              disabled={loading === 'pro'}
              className="w-full py-3 rounded-lg bg-white text-purple-600 font-semibold hover:bg-gray-100 transition disabled:opacity-50"
            >
              {loading === 'pro' ? 'Processing...' : 'Upgrade to Pro'}
            </button>
          </div>

          {/* Lifetime Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-yellow-400">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                <h3 className="text-2xl font-bold">{pricingPlans.lifetime.name}</h3>
              </div>
              <div className="text-4xl font-bold mb-2">₹{pricingPlans.lifetime.price}</div>
              <p className="text-gray-600">One-time payment</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {pricingPlans.lifetime.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleSubscribe(pricingPlans.lifetime.priceId, 'lifetime')}
              disabled={loading === 'lifetime'}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold hover:from-yellow-500 hover:to-orange-600 transition disabled:opacity-50"
            >
              {loading === 'lifetime' ? 'Processing...' : 'Get Lifetime Access'}
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your Pro subscription anytime. No questions asked.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, debit cards, and UPI through Stripe.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold mb-2">Is my payment information secure?</h3>
              <p className="text-gray-600">Yes! We use Stripe for payment processing, which is PCI compliant and highly secure.</p>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}