import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

export default function Resume() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-8">Create Resume</h1>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <p className="text-gray-600 text-center">Resume builder coming soon...</p>
        </div>
      </div>

      <Navigation />
    </div>
  )
}