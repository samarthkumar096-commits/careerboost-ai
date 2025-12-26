#!/bin/bash

# Auto-upload APK to Diawi
# Usage: ./upload-to-diawi.sh path/to/app.apk

APK_PATH=$1
DIAWI_TOKEN="YOUR_DIAWI_TOKEN"  # Get from diawi.com/settings

if [ -z "$APK_PATH" ]; then
    echo "Usage: ./upload-to-diawi.sh path/to/app.apk"
    exit 1
fi

echo "📤 Uploading APK to Diawi..."

RESPONSE=$(curl -X POST https://upload.diawi.com/ \
    -F token="$DIAWI_TOKEN" \
    -F file=@"$APK_PATH" \
    -F find_by_udid=0 \
    -F wall_of_apps=0)

JOB_ID=$(echo $RESPONSE | jq -r '.job')

echo "⏳ Processing... Job ID: $JOB_ID"

# Wait for processing
sleep 10

# Get result
RESULT=$(curl -X GET "https://upload.diawi.com/status?token=$DIAWI_TOKEN&job=$JOB_ID")

LINK=$(echo $RESULT | jq -r '.link')

echo "✅ Upload complete!"
echo "📱 Download link: https://i.diawi.com/$LINK"
echo "🔗 Share this link with anyone!"
