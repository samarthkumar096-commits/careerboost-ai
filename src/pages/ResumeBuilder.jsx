import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, Download, Loader2, FileText } from 'lucide-react'
import { generateResume } from '../lib/gemini'

export default function ResumeBuilder() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [generatedResume, setGeneratedResume] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    additional: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setGeneratedResume('')

    try {
      const result = await generateResume(formData)
      
      if (result.success) {
        setGeneratedResume(result.text)
      } else {
        alert('Error generating resume: ' + result.error)
      }
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([generatedResume], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${formData.fullName.replace(/\s+/g, '_')}_Resume.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">AI-Powered</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Resume Builder
          </h1>
          <p className="text-xl text-gray-600">
            Create a professional, ATS-optimized resume in minutes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Your Information</h2>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Personal Details</h3>
                
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location (City, Country)"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              {/* Professional Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Professional Details</h3>
                
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Target Job Title *"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />

                <textarea
                  name="summary"
                  placeholder="Professional Summary (optional - AI will generate if empty)"
                  value={formData.summary}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />

                <textarea
                  name="experience"
                  placeholder="Work Experience (Company, Role, Duration, Achievements)"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />

                <textarea
                  name="education"
                  placeholder="Education (Degree, Institution, Year)"
                  value={formData.education}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />

                <textarea
                  name="skills"
                  placeholder="Skills (comma-separated)"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />

                <textarea
                  name="additional"
                  placeholder="Additional Information (Certifications, Projects, etc.)"
                  value={formData.additional}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Resume with AI
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Generated Resume */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Generated Resume</h2>
              {generatedResume && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p>AI is crafting your perfect resume...</p>
              </div>
            ) : generatedResume ? (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-200">
                  {generatedResume}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                <FileText className="w-16 h-16 mb-4" />
                <p className="text-center">
                  Fill in your information and click<br />
                  "Generate Resume with AI" to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold mb-2">AI-Powered</h3>
            <p className="text-gray-600 text-sm">
              Advanced AI creates professional, tailored resumes
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold mb-2">ATS-Optimized</h3>
            <p className="text-gray-600 text-sm">
              Formatted to pass Applicant Tracking Systems
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold mb-2">Instant Download</h3>
            <p className="text-gray-600 text-sm">
              Download your resume immediately in multiple formats
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}