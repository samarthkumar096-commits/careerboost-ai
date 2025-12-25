// 🤖 CareerBoost AI - Auto-Fix Bot v2.0
// Automatically detects, fixes, and REMOVES broken features

import { supabase } from './supabase';

class AutoFixBot {
  constructor() {
    this.issues = [];
    this.fixes = [];
    this.removed = [];
    this.autoFixEnabled = true;
    this.autoRemoveEnabled = true; // NEW: Auto-remove broken features
  }

  // ============================================
  // 1. AUTO-DETECT ALL ISSUES
  // ============================================
  async detectAllIssues() {
    console.log('🤖 Auto-Fix Bot v2.0 Starting...\n');
    console.log('🗑️  Auto-Remove Mode: ENABLED\n');
    
    this.issues = [];
    this.fixes = [];
    this.removed = [];
    
    // Check environment variables
    await this.checkEnvironmentVariables();
    
    // Check Supabase connection
    await this.checkSupabaseConnection();
    
    // Check API endpoints
    await this.checkAPIEndpoints();
    
    // Check authentication
    await this.checkAuthentication();
    
    // Check payment gateways
    await this.checkPaymentGateways();
    
    // Generate report
    this.generateReport();
    
    // Auto-fix if enabled
    if (this.autoFixEnabled && this.issues.length > 0) {
      await this.autoFixIssues();
    }
    
    // Auto-remove broken features
    if (this.autoRemoveEnabled && this.issues.length > 0) {
      await this.autoRemoveBrokenFeatures();
    }
    
    return {
      issues: this.issues,
      fixes: this.fixes,
      removed: this.removed,
      status: this.issues.filter(i => i.severity === 'critical').length === 0 ? 'operational' : 'degraded'
    };
  }

  // ============================================
  // 2. CHECK ENVIRONMENT VARIABLES
  // ============================================
  async checkEnvironmentVariables() {
    console.log('📋 Checking Environment Variables...');
    
    const requiredVars = {
      'VITE_SUPABASE_URL': {
        value: import.meta.env.VITE_SUPABASE_URL,
        fallback: 'https://kjovhrtgunlxfflklsap.supabase.co',
        critical: true,
        feature: 'Authentication & Database'
      },
      'VITE_SUPABASE_ANON_KEY': {
        value: import.meta.env.VITE_SUPABASE_ANON_KEY,
        fallback: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqb3ZocnRndW5seGZmbGtsc2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NjM1NTQsImV4cCI6MjA4MTIzOTU1NH0.ckUthyXsZFYCJnXgTGnjay6UJnxaPb9xFkwDnc5MrJk',
        critical: true,
        feature: 'Authentication & Database'
      },
      'VITE_GEMINI_API_KEY': {
        value: import.meta.env.VITE_GEMINI_API_KEY,
        fallback: null,
        critical: true,
        feature: 'AI Resume Builder & ATS Checker',
        getInstructions: 'Get from https://aistudio.google.com/apikey'
      },
      'VITE_BHINDI_API_KEY': {
        value: import.meta.env.VITE_BHINDI_API_KEY,
        fallback: 'bhindi_dev_sk_careerboost_ai_2024_temp_access_v1',
        critical: false,
        feature: 'Bhindi Chat Widget'
      },
      'VITE_RAZORPAY_KEY_ID': {
        value: import.meta.env.VITE_RAZORPAY_KEY_ID,
        fallback: 'rzp_test_RvMV8TCAdy3ugd',
        critical: false,
        feature: 'Razorpay Payments'
      },
      'VITE_STRIPE_PUBLIC_KEY': {
        value: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
        fallback: 'pk_test_51QHoXoSFzSkQ6u8thKZrbhD2Dg2Ae1xPQuJcV6GPmm5xrIKDdhoixq0uydtbObumUIKKWXVJpveHPEZXuPCMfLmO00DZzL7jh8',
        critical: false,
        feature: 'Stripe Payments'
      }
    };

    for (const [key, config] of Object.entries(requiredVars)) {
      const value = config.value;
      const isInvalid = !value || value.includes('your-') || value.includes('sk-your');
      
      if (isInvalid) {
        this.issues.push({
          type: 'env-var',
          severity: config.critical ? 'critical' : 'warning',
          key: key,
          feature: config.feature,
          message: `${key} is missing or invalid`,
          fix: config.fallback ? 'auto-fixable' : 'manual',
          fallback: config.fallback,
          instructions: config.getInstructions,
          canRemove: !config.critical // Can remove non-critical features
        });
        
        console.log(`❌ ${key}: MISSING - Affects: ${config.feature}`);
      } else {
        console.log(`✅ ${key}: OK`);
      }
    }
  }

