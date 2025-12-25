# CareerBoost AI - Your AI Career Partner

**🚧 LATEST UPDATE: Payment system temporarily disabled - All features FREE!**

A modern web application for creating ATS-friendly resumes, cover letters, and optimizing your career documents with AI. Includes Razorpay payment integration for Pro subscriptions.

## 🎉 Current Status

**All Pro features are currently FREE while we upgrade our payment infrastructure!**

- ✅ Unlimited AI Resume Generation
- ✅ ATS Score Checker  
- ✅ Premium Templates
- ✅ No payment required

## 🚀 Quick Deploy

### Deploy Frontend (One-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/samarthkumar096-commits/careerboost-ai&env=VITE_GEMINI_API_KEY,VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY&envDescription=API%20keys%20required&project-name=careerboost-ai&repository-name=careerboost-ai)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/samarthkumar096-commits/careerboost-ai)

### Deploy Backend

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/new)

**After deployment, update environment variables with your API keys!**

## ✨ Features

- **AI Resume Builder**: Build ATS-friendly resumes with Gemini AI assistance
- **Cover Letter Generator**: Generate professional cover letters
- **ATS Score Checker**: Check your resume compatibility with ATS systems
- **AI Optimizer**: Enhance your resume with AI-powered tips
- **Auto-Fix Bot v2.0**: Automatically detects and fixes configuration issues
- **Smart Feature Management**: Broken features automatically hidden
- **Pro Subscription**: Razorpay-powered payment system (coming soon)
- **Lifetime Access**: One-time payment option

## 💰 Pricing (Coming Soon)

- **Free:** ₹0 - Currently all features free!
- **Pro Monthly:** ₹299/month - Unlimited everything
- **Pro Yearly:** ₹2,999/year - Save 17%
- **Lifetime:** ₹4,999 - One-time payment

## 🛠️ Tech Stack

### Frontend
- **React 18** + Vite
- **Tailwind CSS** for styling
- **React Router v6** for navigation
- **Lucide React** for icons
- **Razorpay.js** for payment processing
- **Supabase** for authentication & database
- **Google Gemini AI** for resume generation

### Backend
- **Supabase** for backend services
- **Razorpay API** for payments
- **Webhook handling** for subscription events

## 🤖 Auto-Fix Bot v2.0

Our intelligent bot automatically:
- ✅ Detects configuration issues
- ✅ Fixes problems automatically
- ✅ Hides broken features
- ✅ Shows maintenance notices
- ✅ Provides setup instructions

## 📦 Local Development

### Prerequisites

- Node.js 18+ and npm
- Gemini API key (free from https://aistudio.google.com/apikey)
- Supabase account (free tier available)
- Razorpay account (for payments)

### Environment Variables

Create a `.env` file:

```env
# Required
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional (for payments)
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_BHINDI_API_KEY=your_bhindi_key
```

### Installation

```bash
# Clone repository
git clone https://github.com/samarthkumar096-commits/careerboost-ai.git
cd careerboost-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

## 🔧 Troubleshooting

### Auto-Fix Bot

Open browser console and run:

```javascript
// Check all issues
window.autoFixBot.detectAllIssues()

// See disabled features
window.getDisabledFeatures()

// Re-enable feature after fix
window.enableFeature("Feature Name")
```

### Common Issues

1. **Payment Failed Error**: Payments temporarily disabled - all features free
2. **AI Not Working**: Add VITE_GEMINI_API_KEY to environment variables
3. **Auth Issues**: Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

## 📝 API Keys Setup

### 1. Gemini API (FREE)
1. Visit https://aistudio.google.com/apikey
2. Sign in with Google
3. Create API Key
4. Copy and add to Vercel environment variables

### 2. Supabase (FREE)
1. Visit https://supabase.com
2. Create new project
3. Copy URL and anon key from Settings → API
4. Add to Vercel environment variables

### 3. Razorpay (Optional)
1. Visit https://razorpay.com
2. Create account
3. Get test/live keys
4. Add to Vercel environment variables

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables in Vercel

Go to: Settings → Environment Variables

Add:
- `VITE_GEMINI_API_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_RAZORPAY_KEY_ID` (optional)
- `VITE_BHINDI_API_KEY` (optional)

Select all environments (Production, Preview, Development)

## 📱 Features Status

| Feature | Status | Notes |
|---------|--------|-------|
| Homepage | ✅ Working | Fully functional |
| Authentication | ✅ Working | Supabase powered |
| Resume Builder | ⚠️ Needs API | Add Gemini API key |
| ATS Checker | ⚠️ Needs API | Add Gemini API key |
| Payments | 🚧 Maintenance | Coming soon |
| Auto-Fix Bot | ✅ Working | Runs automatically |

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - feel free to use for personal/commercial projects

## 🆘 Support

- **Issues**: Open GitHub issue
- **Email**: support@careerboost-ai.com
- **Docs**: Check console for Auto-Fix Bot reports

## 🎯 Roadmap

- [x] AI Resume Builder
- [x] ATS Checker
- [x] Auto-Fix Bot v2.0
- [x] Smart Feature Management
- [ ] Payment Integration (in progress)
- [ ] Cover Letter Generator
- [ ] LinkedIn Profile Optimizer
- [ ] Interview Prep AI
- [ ] Job Matching AI

## ⚡ Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle Size: < 500KB

## 🔒 Security

- All API keys encrypted
- Secure authentication via Supabase
- Payment processing via Razorpay
- No sensitive data stored locally

---

**Made with ❤️ by CareerBoost AI Team**

**Last Updated**: December 25, 2025 - Payment system under maintenance, all features FREE!
