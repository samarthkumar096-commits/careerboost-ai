// 🤖 CareerBoost AI - Auto-Fix Bot
// Automatically detects and fixes common issues

import { supabase } from './supabase';

class AutoFixBot {
  constructor() {
    this.issues = [];
    this.fixes = [];
    this.autoFixEnabled = true;
  }

  // ============================================
  // 1. AUTO-DETECT ALL ISSUES
  // ============================================
  async detectAllIssues() {
    console.log('🤖 Auto-Fix Bot Starting...\n');
    
    this.issues = [];
    
    // Check environment variables
    await this.checkEnvironmentVariables();
    
    // Check Supabase connection
    await this.checkSupabaseConnection();
    
    // Check API endpoints
    await this.checkAPIEndpoints();
    
    // Check authentication
    await this.checkAuthentication();
    
    // Generate report
    this.generateReport();
    
    // Auto-fix if enabled
    if (this.autoFixEnabled && this.issues.length > 0) {
      await this.autoFixIssues();
    }
    
    return {
      issues: this.issues,
      fixes: this.fixes,
      status: this.issues.length === 0 ? 'healthy' : 'needs-attention'
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
        critical: true
      },
      'VITE_SUPABASE_ANON_KEY': {
        value: import.meta.env.VITE_SUPABASE_ANON_KEY,
        fallback: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqb3ZocnRndW5seGZmbGtsc2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NjM1NTQsImV4cCI6MjA4MTIzOTU1NH0.ckUthyXsZFYCJnXgTGnjay6UJnxaPb9xFkwDnc5MrJk',
        critical: true
      },
      'VITE_GEMINI_API_KEY': {
        value: import.meta.env.VITE_GEMINI_API_KEY,
        fallback: null,
        critical: true,
        getInstructions: 'Get from https://aistudio.google.com/apikey'
      },
      'VITE_BHINDI_API_KEY': {
        value: import.meta.env.VITE_BHINDI_API_KEY,
        fallback: 'bhindi_dev_sk_careerboost_ai_2024_temp_access_v1',
        critical: false
      },
      'VITE_RAZORPAY_KEY_ID': {
        value: import.meta.env.VITE_RAZORPAY_KEY_ID,
        fallback: 'rzp_test_RvMV8TCAdy3ugd',
        critical: false
      },
      'VITE_STRIPE_PUBLIC_KEY': {
        value: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
        fallback: 'pk_test_51QHoXoSFzSkQ6u8thKZrbhD2Dg2Ae1xPQuJcV6GPmm5xrIKDdhoixq0uydtbObumUIKKWXVJpveHPEZXuPCMfLmO00DZzL7jh8',
        critical: false
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
          message: `${key} is missing or invalid`,
          fix: config.fallback ? 'auto-fixable' : 'manual',
          fallback: config.fallback,
          instructions: config.getInstructions
        });
        
