# Android Studio Build Guide

## 🚀 Complete Local Build Setup

### Prerequisites:
1. Android Studio (latest version)
2. Node.js 18+
3. Java JDK 17
4. Android SDK

---

## 📦 Step 1: Install Requirements

### Install Android Studio:
```
Download from: https://developer.android.com/studio
Install with default settings
```

### Install Node.js:
```
Download from: https://nodejs.org
Version: 18 or higher
```

### Install Java JDK:
```
Download: https://adoptium.net
Version: 17 (Temurin)
```

---

## 🔧 Step 2: Setup Project

### Clone Repository:
```bash
git clone https://github.com/samarthkumar096-commits/careerboost-ai.git
cd careerboost-ai/mobile-native
```

### Install Dependencies:
```bash
npm install
```

### Install Expo CLI:
```bash
npm install -g expo-cli
```

---

## 🏗️ Step 3: Generate Android Project

### Run Expo Prebuild:
```bash
npx expo prebuild --platform android --clean
```

This creates:
- `android/` folder
- Native Android project
- Gradle files
- All configurations

---

## 📱 Step 4: Open in Android Studio

### Open Project:
```
1. Open Android Studio
2. File → Open
3. Navigate to: careerboost-ai/mobile-native/android
4. Click "OK"
5. Wait for Gradle sync
```

### First Time Setup:
```
1. Accept SDK licenses
2. Download required SDK versions
3. Install build tools
4. Sync Gradle
```

---

## 🔨 Step 5: Build APK

### Method 1: Android Studio UI
```
1. Build → Build Bundle(s) / APK(s)
2. Build APK
3. Wait 5-10 minutes
4. Click "locate" when done
5. APK ready!
```

### Method 2: Command Line
```bash
cd android
./gradlew assembleRelease
```

### Method 3: Debug Build (Faster)
```bash
cd android
./gradlew assembleDebug
```

---

## 📥 APK Location

### Release APK:
```
mobile-native/android/app/build/outputs/apk/release/app-release.apk
```

### Debug APK:
```
mobile-native/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🎯 Build Variants

### Debug Build:
```
- Faster build (2-5 min)
- Larger size (~30 MB)
- Debug symbols included
- For testing
```

### Release Build:
```
- Slower build (5-10 min)
- Smaller size (~25 MB)
- Optimized
- For distribution
```

---

## 🔧 Troubleshooting

### Gradle Sync Failed:
```bash
cd android
./gradlew clean
./gradlew build --refresh-dependencies
```

### SDK Not Found:
```
1. Tools → SDK Manager
2. Install Android 13 (API 33)
3. Install Build Tools 33.0.0
4. Apply changes
```

### Build Failed:
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleRelease --stacktrace
```

---

## ⚡ Quick Build Commands

### Clean Build:
```bash
cd mobile-native/android
./gradlew clean assembleRelease
```

### Debug Build:
```bash
./gradlew assembleDebug
```

### Install on Device:
```bash
./gradlew installRelease
```

### Build + Install:
```bash
./gradlew assembleRelease installRelease
```

---

## 📱 Test on Device

### Via USB:
```
1. Enable USB Debugging on phone
2. Connect phone to computer
3. Run: adb devices
4. Install APK: adb install app-release.apk
```

### Via Android Studio:
```
1. Connect phone
2. Click "Run" (green play button)
3. Select device
4. App installs and runs
```

---

## 🎨 Customize Before Build

### Change App Name:
```
File: android/app/src/main/res/values/strings.xml
<string name="app_name">CareerBoost AI</string>
```

### Change Package Name:
```
File: android/app/build.gradle
applicationId "com.careerboostai.app"
```

### Change Version:
```
File: android/app/build.gradle
versionCode 1
versionName "1.0.0"
```

---

## 🔥 Advantages

### Local Build:
```
✅ Full control
✅ Instant feedback
✅ Easy debugging
✅ No cloud limits
✅ Offline capable
✅ Professional workflow
```

### Android Studio:
```
✅ Visual editor
✅ Code completion
✅ Built-in emulator
✅ Profiling tools
✅ Layout inspector
✅ Logcat viewer
```

---

## 📊 Build Times

### First Build:
```
- Download dependencies: 5-10 min
- Gradle sync: 2-3 min
- Build: 5-10 min
Total: 15-20 min
```

### Subsequent Builds:
```
- Gradle sync: 30 sec
- Build: 2-5 min
Total: 3-5 min
```

---

## 🎯 Recommended Workflow

### Development:
```
1. Make changes in code
2. Build debug APK (fast)
3. Test on device/emulator
4. Iterate quickly
```

### Production:
```
1. Final code ready
2. Build release APK
3. Test thoroughly
4. Sign APK
5. Distribute
```

---

## 💪 Why This is Best

### Complete Control:
```
✅ See all code
✅ Modify anything
✅ Debug easily
✅ Optimize performance
✅ Add native features
✅ Professional setup
```

### No Dependencies:
```
✅ No cloud services
✅ No API limits
✅ No waiting
✅ Build anytime
✅ Offline capable
```

---

## 🚀 Next Steps

After successful build:
1. Test APK on device
2. Check all features
3. Optimize if needed
4. Sign for Play Store
5. Distribute!

---

## 📞 Support

### Android Studio Issues:
- Check Gradle logs
- Update Android Studio
- Sync project with Gradle files
- Invalidate caches and restart

### Build Issues:
- Clean project
- Rebuild
- Check SDK versions
- Update dependencies

---

**Happy Building! 🎉**
