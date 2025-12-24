import { CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Success() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful! 🎉</h1>
        <p className="text-gray-600 mb-8">
          Thank you for upgrading to Pro! You now have access to all premium features.
        </p>

        <div className="space-y-3">
          <button 
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            Go to Dashboard
          </button>
          <p className="text-sm text-gray-500">Redirecting in 5 seconds...</p>
        </div>
      </div>
    </div>
  )
}