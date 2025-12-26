# 🚀 EAS BUILD SETUP - STEP BY STEP

## ⚠️ ERROR FIX:

**Current Errors:**
```
❌ "extra.eas.projectId" field is missing (dummy ID hai)
❌ Need real project ID from EAS
```

---

## ✅ SOLUTION - 2 STEPS:

### **STEP 1: Create EAS Project (Terminal)**

```bash
cd mobile-native
npx eas-cli login
npx eas-cli build:configure
```

**Ye automatically:**
```
✅ Real projectId generate karega
✅ app.json update karega
✅ EAS project create karega
```

---

### **STEP 2: Build APK**

```bash
npx eas-cli build --platform android --profile preview
```

---

## 🎯 COMPLETE COMMANDS:

```bash
# Navigate to project
cd careerboost-ai/mobile-native

# Install EAS CLI (if not installed)
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS (creates real projectId)
eas build:configure

# Build APK
eas build --platform android --profile preview
```

---

## 📧 LOGIN DETAILS:

**Use your email:**
```
Email: kumarsamarth982@gmail.com
```

**If no Expo account:**
```
→ Create account during login
→ Free account
→ No credit card needed
```

---

## ⏱️ TIME:

```
Setup: 2 minutes
Build: 10-15 minutes
Total: ~15 minutes
```

---

## 📥 DOWNLOAD APK:

**After build completes:**
```
1. Email notification with link
2. Or: https://expo.dev/accounts/samarthshah559/projects/careerboost-ai/builds
3. Download APK
4. Install on phone
```

---

## 🔥 ONE-LINER (After login):

```bash
cd mobile-native && eas build:configure && eas build --platform android --profile preview
```

---

## 💡 WHY THIS ERROR?

**Current app.json has:**
```json
"extra": {
  "eas": {
    "projectId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"  ← Dummy ID
  }
}
```

**Need real ID from:**
```
eas build:configure
```

**This command:**
```
✅ Creates EAS project
✅ Generates real projectId
✅ Updates app.json automatically
✅ Links to your Expo account
```

---

## 🎯 START NOW:

```bash
cd careerboost-ai/mobile-native
eas login
eas build:configure
eas build --platform android --profile preview
```

**APK ready in 15 minutes! 🚀**
