import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import BhindiChat from './components/BhindiChat'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Pricing from './pages/Pricing'
import ResumeBuilder from './pages/ResumeBuilder'
import ATSChecker from './pages/ATSChecker'
import AuthCallback from './pages/AuthCallback'
import { useEffect } from 'react'

// Import Auto-Fix Bot
import autoFixBot from './lib/autoFixBot'

function App() {
  // Run Auto-Fix Bot on app load (only in development)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('🤖 Running Auto-Fix Bot...');
      autoFixBot.detectAllIssues().then(result => {
        if (result.status === 'healthy') {
          console.log('✅ All systems operational!');
        } else {
          console.log('⚠️  Issues detected. Check console for details.');
        }
      });
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/ats-checker" element={<ATSChecker />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
        
        {/* Bhindi AI Chat Widget - Available on all pages */}
        <BhindiChat />
      </Router>
    </AuthProvider>
  )
}

export default App
