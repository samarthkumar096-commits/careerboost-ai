#!/bin/bash

# CareerBoost AI - Automated Android APK Build Script
# This script automates the entire APK build process

echo "🚀 CareerBoost AI - Android APK Builder"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node -v)"
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Step 2: Build web app
echo "🔨 Step 2: Building web app..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build web app"
    exit 1
fi
echo "✅ Web app built successfully"
echo ""

# Step 3: Check if Capacitor is initialized
if [ ! -d "android" ]; then
    echo "🔧 Step 3: Initializing Capacitor..."
    npx cap add android
    if [ $? -ne 0 ]; then
        echo "❌ Failed to add Android platform"
        exit 1
    fi
    echo "✅ Android platform added"
else
    echo "✅ Android platform already exists"
fi
echo ""

# Step 4: Sync web build to Android
echo "🔄 Step 4: Syncing to Android..."
npx cap sync android
if [ $? -ne 0 ]; then
    echo "❌ Failed to sync to Android"
    exit 1
fi
echo "✅ Synced successfully"
echo ""

# Step 5: Build APK
echo "📱 Step 5: Building APK..."
echo "Opening Android Studio..."
echo ""
echo "⚠️  IMPORTANT: In Android Studio:"
echo "   1. Wait for Gradle sync to complete"
echo "   2. Go to: Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo "   3. Wait for build to complete"
echo "   4. Click 'locate' to find your APK"
echo ""
echo "📍 APK will be at: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""

npx cap open android

echo ""
echo "🎉 Setup complete! Android Studio should open now."
echo ""
echo "Alternative: Build without Android Studio:"
echo "   cd android && ./gradlew assembleDebug"
echo ""