        console.log(`❌ ${key}: MISSING`);
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
          message: `Supabase connection error: ${error.message}`,
          fix: 'check-credentials'
        });
        console.log('❌ Supabase: ERROR -', error.message);
      } else {
        console.log('✅ Supabase: Connected');
      }
    } catch (err) {
      this.issues.push({
        type: 'supabase',
        severity: 'critical',
        message: `Supabase connection failed: ${err.message}`,
        fix: 'check-credentials'
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
            message: `Gemini API error: ${error.error?.message || 'Unknown'}`,
            fix: 'check-api-key'
          });
          console.log('❌ Gemini API: ERROR');
        }
      } catch (err) {
        this.issues.push({
          type: 'api',
          severity: 'critical',
          service: 'Gemini',
          message: `Gemini API failed: ${err.message}`,
          fix: 'check-network'
        });
        console.log('❌ Gemini API: FAILED');
      }
    } else {
      console.log('⚠️  Gemini API: Not configured');
    }
  }

  // ============================================
  // 5. CHECK AUTHENTICATION
  // ============================================
  async checkAuthentication() {
    console.log('\n📋 Checking Authentication Setup...');
    
    try {
      // Check if user is logged in
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
        message: `Authentication check failed: ${err.message}`,
        fix: 'check-supabase-setup'
      });
      console.log('⚠️  Auth check failed');
    }
  }

  // ============================================
  // 6. AUTO-FIX ISSUES
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
  // 7. GENERATE REPORT
  // ============================================
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 AUTO-FIX BOT REPORT');
    console.log('='.repeat(60));
    
    const critical = this.issues.filter(i => i.severity === 'critical');
    const warnings = this.issues.filter(i => i.severity === 'warning');
    
    console.log(`\n🔴 Critical Issues: ${critical.length}`);
    critical.forEach(issue => {
      console.log(`   - ${issue.message}`);
      if (issue.instructions) {
        console.log(`     → ${issue.instructions}`);
      }
    });
    
    console.log(`\n⚠️  Warnings: ${warnings.length}`);
    warnings.forEach(issue => {
      console.log(`   - ${issue.message}`);
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
    
    console.log('\n💡 RECOMMENDED ACTIONS:');
    
    if (critical.length > 0) {
      console.log('\n1. Add missing environment variables to Vercel:');
      console.log('   https://vercel.com/dashboard → Settings → Environment Variables');
      
      const missingVars = critical.filter(i => i.type === 'env-var');
      missingVars.forEach(v => {
        console.log(`   - ${v.key}`);
        if (v.instructions) {
          console.log(`     ${v.instructions}`);
        }
      });
      
      console.log('\n2. Redeploy the application');
      console.log('\n3. Run this bot again to verify fixes');
    } else {
      console.log('✅ All critical issues resolved!');
      console.log('✅ Application should be working correctly');
    }
    
    console.log('\n' + '='.repeat(60));
  }

  // ============================================
  // 8. GET SETUP INSTRUCTIONS
  // ============================================
  getSetupInstructions() {
    return {
      title: '🚀 Complete Setup Guide',
      steps: [
        {
          step: 1,
          title: 'Get Gemini API Key (FREE)',
          url: 'https://aistudio.google.com/apikey',
          instructions: [
            'Sign in with Google account',
            'Click "Create API Key"',
            'Copy the key (starts with AIza...)'
          ]
        },
        {
          step: 2,
          title: 'Add Environment Variables to Vercel',
          url: 'https://vercel.com/dashboard',
          instructions: [
            'Select careerboost-ai project',
            'Go to Settings → Environment Variables',
            'Add these variables:',
            '  - VITE_GEMINI_API_KEY=AIza...',
            '  - VITE_SUPABASE_URL=https://kjovhrtgunlxfflklsap.supabase.co',
            '  - VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            '  - VITE_BHINDI_API_KEY=bhindi_dev_sk_careerboost_ai_2024_temp_access_v1',
            '  - VITE_RAZORPAY_KEY_ID=rzp_test_RvMV8TCAdy3ugd',
            '  - VITE_STRIPE_PUBLIC_KEY=pk_test_51QHoXoSFzSkQ6u8t...',
            'Select all 3 environments (Production, Preview, Development)',
            'Save'
          ]
        },
        {
          step: 3,
          title: 'Redeploy Application',
          instructions: [
            'Vercel will automatically redeploy',
            'Wait 2-3 minutes',
            'Check deployment status'
          ]
        },
        {
          step: 4,
          title: 'Verify Setup',
          instructions: [
            'Run: autoFixBot.detectAllIssues()',
            'Check for any remaining issues',
            'Test Resume Builder',
            'Test ATS Checker'
          ]
        }
      ]
    };
  }
}

// ============================================
// 9. EXPORT AND AUTO-RUN
// ============================================
const autoFixBot = new AutoFixBot();

// Auto-run on import (can be disabled)
if (typeof window !== 'undefined') {
  // Run diagnostic on page load
  window.addEventListener('load', () => {
    console.log('🤖 Auto-Fix Bot loaded. Run autoFixBot.detectAllIssues() to start.');
  });
  
  // Make available globally
  window.autoFixBot = autoFixBot;
}

export default autoFixBot;
