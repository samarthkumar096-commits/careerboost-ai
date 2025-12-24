# 🔍 Login Issue Debugging Guide

## Quick Checklist:

### ✅ Step 1: Supabase Email Provider
1. Go to: https://supabase.com/dashboard/project/kjovhrtgunlxfflklsap/auth/providers
2. Find "Email" provider
3. Toggle ON
4. **Confirm email:** Toggle OFF (for testing)
5. Click Save

### ✅ Step 2: Create Test Account
1. Go to: http://localhost:5173/signup
2. Create account:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@123456
3. Should see success message

### ✅ Step 3: Try Login
1. Go to: http://localhost:5173/login
2. Use same credentials:
   - Email: test@example.com
   - Password: Test@123456
3. Should login successfully

### ✅ Step 4: Check Browser Console
1. Press F12
2. Go to Console tab
3. Look for errors
4. Share error message

## Common Errors:

### Error: "Invalid login credentials"
**Cause:** Account doesn't exist or wrong password
**Fix:** 
1. Create account first at /signup
2. Use exact same email/password

### Error: "Email not confirmed"
**Cause:** Email confirmation is enabled
**Fix:**
1. Supabase → Auth → Providers → Email
2. Confirm email: OFF
3. Save

### Error: "Provider not enabled"
**Cause:** Email provider not enabled
**Fix:**
1. Supabase → Auth → Providers
2. Enable Email provider
3. Save

### Error: CORS or Network error
**Cause:** URL not whitelisted
**Fix:**
1. Supabase → Settings → API
2. Add: http://localhost:5173
3. Save

## Test in Browser Console:

```javascript
// Open browser console (F12)
// Paste this code:

const testLogin = async () => {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm')
  
  const supabase = createClient(
    'https://kjovhrtgunlxfflklsap.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqb3ZocnRndW5seGZmbGtsc2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NjM1NTQsImV4cCI6MjA4MTIzOTU1NH0.ckUthyXsZFYCJnXgTGnjay6UJnxaPb9xFkwDnc5MrJk'
  )
  
  // Test signup
  console.log('Testing signup...')
  const signupResult = await supabase.auth.signUp({
    email: 'test@example.com',
    password: 'Test@123456'
  })
  console.log('Signup result:', signupResult)
  
  // Test login
  console.log('Testing login...')
  const loginResult = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'Test@123456'
  })
  console.log('Login result:', loginResult)
}

testLogin()
```

## Check Supabase Dashboard:

### View Users:
1. Go to: https://supabase.com/dashboard/project/kjovhrtgunlxfflklsap/auth/users
2. Check if your test user exists
3. Check if email is confirmed

### Check Logs:
1. Go to: https://supabase.com/dashboard/project/kjovhrtgunlxfflklsap/logs/auth-logs
2. Look for recent login attempts
3. Check for errors

## Still Not Working?

Share these details:
1. Browser console error (screenshot)
2. Network tab errors (screenshot)
3. Supabase auth logs (screenshot)
4. Email provider settings (screenshot)

## Quick Links:

- **Providers:** https://supabase.com/dashboard/project/kjovhrtgunlxfflklsap/auth/providers
- **Users:** https://supabase.com/dashboard/project/kjovhrtgunlxfflklsap/auth/users
- **Logs:** https://supabase.com/dashboard/project/kjovhrtgunlxfflklsap/logs/auth-logs
- **Settings:** https://supabase.com/dashboard/project/kjovhrtgunlxfflklsap/settings/api