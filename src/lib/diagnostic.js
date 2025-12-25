// Diagnostic Script for CareerBoost AI
// Run this in browser console to check all APIs and configurations

console.log('🔍 CareerBoost AI - Diagnostic Check Starting...\n');

// ============================================
// 1. Environment Variables Check
// ============================================
console.log('📋 1. ENVIRONMENT VARIABLES CHECK:');
console.log('-----------------------------------');

const envVars = {
  'VITE_SUPABASE_URL': import.meta.env.VITE_SUPABASE_URL,
  'VITE_SUPABASE_ANON_KEY': import.meta.env.VITE_SUPABASE_ANON_KEY,
  'VITE_GEMINI_API_KEY': import.meta.env.VITE_GEMINI_API_KEY,
  'VITE_DEEPSEEK_API_KEY': import.meta.env.VITE_DEEPSEEK_API_KEY,
  'VITE_BHINDI_API_KEY': import.meta.env.VITE_BHINDI_API_KEY,
  'VITE_RAZORPAY_KEY_ID': import.meta.env.VITE_RAZORPAY_KEY_ID,
  'VITE_STRIPE_PUBLIC_KEY': import.meta.env.VITE_STRIPE_PUBLIC_KEY,
};

let missingVars = [];
let presentVars = [];

Object.entries(envVars).forEach(([key, value]) => {
  if (!value || value.includes('your-') || value.includes('sk-your')) {
    console.log(`❌ ${key}: MISSING or INVALID`);
    missingVars.push(key);
  } else {
    console.log(`✅ ${key}: ${value.substring(0, 20)}...`);
    presentVars.push(key);
  }
});

console.log(`\n📊 Summary: ${presentVars.length}/${Object.keys(envVars).length} variables configured\n`);

// ============================================
// 2. Supabase Connection Check
// ============================================
console.log('📋 2. SUPABASE CONNECTION CHECK:');
console.log('-----------------------------------');

import { supabase } from './lib/supabase';

// Test Supabase connection
(async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log('❌ Supabase Auth Error:', error.message);
    } else {
      console.log('✅ Supabase Connection: OK');
      console.log('   User:', data.session ? data.session.user.email : 'Not logged in');
    }
  } catch (err) {
    console.log('❌ Supabase Connection Failed:', err.message);
  }
})();

// ============================================
// 3. Gemini API Check
// ============================================
console.log('\n📋 3. GEMINI API CHECK:');
console.log('-----------------------------------');

const testGeminiAPI = async () => {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY.includes('your-')) {
    console.log('❌ Gemini API Key: NOT CONFIGURED');
    return;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Test' }] }]
        })
      }
    );

    if (response.ok) {
      console.log('✅ Gemini API: WORKING');
    } else {
      const error = await response.json();
      console.log('❌ Gemini API Error:', error.error?.message || 'Unknown error');
    }
  } catch (err) {
    console.log('❌ Gemini API Failed:', err.message);
  }
};

testGeminiAPI();

// ============================================
// 4. DeepSeek API Check
// ============================================
console.log('\n📋 4. DEEPSEEK API CHECK:');
console.log('-----------------------------------');

const testDeepSeekAPI = async () => {
  const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
  
  if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY.includes('your-')) {
    console.log('❌ DeepSeek API Key: NOT CONFIGURED');
    return;
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'Test' }],
        max_tokens: 10
      })
    });

    if (response.ok) {
      console.log('✅ DeepSeek API: WORKING');
    } else {
      const error = await response.json();
      console.log('❌ DeepSeek API Error:', error.error?.message || 'Unknown error');
    }
  } catch (err) {
    console.log('❌ DeepSeek API Failed:', err.message);
  }
};

testDeepSeekAPI();

// ============================================
// 5. Payment Gateway Check
// ============================================
console.log('\n📋 5. PAYMENT GATEWAYS CHECK:');
console.log('-----------------------------------');

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!RAZORPAY_KEY || RAZORPAY_KEY.includes('your-')) {
  console.log('❌ Razorpay: NOT CONFIGURED');
} else {
  console.log('✅ Razorpay Key:', RAZORPAY_KEY.substring(0, 15) + '...');
}

if (!STRIPE_KEY || STRIPE_KEY.includes('your-')) {
  console.log('❌ Stripe: NOT CONFIGURED');
} else {
  console.log('✅ Stripe Key:', STRIPE_KEY.substring(0, 15) + '...');
}

// ============================================
// 6. Bhindi Chat Check
// ============================================
console.log('\n📋 6. BHINDI CHAT CHECK:');
console.log('-----------------------------------');

const BHINDI_KEY = import.meta.env.VITE_BHINDI_API_KEY;

if (!BHINDI_KEY || BHINDI_KEY.includes('your-')) {
  console.log('❌ Bhindi API: NOT CONFIGURED');
} else {
  console.log('✅ Bhindi API Key:', BHINDI_KEY.substring(0, 20) + '...');
}

// ============================================
// 7. Network Connectivity Check
// ============================================
console.log('\n📋 7. NETWORK CONNECTIVITY CHECK:');
console.log('-----------------------------------');

const testConnectivity = async () => {
  const endpoints = [
    { name: 'Supabase', url: 'https://kjovhrtgunlxfflklsap.supabase.co' },
    { name: 'Google AI', url: 'https://generativelanguage.googleapis.com' },
    { name: 'DeepSeek', url: 'https://api.deepseek.com' },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.url, { method: 'HEAD' });
      console.log(`✅ ${endpoint.name}: Reachable`);
    } catch (err) {
      console.log(`❌ ${endpoint.name}: Not reachable - ${err.message}`);
    }
  }
};

testConnectivity();

// ============================================
// 8. Browser Compatibility Check
// ============================================
console.log('\n📋 8. BROWSER COMPATIBILITY CHECK:');
console.log('-----------------------------------');

console.log('Browser:', navigator.userAgent);
console.log('Local Storage:', typeof localStorage !== 'undefined' ? '✅ Available' : '❌ Not available');
console.log('Session Storage:', typeof sessionStorage !== 'undefined' ? '✅ Available' : '❌ Not available');
console.log('Fetch API:', typeof fetch !== 'undefined' ? '✅ Available' : '❌ Not available');

// ============================================
// 9. Final Summary
// ============================================
setTimeout(() => {
  console.log('\n' + '='.repeat(50));
  console.log('📊 DIAGNOSTIC SUMMARY');
  console.log('='.repeat(50));
  
  if (missingVars.length === 0) {
    console.log('✅ All environment variables configured!');
  } else {
    console.log(`❌ Missing ${missingVars.length} environment variables:`);
    missingVars.forEach(v => console.log(`   - ${v}`));
  }
  
  console.log('\n💡 NEXT STEPS:');
  if (missingVars.length > 0) {
    console.log('1. Add missing environment variables to Vercel');
    console.log('2. Redeploy the application');
    console.log('3. Run this diagnostic again');
  } else {
    console.log('1. Test Resume Builder: /resume-builder');
    console.log('2. Test ATS Checker: /ats-checker');
    console.log('3. Test Authentication: /login');
  }
  
  console.log('\n🔗 USEFUL LINKS:');
  console.log('Vercel Dashboard: https://vercel.com/dashboard');
  console.log('Supabase Dashboard: https://supabase.com/dashboard');
  console.log('Gemini API Keys: https://aistudio.google.com/apikey');
  console.log('DeepSeek API Keys: https://platform.deepseek.com');
  
  console.log('\n✅ Diagnostic check complete!\n');
}, 3000);

export default {};
