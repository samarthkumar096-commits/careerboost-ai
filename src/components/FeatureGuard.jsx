// Feature Guard Component
// Hides components if feature is disabled by Auto-Fix Bot

import { useEffect, useState } from 'react';
import autoFixBot from '../lib/autoFixBot';

export default function FeatureGuard({ feature, children, fallback = null }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if feature is enabled
    const enabled = autoFixBot.isFeatureEnabled(feature);
    setIsEnabled(enabled);
    setChecking(false);

    if (!enabled) {
      console.log(`🗑️  Feature disabled: ${feature}`);
    }
  }, [feature]);

  if (checking) {
    return null; // or a loading spinner
  }

  if (!isEnabled) {
    return fallback || (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-800 font-semibold mb-2">
          ⚠️ Feature Temporarily Unavailable
        </p>
        <p className="text-yellow-700 text-sm">
          {feature} is currently disabled due to configuration issues.
        </p>
        <p className="text-yellow-600 text-xs mt-2">
          Please contact support or check console for details.
        </p>
      </div>
    );
  }

  return children;
}
