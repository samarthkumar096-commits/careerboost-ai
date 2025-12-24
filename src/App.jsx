import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resume from './pages/Resume'
import ATSScore from './pages/ATSScore'
import Pricing from './pages/Pricing'
import Download from './pages/Download'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/ats-score" element={<ATSScore />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </Router>
  )
}

export default App