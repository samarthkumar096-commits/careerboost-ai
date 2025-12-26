# GitHub Workflows

## Active Workflows:

### 1. build-native-apk.yml (Primary)
- **Purpose:** Build real native Android APK using EAS
- **Trigger:** Manual or push to mobile-native/
- **Output:** Native APK on Expo dashboard
- **Time:** 15-20 minutes
- **Quality:** ⭐⭐⭐⭐⭐

### 2. build-apk-fallback.yml (Backup)
- **Purpose:** Fallback build method using Expo prebuild
- **Trigger:** Manual only
- **Output:** APK artifact on GitHub
- **Time:** 20-25 minutes
- **Quality:** ⭐⭐⭐⭐

## Removed Workflows:
- ❌ build-apk.yml (old method)
- ❌ deploy-gh-pages.yml (not needed)
- ❌ npm-publish.yml (not needed)

## Usage:

### Primary Method:
```bash
# Automatic on push to mobile-native/
# Or manually trigger from Actions tab
```

### Fallback Method:
```bash
# Only if primary fails
# Manually trigger from Actions tab
```

## Clean Slate:
✅ Only essential workflows remain
✅ No conflicting workflows
✅ Clean Actions history going forward
