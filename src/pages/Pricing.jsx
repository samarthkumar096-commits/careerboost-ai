import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Check, Crown, Zap, ArrowLeft, Loader2, Globe, AlertCircle } from 'lucide-react'
import { paymentPlans, getPlanWithCurrency } from '../lib/razorpay'
import FeatureGuard from '../components/FeatureGuard'

export default function Pricing() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(null)
  const [currency, setCurrency] = useState('INR')

  // TEMPORARILY DISABLED - Payment integration under maintenance
  const PAYMENTS_ENABLED = false

  const handlePayment = async (planId) => {
    if (!PAYMENTS_ENABLED) {
      alert('🚧 Payment system is temporarily under maintenance. Please try again later or contact support.')
      return
    }

    if (!user) {
      alert('Please login first!')
      navigate('/login')
      return
    }

    setLoading(planId)

    try {
      // Payment logic here (currently disabled)
      alert('Payment system under maintenance')
    } catch (error) {
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      ...getPlanWithCurrency('monthly', currency),
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      ...getPlanWithCurrency('yearly', currency),
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      popular: true,
      badge: 'SAVE 17%'
    },
    {
      ...getPlanWithCurrency('lifetime', currency),
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

        {/* Maintenance Notice */}
        {!PAYMENTS_ENABLED && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-yellow-900 mb-2">
                  🚧 Payment System Under Maintenance
                </h3>
                <p className="text-yellow-800 mb-3">
                  We're currently upgrading our payment infrastructure for a better experience. 
                  All features are available for free during this period!
                </p>
                <div className="bg-yellow-100 rounded-lg p-4">
                  <p className="text-yellow-900 font-semibold mb-2">
                    ✨ Good News: All Pro Features FREE Right Now!
                  </p>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>✅ Unlimited AI Resume Generation</li>
                    <li>✅ ATS Score Checker</li>
                    <li>✅ Premium Templates</li>
                    <li>✅ No payment required!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Unlock unlimited AI-powered resume building
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setCurrency('INR')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition ${
                currency === 'INR'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Globe className="w-4 h-4" />
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition ${
                currency === 'USD'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Globe className="w-4 h-4" />
              USD ($)
            </button>
          </div>
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
                  <span className="text-4xl font-bold">{plan.displayPrice}</span>
                  <span className="text-gray-600">
                    {plan.id === 'monthly' ? '/month' : plan.id === 'yearly' ? '/year' : 'one-time'}
                  </span>
                </div>
                {plan.id === 'yearly' && (
                  <p className="text-sm text-green-600 mt-2">
                    {currency === 'INR' ? 'Save ₹588 per year!' : 'Save $8 per year!'}
                  </p>
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
                disabled={!PAYMENTS_ENABLED || loading === plan.id}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {!PAYMENTS_ENABLED ? (
                  'Coming Soon'
                ) : loading === plan.id ? (
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

        {/* Free Access Notice */}
        {!PAYMENTS_ENABLED && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-8 mb-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-900 mb-3">
              All Features FREE During Maintenance!
            </h3>
            <p className="text-green-800 text-lg mb-4">
              Enjoy unlimited access to all Pro features while we upgrade our payment system.
            </p>
            <button
              onClick={() => navigate('/resume-builder')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Start Building Your Resume →
            </button>
          </div>
        )}

        {/* Currency Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-center">
          <p className="text-blue-800">
            <strong>💡 Tip:</strong> {currency === 'INR' 
              ? 'Indian users can pay via UPI, Cards, Net Banking, and Wallets' 
              : 'International users can pay via Credit/Debit cards (Visa, Mastercard, Amex)'}
          </p>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Accepted Payment Methods</h3>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {currency === 'INR' ? (
              <>
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
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-3xl mb-2">💳</div>
                  <p className="text-sm text-gray-600">Visa</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💳</div>
                  <p className="text-sm text-gray-600">Mastercard</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💳</div>
                  <p className="text-sm text-gray-600">Amex</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌍</div>
                  <p className="text-sm text-gray-600">International Cards</p>
                </div>
              </>
            )}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Powered by Razorpay - Secure & Trusted
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-2">When will payments be available?</h4>
              <p className="text-gray-600">We're working on upgrading our payment system. Meanwhile, enjoy all features for free!</p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-2">Is my data safe?</h4>
              <p className="text-gray-600">Yes! All your data is encrypted and stored securely on Supabase.</p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600">Yes, you can cancel your subscription anytime. No questions asked.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600">Yes, we offer a 7-day money-back guarantee if you're not satisfied.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
