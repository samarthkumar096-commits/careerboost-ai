# 🚀 DEPLOY TO VERCEL

## ✅ VERCEL DEPLOYMENT READY!

---

## 📦 **OPTION 1: Vercel CLI** (Command Line)

**Install Vercel CLI:**
```bash
npm install -g vercel
```

**Deploy:**
```bash
cd backend
vercel login
vercel --prod
```

**Follow prompts:**
```
? Set up and deploy "backend"? [Y/n] Y
? Which scope? Your account
? Link to existing project? [y/N] N
? What's your project's name? careerboost-api
? In which directory is your code located? ./
? Want to override the settings? [y/N] N
```

**Done! Get URL:**
```
✅ Production: https://careerboost-api.vercel.app
```

---

## 🌐 **OPTION 2: Vercel Dashboard** (Web UI) ⭐ EASIEST

**Steps:**
```
1. Go to: https://vercel.com/new

2. Import Git Repository:
   - Connect GitHub
   - Select: samarthkumar096-commits/careerboost-ai
   
3. Configure Project:
   - Project Name: careerboost-api
   - Framework Preset: Other
   - Root Directory: backend
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: npm install
   
4. Environment Variables:
   - Add: NODE_ENV = production
   - Add: PORT = 3000
   
5. Click "Deploy"

6. Wait 2-3 minutes

7. Done! Get URL:
   https://careerboost-api.vercel.app
```

---

## 🔧 **CONFIGURATION:**

**Files Added:**
```
✅ vercel.json (Vercel config)
✅ .vercelignore (Ignore files)
```

**vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

---

## 📡 **AFTER DEPLOYMENT:**

**Test API:**
```bash
# Health check
curl https://careerboost-api.vercel.app/health

# Search jobs
curl https://careerboost-api.vercel.app/api/jobs/search?query=developer

# Get tips
curl https://careerboost-api.vercel.app/api/tips
```

---

## 📱 **UPDATE ANDROID APP:**

**After deployment, update:**

```kotlin
// File: android-native/app/src/main/java/com/careerboostai/app/api/RetrofitClient.kt

// Change BASE_URL to your Vercel URL:
private const val BASE_URL = "https://careerboost-api.vercel.app/"
```

**Then:**
```
1. Sync Gradle
2. Build APK
3. Install on phone
4. Test all features!
```

---

## 🎯 **VERCEL FEATURES:**

**Free Tier:**
```
✅ Unlimited deployments
✅ Automatic HTTPS
✅ Global CDN
✅ Instant rollbacks
✅ Preview deployments
✅ Custom domains
✅ Analytics
```

**Limits:**
```
⚠️ 100 GB bandwidth/month
⚠️ 10 second execution limit
⚠️ 4.5 MB response size
```

---

## 🔗 **USEFUL LINKS:**

**Vercel Dashboard:**
```
https://vercel.com/dashboard
```

**Deployment Logs:**
```
https://vercel.com/your-username/careerboost-api
```

**Documentation:**
```
https://vercel.com/docs
```

---

## ⚡ **QUICK DEPLOY:**

**One Command:**
```bash
cd backend && vercel --prod
```

**Or use GitHub integration:**
```
Push to main → Auto deploy! 🚀
```

---

## 🎉 **SUMMARY:**

**Deployment Options:**
```
1. Vercel CLI (vercel --prod)
2. Vercel Dashboard (Web UI) ⭐
3. GitHub Integration (Auto)
```

**After Deploy:**
```
✅ Get Vercel URL
✅ Test all endpoints
✅ Update Android app
✅ Build APK
✅ Done! 🎉
```

---

**🚀 READY TO DEPLOY! 🚀**

**Use Vercel Dashboard for easiest deployment! 💪**

**Or run: cd backend && vercel --prod 🌐**
