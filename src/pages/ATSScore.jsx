import { ArrowLeft, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

export default function ATSScore() {
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

        <h1 className="text-3xl font-bold mb-8">ATS Score Checker</h1>

        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-3">Upload Your Resume</h2>
          <p className="text-gray-600 mb-6">Check how well your resume matches ATS requirements</p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
            Choose File
          </button>
        </div>
      </div>

      <Navigation />
    </div>
  )
}