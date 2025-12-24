import { User, Settings, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

export default function Profile() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>

        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">User Name</h2>
              <p className="text-gray-600">user@example.com</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-white rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Settings</span>
          </button>
          <button className="w-full bg-white rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition text-red-600">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      <Navigation />
    </div>
  )
}