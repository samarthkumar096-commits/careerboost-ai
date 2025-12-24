# 📱 Build Android APK - Step by Step

## ✅ Prerequisites Installed:
- ✅ Capacitor configured
- ✅ Android build scripts added
- ✅ App configuration ready

---

## 🚀 Build APK in 5 Minutes:

### **Step 1: Install Dependencies**

```bash
cd careerboost-ai
npm install
```

This will install Capacitor and all Android dependencies.

---

### **Step 2: Build Web App**

```bash
npm run build
```

This creates optimized production build in `dist/` folder.

---

### **Step 3: Initialize Capacitor (First Time Only)**

```bash
npx cap init "CareerBoost AI" "com.careerboost.ai"
```

---

### **Step 4: Add Android Platform**

```bash
npx cap add android
```

This creates `android/` folder with Android project.

---

### **Step 5: Sync Web Build to Android**

```bash
npx cap sync android
```

This copies your web app to Android project.

---

### **Step 6: Open in Android Studio**

```bash
npx cap open android
```

**OR use the npm script:**
```bash
npm run android:build
```

This will:
1. Build web app
2. Sync to Android
3. Open Android Studio

---

### **Step 7: Build APK in Android Studio**

1. **Wait for Gradle sync** (first time takes 5-10 minutes)
2. **Build Menu** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. **Wait for build** (2-3 minutes)
4. **Click "locate"** when build finishes

**APK Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🎯 Quick Build Script (All in One):

```bash
# Run this single command:
npm run build && npx cap sync android && npx cap open android
```

Then in Android Studio: **Build → Build APK(s)**

---

## 📦 Alternative: Build Without Android Studio

### **Using Gradle Command Line:**

```bash
cd android
./gradlew assembleDebug
```

**APK will be at:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔐 Build Signed APK (For Production):

### **Step 1: Generate Keystore**

```bash
keytool -genkey -v -keystore careerboost.keystore -alias careerboost -keyalg RSA -keysize 2048 -validity 10000
```

### **Step 2: Update capacitor.config.json**

```json
{
  "android": {
    "buildOptions": {
      "keystorePath": "careerboost.keystore",
      "keystorePassword": "YOUR_PASSWORD",
      "keystoreAlias": "careerboost",
      "keystoreAliasPassword": "YOUR_PASSWORD"
    }
  }
}
```

### **Step 3: Build Release APK**

```bash
cd android
./gradlew assembleRelease
```

**Signed APK at:**
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🌐 Upload APK for Download:

### **Option 1: GitHub Releases**

1. Go to: https://github.com/samarthkumar096-commits/careerboost-ai/releases/new
2. Tag: `v1.0.0`
3. Title: `CareerBoost AI v1.0 - Android App`
4. Upload `app-debug.apk` or `app-release.apk`
5. Publish release

**Download URL:**
```
https://github.com/samarthkumar096-commits/careerboost-ai/releases/download/v1.0.0/CareerBoost.apk
```

### **Option 2: Netlify Drop**

1. Go to: https://app.netlify.com/drop
2. Drag APK file
3. Get instant link!

### **Option 3: Google Drive**

1. Upload APK to Drive
2. Right-click → Share → Anyone with link
3. Copy link

---

## 🎨 Customize App Icon & Splash Screen:

### **App Icon:**

1. Create 1024x1024 PNG icon
2. Go to: https://icon.kitchen/
3. Upload icon
4. Download Android assets
5. Replace files in `android/app/src/main/res/`

### **Splash Screen:**

Edit `android/app/src/main/res/values/styles.xml`

---

## 📱 Test APK:

### **On Physical Device:**

1. Enable "Developer Options"
2. Enable "USB Debugging"
3. Connect phone to computer
4. Run: `npx cap run android`

### **On Emulator:**

1. Open Android Studio
2. Tools → Device Manager
3. Create Virtual Device
4. Run app

---

## ✅ Verification Checklist:

- [ ] Web app builds successfully (`npm run build`)
- [ ] Capacitor syncs without errors (`npx cap sync`)
- [ ] Android Studio opens project
- [ ] Gradle sync completes
- [ ] APK builds successfully
- [ ] APK installs on device
- [ ] App opens and works
- [ ] All features functional

---

## 🆘 Common Issues:

### **Gradle sync fails:**
```bash
cd android
./gradlew clean
./gradlew build
```

### **Build fails:**
- Check Java version: `java -version` (need Java 11+)
- Update Android SDK in Android Studio
- Clear cache: `./gradlew clean`

### **App crashes:**
- Check `android/app/src/main/AndroidManifest.xml`
- Add internet permission:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

---

## 🎉 You're Done!

**APK Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Upload to GitHub Releases and share the download link!**

---

## 📞 Need Help?

If you get stuck at any step, let me know! I'll help you debug.

**Happy Building!** 🚀📱