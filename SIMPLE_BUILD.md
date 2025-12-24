# 📱 Simple APK Build - One Command!

## 🎯 Easiest Way to Build APK:

### **Option 1: Automated Script (Recommended)**

```bash
# Make script executable
chmod +x android-setup.sh

# Run it!
./android-setup.sh
```

This will:
1. ✅ Install all dependencies
2. ✅ Build web app
3. ✅ Setup Android project
4. ✅ Open Android Studio
5. ✅ Ready to build APK!

---

### **Option 2: Manual Commands**

```bash
# 1. Install
npm install

# 2. Build
npm run build

# 3. Add Android
npx cap add android

# 4. Sync
npx cap sync android

# 5. Open Android Studio
npx cap open android
```

Then in Android Studio:
- **Build → Build APK(s)**

---

### **Option 3: Command Line Only (No Android Studio)**

```bash
# Setup
npm install
npm run build
npx cap add android
npx cap sync android

# Build APK
cd android
./gradlew assembleDebug
```

**APK Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📦 After Building:

### **1. Find Your APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### **2. Rename It:**
```bash
cp android/app/build/outputs/apk/debug/app-debug.apk CareerBoost-v1.0.apk
```

### **3. Upload to GitHub Releases:**

1. Go to: https://github.com/samarthkumar096-commits/careerboost-ai/releases/new
2. Tag: `v1.0.0`
3. Title: `CareerBoost AI v1.0 - Android App`
4. Description:
```markdown
## 📱 CareerBoost AI - Android App

### Features:
- ✅ AI Resume Builder
- ✅ ATS Score Checker
- ✅ Cover Letter Generator
- ✅ Offline Support

### Installation:
1. Download APK below
2. Enable "Install from Unknown Sources"
3. Install and enjoy!

### Requirements:
- Android 6.0 or higher
- 50 MB free space
```
5. Upload `CareerBoost-v1.0.apk`
6. Publish!

### **4. Get Download Link:**
```
https://github.com/samarthkumar096-commits/careerboost-ai/releases/download/v1.0.0/CareerBoost-v1.0.apk
```

---

## 🎉 That's It!

**Your APK is ready to share!**

Users can download from:
- GitHub Releases
- Your website's `/download` page
- Direct link

---

## 🆘 Troubleshooting:

**Script fails?**
```bash
# Try manual commands
npm install
npm run build
npx cap add android
npx cap sync android
```

**Gradle fails?**
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

**Need Java?**
- Install Java 11 or higher
- Set JAVA_HOME environment variable

---

## 📞 Need Help?

Check `BUILD_APK_STEPS.md` for detailed instructions!

**Happy Building!** 🚀