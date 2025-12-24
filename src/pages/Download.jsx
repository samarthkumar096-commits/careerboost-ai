import { Download, Smartphone, CheckCircle, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

export default function DownloadPage() {
  const navigate = useNavigate()

  const handleDownload = () => {
    // Replace with your actual APK URL
    const apkUrl = 'https://github.com/samarthkumar096-commits/careerboost-ai/releases/download/v1.0/CareerBoost.apk'
    window.open(apkUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Download CareerBoost AI</h1>
          <p className="text-xl text-gray-600">
            Get the Android app and build resumes on the go!
          </p>
        </div>

        {/* Download Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">CareerBoost AI</h2>
              <p className="text-gray-600">Version 1.0.0 • 5.2 MB</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">FREE</div>
              <p className="text-sm text-gray-500">No ads, no limits</p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Download className="w-6 h-6" />
            Download APK (5.2 MB)
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            For Android 6.0 and above
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
            <p className="text-gray-600 text-sm">
              Generate professional resumes with AI optimization
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">ATS Checker</h3>
            <p className="text-gray-600 text-sm">
              Check resume compatibility with applicant tracking systems
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Offline Mode</h3>
            <p className="text-gray-600 text-sm">
              Work on your resume even without internet connection
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Free Forever</h3>
            <p className="text-gray-600 text-sm">
              No hidden costs, no subscriptions, completely free
            </p>
          </div>
        </div>

        {/* Installation Guide */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Installation Guide
          </h3>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="font-semibold text-purple-600">1.</span>
              <span>Download the APK file by clicking the button above</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-purple-600">2.</span>
              <span>Open the downloaded file from your notifications or Downloads folder</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-purple-600">3.</span>
              <span>If prompted, enable "Install from Unknown Sources" in Settings</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-purple-600">4.</span>
              <span>Tap "Install" and wait for the installation to complete</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-purple-600">5.</span>
              <span>Open the app and start building your resume!</span>
            </li>
          </ol>
        </div>

        {/* Security Note */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-lg mb-2 text-yellow-800">
            ⚠️ Security Note
          </h3>
          <p className="text-sm text-yellow-700">
            This APK is not available on Google Play Store. Make sure you download it only from this official website. 
            We recommend scanning the APK with an antivirus before installation.
          </p>
        </div>

        {/* Alternative Options */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Alternative Options</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Use Web Version</p>
                <p className="text-sm text-gray-600">Access from any browser</p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Open Web App
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Add to Home Screen (PWA)</p>
                <p className="text-sm text-gray-600">Install as Progressive Web App</p>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => {
                  if ('serviceWorker' in navigator) {
                    alert('Open this site in Chrome, tap menu (⋮), then "Add to Home Screen"')
                  }
                }}
              >
                Learn How
              </button>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-2">Need help?</p>
          <a
            href="https://github.com/samarthkumar096-commits/careerboost-ai/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Contact Support →
          </a>
        </div>
      </div>

      <Navigation />
    </div>
  )
}