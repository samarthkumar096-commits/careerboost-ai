# 🔐 Authentication Setup - Complete Guide

## ✅ What's Added:

I've added a complete authentication system with:

- ✅ **Email/Password Login**
- ✅ **Google OAuth**
- ✅ **GitHub OAuth**
- ✅ **Sign Up / Sign In**
- ✅ **Password Reset**
- ✅ **Protected Routes**
- ✅ **User Context**

---

## 🚀 Setup Supabase (5 Minutes - FREE!)

### **Step 1: Create Supabase Project**

1. **Go to:** https://supabase.com/
2. **Click:** "Start your project"
3. **Sign up** with GitHub (free!)
4. **Create new project:**
   - Name: `careerboost-ai`
   - Database Password: (save this!)
   - Region: Choose closest to you
5. **Wait 2 minutes** for project setup

---

### **Step 2: Get API Keys**

1. **Go to:** Project Settings → API
2. **Copy these:**
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGc...` (long key)

---

### **Step 3: Add to .env File**

Create `.env` file in root:

```env
# Stripe (already configured)
VITE_STRIPE_PUBLIC_KEY=pk_test_51QHoXoSFzSkQ6u8thKZrbhD2Dg2Ae1xPQuJcV6GPmm5xrIKDdhoixq0uydtbObumUIKKWXVJpveHPEZXuPCMfLmO00DZzL7jh8
VITE_API_URL=http://localhost:3000

# Supabase (add your keys)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

### **Step 4: Enable Auth Providers**

#### **Enable Email Auth:**
1. Go to: Authentication → Providers
2. **Email** is enabled by default ✅

#### **Enable Google OAuth:**
1. Go to: Authentication → Providers
2. Click **Google**
3. Enable it
4. Add OAuth credentials:
   - Get from: https://console.cloud.google.com/
   - Create OAuth 2.0 Client ID
   - Add redirect URL: `https://your-project.supabase.co/auth/v1/callback`

#### **Enable GitHub OAuth:**
1. Go to: Authentication → Providers
2. Click **GitHub**
3. Enable it
4. Add OAuth credentials:
   - Get from: https://github.com/settings/developers
   - New OAuth App
   - Callback URL: `https://your-project.supabase.co/auth/v1/callback`

---

## 📱 Features Available:

### **1. Sign Up Page** (`/signup`)
- Email/Password registration
- Google sign up
- GitHub sign up
- Email verification

### **2. Login Page** (`/login`)
- Email/Password login
- Google login
- GitHub login
- Remember me
- Forgot password

### **3. Protected Routes**
- Automatic redirect to login
- User session management
- Persistent authentication

### **4. User Context**
- Access user data anywhere
- `const { user } = useAuth()`
- Sign out functionality

---

## 🎯 Usage in Your App:

### **Check if User is Logged In:**

```jsx
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  if (!user) {
    return <div>Please login</div>
  }

  return <div>Welcome {user.email}!</div>
}
```

### **Sign Out:**

```jsx
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const { user, signOut } = useAuth()

  return (
    <button onClick={signOut}>
      Sign Out
    </button>
  )
}
```

### **Protect Routes:**

```jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" />

  return children
}

// Usage
<Route path="/resume" element={
  <ProtectedRoute>
    <Resume />
  </ProtectedRoute>
} />
```

---

## 🎨 UI Components Added:

### **Login Page:**
- Modern gradient design
- Social login buttons
- Email/password form
- Forgot password link
- Sign up link

### **Signup Page:**
- Full name field
- Email verification
- Password confirmation
- Social signup options
- Terms & privacy links

---

## 🔐 Security Features:

- ✅ **Email Verification** - Users must verify email
- ✅ **Password Hashing** - Secure password storage
- ✅ **JWT Tokens** - Secure session management
- ✅ **OAuth 2.0** - Secure social login
- ✅ **HTTPS Only** - Secure connections
- ✅ **Rate Limiting** - Prevent brute force

---

## 📊 Database Schema (Auto-created):

Supabase automatically creates:

```sql
-- Users table
auth.users (
  id uuid,
  email text,
  encrypted_password text,
  email_confirmed_at timestamp,
  created_at timestamp,
  updated_at timestamp
)

-- User metadata
raw_user_meta_data jsonb (
  full_name text,
  avatar_url text
)
```

---

## 🎯 Quick Test:

### **1. Install Dependencies:**
```bash
npm install
```

### **2. Add Supabase Keys to .env**

### **3. Run App:**
```bash
npm run dev
```

### **4. Test:**
- Go to: http://localhost:5173/signup
- Create account
- Check email for verification
- Login at: http://localhost:5173/login

---

## 🌐 Deploy with Auth:

### **Vercel:**
Add environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### **Netlify:**
Same environment variables in build settings

---

## 🆘 Troubleshooting:

**"Invalid API key":**
- Check `.env` file exists
- Verify keys are correct
- Restart dev server

**"Email not confirmed":**
- Check spam folder
- Resend verification email
- Or disable email confirmation in Supabase

**Social login not working:**
- Check OAuth credentials
- Verify redirect URLs
- Enable provider in Supabase

---

## 🎉 You're Done!

**Your app now has:**
- ✅ Complete authentication
- ✅ Social login (Google, GitHub)
- ✅ Email/password login
- ✅ User management
- ✅ Protected routes
- ✅ Modern UI

**Just add Supabase keys and it works!** 🚀

---

## 📞 Quick Links:

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Google OAuth:** https://console.cloud.google.com/
- **GitHub OAuth:** https://github.com/settings/developers
- **Supabase Docs:** https://supabase.com/docs/guides/auth

**Happy Coding!** 🔐✨