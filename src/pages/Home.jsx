import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  FileText, Target, Download, Sparkles, Crown, LogOut, User, 
  Zap, CheckCircle, Star, TrendingUp, Clock, Shield, Award,
  ArrowRight, Play, Users, Briefcase
} from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Resume Builder',
      description: 'Smart AI writes professional content tailored to your experience in seconds',
      color: 'from-purple-500 to-pink-500',
      link: '/resume-builder'
    },
    {
      icon: Target,
      title: 'ATS Score Checker',
      description: 'Pass 95% of ATS systems with our advanced optimization technology',
      color: 'from-blue-500 to-cyan-500',
      link: '/ats-checker'
    },
    {
      icon: Download,
      title: 'Professional Templates',
      description: '10+ recruiter-tested templates designed for maximum impact',
      color: 'from-green-500 to-emerald-500',
      link: '/resume-builder'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Resumes Created', icon: FileText },
    { number: '95%', label: 'ATS Pass Rate', icon: Target },
    { number: '3X', label: 'More Interviews', icon: TrendingUp },
    { number: '5 Min', label: 'Average Time', icon: Clock }
  ]

  const benefits = [
    'No credit card required',
    'ATS-optimized templates',
    '5-minute setup',
    'Free forever plan'
  ]

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Software Engineer',
      company: 'IIT Delhi',
      text: 'Got 5 interview calls in 2 weeks! The ATS optimization really works.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Priya Patel',
      role: 'Product Manager',
      company: 'NIT Trichy',
      text: 'Best resume builder for Indian job market. Simple and effective!',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Arjun Mehta',
      role: 'Data Analyst',
      company: 'BITS Pilani',
      text: 'The AI suggestions helped me highlight my achievements perfectly.',
      rating: 5,
      avatar: '👨‍🔬'
    }
  ]

  const howItWorks = [
    {
      step: '1',
      title: 'Fill Your Details',
      description: 'Enter your information in our simple form',
      icon: FileText
    },
    {
      step: '2',
      title: 'AI Magic',
      description: 'Our AI optimizes and formats your resume',
      icon: Sparkles
    },
    {
      step: '3',
      title: 'Download & Apply',
      description: 'Get your professional resume instantly',
      icon: Download
    }
  ]

  const companyLogos = [
    { name: 'Google', used: 'Used by students from' },
    { name: 'Microsoft', used: 'Hired at' },
    { name: 'Amazon', used: 'Hired at' },
    { name: 'TCS', used: 'Hired at' },
    { name: 'Infosys', used: 'Hired at' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CareerBoost AI</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => navigate('/resume-builder')}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Resume Builder
              </button>
              <button 
                onClick={() => navigate('/ats-checker')}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                ATS Checker
              </button>
              <button 
                onClick={() => navigate('/pricing')}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Pricing
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden md:inline">Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-8 animate-pulse">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Trusted by 10,000+ Job Seekers</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Get 3X More Interview Calls
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                in 7 Days
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 leading-relaxed">
              AI-Powered Resume Builder Trusted by Students from IIT, NIT, BITS
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => navigate('/resume-builder')}
                className="group px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Create My Resume - Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              
              <button
                onClick={() => navigate('/ats-checker')}
                className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-300 flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" />
                Check ATS Score
              </button>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-600">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gray-50 border-y border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-blue-600 mr-2" />
                  <p className="text-3xl md:text-4xl font-bold text-gray-900">{stat.number}</p>
                </div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium mb-8">
            Our users have been hired at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {companyLogos.map((company, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition">
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional tools designed to help you stand out from the competition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.link)}
                className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  Learn more
                  <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Create Your Resume in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Professional resume in just 5 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"></div>
            
            {howItWorks.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-3xl font-bold mb-6 shadow-lg">
                  {step.step}
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                  <step.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/resume-builder')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg inline-flex items-center gap-2"
            >
              Start Building Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Job Seekers Across India
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why DeepSeek AI */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Zap className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powered by DeepSeek AI
            </h2>
            <p className="text-xl opacity-90">
              The most advanced AI for resume building
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <Zap className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
              <p className="opacity-90 leading-relaxed">Generate professional resumes in seconds, not minutes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <Target className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">More Accurate</h3>
              <p className="opacity-90 leading-relaxed">Better keyword matching and ATS optimization than competitors</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Proven Results</h3>
              <p className="opacity-90 leading-relaxed">95% ATS pass rate and 3X more interview calls</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join 10,000+ job seekers who got hired faster with CareerBoost AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => navigate('/resume-builder')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg text-lg inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Start Building - It's Free
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-300 text-lg"
            >
              View Pricing
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            No credit card required • Free forever plan • 5-minute setup
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">CareerBoost AI</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                AI-powered resume builder helping job seekers land their dream jobs faster. 
                Trusted by 10,000+ professionals across India.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Powered by DeepSeek AI</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => navigate('/resume-builder')} className="hover:text-white transition">
                    Resume Builder
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/ats-checker')} className="hover:text-white transition">
                    ATS Checker
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/pricing')} className="hover:text-white transition">
                    Pricing
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white transition">About Us</button>
                </li>
                <li>
                  <button className="hover:text-white transition">Contact</button>
                </li>
                <li>
                  <button className="hover:text-white transition">Privacy Policy</button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 CareerBoost AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button className="hover:text-white transition">Terms</button>
              <button className="hover:text-white transition">Privacy</button>
              <button className="hover:text-white transition">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}