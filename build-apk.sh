#!/bin/bash

echo "🚀 Building Android APK..."
echo ""

# Navigate to mobile-native
cd mobile-native

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install EAS CLI globally
echo "🔧 Installing EAS CLI..."
npm install -g eas-cli

# Login to EAS (you need to run this manually)
echo "🔐 Please login to EAS:"
echo "Run: eas login"
echo ""

# Build APK
echo "🏗️ Building APK..."
eas build --platform android --profile preview --local

echo ""
echo "✅ Build complete!"
echo "📱 APK location: mobile-native/build/"
