import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FileText, Target, Download, Sparkles, Crown, LogOut, User } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const features = [
    {
      icon: FileText,
      title: 'AI Resume Builder',
      description: 'Create professional, ATS-optimized resumes in minutes with AI',
      color: 'from-purple-500 to-pink-500',
      link: '/resume-builder'
    },
    {
      icon: Target,
      title: 'ATS Score Checker',
      description: 'Check how well your resume matches job descriptions',
      color: 'from-blue-500 to-cyan-500',
      link: '/ats-checker'
    },
    {
      icon: Download,
      title: 'Multiple Formats',
      description: 'Download your resume in PDF, DOCX, and TXT formats',
      color: 'from-green-500 to-emerald-500',
      link: '/resume-builder'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold">CareerBoost AI</span>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 text-gray-700 hover:text-gray-900 font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Powered by Google Gemini AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Build Your Perfect Resume
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              With AI
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional, ATS-optimized resumes in minutes. 
            Get hired faster with AI-powered resume building and optimization.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/resume-builder')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Start Building Resume
            </button>
            
            <button
              onClick={() => navigate('/ats-checker')}
              className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-300"
            >
              Check ATS Score
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.link)}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition cursor-pointer group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white">
          <Crown className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Hired?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of job seekers who landed their dream jobs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Pricing
            </button>
            <button
              onClick={() => navigate('/resume-builder')}
              className="px-8 py-4 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition"
            >
              Try For Free
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600 mb-2">10K+</p>
            <p className="text-gray-600">Resumes Created</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">95%</p>
            <p className="text-gray-600">ATS Pass Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">5K+</p>
            <p className="text-gray-600">Happy Users</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-600 mb-2">24/7</p>
            <p className="text-gray-600">AI Support</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-bold">CareerBoost AI</span>
          </div>
          <p className="text-gray-400 mb-4">
            Powered by Google Gemini AI
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 CareerBoost AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}