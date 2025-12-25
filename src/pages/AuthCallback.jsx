import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    // Handle the OAuth callback
    const handleCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          alert('❌ Authentication failed: ' + error.message)
          navigate('/login')
          return
        }

        if (data?.session) {
          console.log('✅ Authentication successful!', data.session.user)
          alert('✅ Login successful! Welcome ' + (data.session.user.user_metadata?.full_name || data.session.user.email))
          navigate('/')
        } else {
          console.log('No session found, redirecting to login')
          navigate('/login')
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error)
        alert('❌ An unexpected error occurred')
        navigate('/login')
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Completing Sign In...
        </h2>
        <p className="text-gray-600">
          Please wait while we authenticate you
        </p>
      </div>
    </div>
  )
}
