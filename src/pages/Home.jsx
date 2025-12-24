import { FileText, Mail, Award, Sparkles, Crown, Smartphone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

export default function Home() {
  const navigate = useNavigate()

  const features = [
    {
      icon: FileText,
      title: 'Create Resume',
      description: 'Build ATS-friendly resumes with AI',
      onClick: () => navigate('/resume')
    },
    {
      icon: Mail,
      title: 'Cover Letter',
      description: 'Generate professional cover letters',
      onClick: () => {}
    },
    {
      icon: Award,
      title: 'ATS Score',
      description: 'Check your resume compatibility',
      onClick: () => navigate('/ats-score')
    },
    {
      icon: Sparkles,
      title: 'AI Optimizer',
      description: 'Enhance your resume with AI tips',
      onClick: () => {}
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CareerBoost AI</h1>
            <p className="text-gray-600">Your AI Career Partner</p>
          </div>
          <button 
            onClick={() => navigate('/download')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Download App</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-4xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600 text-sm">Resumes</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-4xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600 text-sm">Cover Letters</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-yellow-600 mb-2">--</div>
            <div className="text-gray-600 text-sm">ATS Score</div>
          </div>
        </div>

        {/* Download Banner (Mobile Only) */}
        <div 
          onClick={() => navigate('/download')}
          className="md:hidden bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 mb-8 text-white flex items-center justify-between cursor-pointer hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-3">
            <Smartphone className="w-8 h-8" />
            <div>
              <h3 className="font-semibold text-lg">Get Android App</h3>
              <p className="text-sm opacity-90">Build resumes on the go!</p>
            </div>
          </div>
          <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            →
          </button>
        </div>

        {/* Pro Banner */}
        <div 
          onClick={() => navigate('/pricing')}
          className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 mb-8 text-white flex items-center justify-between cursor-pointer hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8" />
            <div>
              <h3 className="font-semibold text-lg">Upgrade to Pro</h3>
              <p className="text-sm opacity-90">Unlimited AI generations & premium templates</p>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            →
          </button>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xl font-semibold mb-4">What would you like to create?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={feature.onClick}
                className="bg-white rounded-xl p-6 text-left hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-purple-300"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-8 text-center mb-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Recent Activity</h3>
          <p className="text-gray-600">No documents yet. Create your first resume to get started!</p>
        </div>
      </div>

      <Navigation />
    </div>
  )
}