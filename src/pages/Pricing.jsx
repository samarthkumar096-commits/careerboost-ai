import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Check, Crown, Zap, ArrowLeft, Loader2 } from 'lucide-react'
import { paymentPlans, initiateRazorpayPayment } from '../lib/razorpay'

export default function Pricing() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(null)

  const handlePayment = async (planId) => {
    if (!user) {
      alert('Please login first!')
      navigate('/login')
      return
    }

    setLoading(planId)

    try {
      const result = await initiateRazorpayPayment(
        planId,
        user.email,
        user.user_metadata?.full_name || user.email
      )

      if (result.success) {
        alert('🎉 Payment successful! Welcome to Pro!')
        // Here you would update user's subscription status
        navigate('/')
      } else {
        alert(`Payment failed: ${result.error}`)
      }
    } catch (error) {
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      ...paymentPlans.monthly,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      ...paymentPlans.yearly,
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      popular: true,
      badge: 'SAVE 17%'
    },
    {
      ...paymentPlans.lifetime,
      icon: Crown,
      color: 'from-orange-500 to-red-500',
      popular: false,
      badge: 'BEST VALUE'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Unlock unlimited AI-powered resume building
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                plan.popular ? 'ring-4 ring-purple-500 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mb-6`}>
                <plan.icon className="w-8 h-8 text-white" />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-600">
                    {plan.id === 'monthly' ? '/month' : plan.id === 'yearly' ? '/year' : 'one-time'}
                  </span>
                </div>
                {plan.id === 'yearly' && (
                  <p className="text-sm text-green-600 mt-2">Save ₹588 per year!</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handlePayment(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {loading === plan.id ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Get Started'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Accepted Payment Methods</h3>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <div className="text-center">
              <div className="text-3xl mb-2">💳</div>
              <p className="text-sm text-gray-600">Credit/Debit Cards</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-sm text-gray-600">UPI</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏦</div>
              <p className="text-sm text-gray-600">Net Banking</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👛</div>
              <p className="text-sm text-gray-600">Wallets</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌍</div>
              <p className="text-sm text-gray-600">International Cards</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Powered by Razorpay - Secure & Trusted
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600">Yes! You can cancel your subscription anytime. No questions asked.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600">Yes, we offer a 7-day money-back guarantee if you're not satisfied.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is payment secure?</h4>
              <p className="text-gray-600">Absolutely! We use Razorpay, which is PCI DSS compliant and trusted by millions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Can I upgrade/downgrade later?</h4>
              <p className="text-gray-600">Yes, you can change your plan anytime from your account settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}