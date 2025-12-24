import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Pricing from './pages/Pricing'
import ResumeBuilder from './pages/ResumeBuilder'
import ATSChecker from './pages/ATSChecker'

function App() {
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
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App