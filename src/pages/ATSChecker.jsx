import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, Upload, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { checkATSScore } from '../lib/gemini'

export default function ATSChecker() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [results, setResults] = useState(null)

  const handleCheck = async (e) => {
    e.preventDefault()
    
    if (!resumeText || !jobDescription) {
      alert('Please provide both resume and job description')
      return
    }

    setLoading(true)
    setResults(null)

    try {
      const result = await checkATSScore(resumeText, jobDescription)
      
      if (result.success && result.data) {
        setResults(result.data)
      } else {
        alert('Error checking ATS score: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
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
            <span className="text-sm font-semibold">AI-Powered Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ATS Score Checker
          </h1>
          <p className="text-xl text-gray-600">
            Check how well your resume matches the job description
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleCheck} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3">
                Your Resume
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                required
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                required
                rows={10}
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
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Check ATS Score
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            {/* Score Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className={`${getScoreBg(results.overallScore)} rounded-2xl p-6 text-center`}>
                <p className="text-sm font-semibold text-gray-600 mb-2">Overall Score</p>
                <p className={`text-4xl font-bold ${getScoreColor(results.overallScore)}`}>
                  {results.overallScore}
                </p>
                <p className="text-xs text-gray-500 mt-1">out of 100</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <p className="text-sm font-semibold text-gray-600 mb-2">Keywords</p>
                <p className={`text-4xl font-bold ${getScoreColor(results.keywordScore)}`}>
                  {results.keywordScore}
                </p>
                <p className="text-xs text-gray-500 mt-1">Match Rate</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <p className="text-sm font-semibold text-gray-600 mb-2">Format</p>
                <p className={`text-4xl font-bold ${getScoreColor(results.formatScore)}`}>
                  {results.formatScore}
                </p>
                <p className="text-xs text-gray-500 mt-1">ATS Friendly</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <p className="text-sm font-semibold text-gray-600 mb-2">Content</p>
                <p className={`text-4xl font-bold ${getScoreColor(results.contentScore)}`}>
                  {results.contentScore}
                </p>
                <p className="text-xs text-gray-500 mt-1">Quality Score</p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {results.strengths?.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-bold">Areas to Improve</h3>
                </div>
                <ul className="space-y-2">
                  {results.weaknesses?.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Missing Keywords */}
            {results.missingKeywords && results.missingKeywords.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-bold">Missing Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.missingKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold">Improvement Suggestions</h3>
              </div>
              <ol className="space-y-3">
                {results.suggestions?.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold mb-2">AI Analysis</h3>
            <p className="text-gray-600 text-sm">
              Advanced AI compares your resume with job requirements
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold mb-2">Detailed Feedback</h3>
            <p className="text-gray-600 text-sm">
              Get specific suggestions to improve your resume
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold mb-2">Instant Results</h3>
            <p className="text-gray-600 text-sm">
              Get your ATS score and feedback in seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}