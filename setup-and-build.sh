#!/bin/bash

echo "🚀 CareerBoost AI - Complete APK Build Setup"
echo "=============================================="
echo ""

# Check if in correct directory
if [ ! -d "mobile-native" ]; then
    echo "❌ Error: mobile-native directory not found!"
    echo "Please run this script from the careerboost-ai root directory"
    exit 1
fi

cd mobile-native

echo "📦 Step 1: Installing dependencies..."
npm install

echo ""
echo "🔧 Step 2: Installing EAS CLI..."
npm install -g eas-cli

echo ""
echo "=============================================="
echo "✅ Setup Complete!"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Login to EAS:"
echo "   eas login"
echo ""
echo "2. Build APK:"
echo "   eas build --platform android --profile preview"
echo ""
echo "3. Wait 10-15 minutes for cloud build"
echo ""
echo "4. Download APK from:"
echo "   https://expo.dev"
echo ""
echo "=============================================="
echo ""
echo "💡 Quick Build Command:"
echo "   eas build -p android --profile preview"
echo ""