  // ============================================
  // 3. CHECK SUPABASE CONNECTION
  // ============================================
  async checkSupabaseConnection() {
    console.log('\n📋 Checking Supabase Connection...');
    
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        this.issues.push({
          type: 'supabase',
          severity: 'critical',
          feature: 'Authentication & Database',
          message: `Supabase connection error: ${error.message}`,
          fix: 'check-credentials',
          canRemove: false
        });
        console.log('❌ Supabase: ERROR -', error.message);
      } else {
        console.log('✅ Supabase: Connected');
      }
    } catch (err) {
      this.issues.push({
        type: 'supabase',
        severity: 'critical',
        feature: 'Authentication & Database',
        message: `Supabase connection failed: ${err.message}`,
        fix: 'check-credentials',
        canRemove: false
      });
      console.log('❌ Supabase: FAILED -', err.message);
    }
  }

  // ============================================
  // 4. CHECK API ENDPOINTS
  // ============================================
  async checkAPIEndpoints() {
    console.log('\n📋 Checking API Endpoints...');
    
    // Check Gemini API
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (geminiKey && !geminiKey.includes('your-')) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'test' }] }]
            })
          }
        );

        if (response.ok) {
          console.log('✅ Gemini API: Working');
        } else {
          const error = await response.json();
          this.issues.push({
            type: 'api',
            severity: 'critical',
            service: 'Gemini',
            feature: 'AI Resume Builder & ATS Checker',
            message: `Gemini API error: ${error.error?.message || 'Unknown'}`,
            fix: 'check-api-key',
            canRemove: true // Can disable AI features
          });
          console.log('❌ Gemini API: ERROR - Will disable AI features');
        }
      } catch (err) {
        this.issues.push({
          type: 'api',
          severity: 'critical',
          service: 'Gemini',
          feature: 'AI Resume Builder & ATS Checker',
          message: `Gemini API failed: ${err.message}`,
          fix: 'check-network',
          canRemove: true
        });
        console.log('❌ Gemini API: FAILED - Will disable AI features');
      }
    } else {
      this.issues.push({
        type: 'api',
        severity: 'critical',
        service: 'Gemini',
        feature: 'AI Resume Builder & ATS Checker',
        message: 'Gemini API key not configured',
        fix: 'add-api-key',
        canRemove: true
      });
      console.log('⚠️  Gemini API: Not configured - Will disable AI features');
    }
  }

  // ============================================
  // 5. CHECK AUTHENTICATION
  // ============================================
  async checkAuthentication() {
    console.log('\n📋 Checking Authentication Setup...');
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        console.log('✅ User authenticated:', user.email);
      } else {
        console.log('ℹ️  No user logged in (this is normal)');
      }
    } catch (err) {
      this.issues.push({
        type: 'auth',
        severity: 'warning',
        feature: 'Authentication',
        message: `Authentication check failed: ${err.message}`,
        fix: 'check-supabase-setup',
        canRemove: false
      });
      console.log('⚠️  Auth check failed');
    }
  }

  // ============================================
  // 6. CHECK PAYMENT GATEWAYS
  // ============================================
  async checkPaymentGateways() {
    console.log('\n📋 Checking Payment Gateways...');
    
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    
    if (!razorpayKey || razorpayKey.includes('your-')) {
      this.issues.push({
        type: 'payment',
        severity: 'warning',
        service: 'Razorpay',
        feature: 'Razorpay Payments',
        message: 'Razorpay not configured',
        fix: 'add-api-key',
        canRemove: true
      });
      console.log('⚠️  Razorpay: Not configured - Will disable');
    } else {
      console.log('✅ Razorpay: Configured');
    }
    
    if (!stripeKey || stripeKey.includes('your-')) {
      this.issues.push({
        type: 'payment',
        severity: 'warning',
        service: 'Stripe',
        feature: 'Stripe Payments',
        message: 'Stripe not configured',
        fix: 'add-api-key',
        canRemove: true
      });
      console.log('⚠️  Stripe: Not configured - Will disable');
    } else {
      console.log('✅ Stripe: Configured');
    }
  }

  // ============================================
  // 7. AUTO-FIX ISSUES
  // ============================================
  async autoFixIssues() {
    console.log('\n🔧 Auto-Fixing Issues...\n');
    
    for (const issue of this.issues) {
      if (issue.fix === 'auto-fixable' && issue.fallback) {
        try {
          // Store fallback in localStorage as temporary fix
          localStorage.setItem(`autofix_${issue.key}`, issue.fallback);
          
          this.fixes.push({
            issue: issue.key,
            feature: issue.feature,
            action: 'Applied fallback value',
            status: 'success',
            note: 'Temporary fix - Add to Vercel for permanent solution'
          });
          
          console.log(`✅ Fixed: ${issue.key} (using fallback)`);
        } catch (err) {
          console.log(`❌ Failed to fix: ${issue.key}`);
        }
      }
    }
  }

  // ============================================
  // 8. AUTO-REMOVE BROKEN FEATURES (NEW!)
  // ============================================
  async autoRemoveBrokenFeatures() {
    console.log('\n🗑️  Auto-Removing Broken Features...\n');
    
    const removableIssues = this.issues.filter(i => i.canRemove);
    
    for (const issue of removableIssues) {
      try {
        // Mark feature as disabled
        localStorage.setItem(`feature_disabled_${issue.feature}`, 'true');
        
        this.removed.push({
          feature: issue.feature,
          reason: issue.message,
          status: 'disabled',
          note: 'Feature will be hidden until fixed'
        });
        
        console.log(`🗑️  Removed: ${issue.feature}`);
        console.log(`   Reason: ${issue.message}`);
      } catch (err) {
        console.log(`❌ Failed to remove: ${issue.feature}`);
      }
    }
    
    if (removableIssues.length === 0) {
      console.log('ℹ️  No features need to be removed');
    }
  }

  // ============================================
  // 9. CHECK IF FEATURE IS ENABLED
  // ============================================
  isFeatureEnabled(featureName) {
    return localStorage.getItem(`feature_disabled_${featureName}`) !== 'true';
  }

  // ============================================
  // 10. RE-ENABLE FEATURE
  // ============================================
  enableFeature(featureName) {
    localStorage.removeItem(`feature_disabled_${featureName}`);
    console.log(`✅ Re-enabled: ${featureName}`);
  }

  // ============================================
  // 11. GENERATE REPORT
  // ============================================
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 AUTO-FIX BOT v2.0 REPORT');
    console.log('='.repeat(60));
    
    const critical = this.issues.filter(i => i.severity === 'critical');
    const warnings = this.issues.filter(i => i.severity === 'warning');
    
    console.log(`\n🔴 Critical Issues: ${critical.length}`);
    critical.forEach(issue => {
      console.log(`   - ${issue.message}`);
      console.log(`     Affects: ${issue.feature}`);
      if (issue.instructions) {
        console.log(`     → ${issue.instructions}`);
      }
    });
    
    console.log(`\n⚠️  Warnings: ${warnings.length}`);
    warnings.forEach(issue => {
      console.log(`   - ${issue.message}`);
      console.log(`     Affects: ${issue.feature}`);
    });
    
    if (this.fixes.length > 0) {
      console.log(`\n✅ Auto-Fixes Applied: ${this.fixes.length}`);
      this.fixes.forEach(fix => {
        console.log(`   - ${fix.issue}: ${fix.action}`);
        if (fix.note) {
          console.log(`     Note: ${fix.note}`);
        }
      });
    }
    
    if (this.removed.length > 0) {
      console.log(`\n🗑️  Features Disabled: ${this.removed.length}`);
      this.removed.forEach(item => {
        console.log(`   - ${item.feature}`);
        console.log(`     Reason: ${item.reason}`);
        console.log(`     ${item.note}`);
      });
    }
    
    console.log('\n💡 RECOMMENDED ACTIONS:');
    
    if (critical.length > 0) {
      console.log('\n1. Add missing environment variables to Vercel:');
      console.log('   https://vercel.com/dashboard → Settings → Environment Variables');
      
      const missingVars = critical.filter(i => i.type === 'env-var');
      missingVars.forEach(v => {
        console.log(`   - ${v.key} (for ${v.feature})`);
        if (v.instructions) {
          console.log(`     ${v.instructions}`);
        }
      });
      
      console.log('\n2. Redeploy the application');
      console.log('\n3. Run this bot again to verify fixes');
      console.log('\n4. Re-enable features: autoFixBot.enableFeature("Feature Name")');
    } else {
      console.log('✅ All critical issues resolved!');
      console.log('✅ Application is operational');
    }
    
    console.log('\n' + '='.repeat(60));
  }

  // ============================================
  // 12. GET DISABLED FEATURES
  // ============================================
  getDisabledFeatures() {
    const features = [
      'AI Resume Builder & ATS Checker',
      'Bhindi Chat Widget',
      'Razorpay Payments',
      'Stripe Payments'
    ];
    
    return features.filter(f => !this.isFeatureEnabled(f));
  }
}

// ============================================
// 13. EXPORT AND AUTO-RUN
// ============================================
const autoFixBot = new AutoFixBot();

// Make available globally
if (typeof window !== 'undefined') {
  window.autoFixBot = autoFixBot;
  
  // Helper functions
  window.checkFeature = (name) => autoFixBot.isFeatureEnabled(name);
  window.enableFeature = (name) => autoFixBot.enableFeature(name);
  window.getDisabledFeatures = () => autoFixBot.getDisabledFeatures();
}

export default autoFixBot;
