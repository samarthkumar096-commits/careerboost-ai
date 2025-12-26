# 🚀 BUILD APK - 3 COMMANDS

## Method 1: EAS Build (Cloud) ⭐ EASIEST
```bash
cd mobile-native
npm install
npx eas-cli build --platform android --profile preview
```

## Method 2: Local Build
```bash
cd mobile-native
npm install
npx expo prebuild
cd android
./gradlew assembleRelease
```

## Method 3: One Command
```bash
chmod +x build-apk.sh
./build-apk.sh
```

---

## Download APK:
- EAS: https://expo.dev/accounts/YOUR_ACCOUNT/projects/careerboost-ai-mobile/builds
- Local: `mobile-native/android/app/build/outputs/apk/release/app-release.apk`
