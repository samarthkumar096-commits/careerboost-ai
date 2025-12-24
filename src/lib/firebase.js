import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// Providers
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

// Auth functions
export const firebaseAuth = {
  // Sign up with email
  signUp: async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(userCredential.user, { displayName })
      }
      return { user: userCredential.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  },

  // Sign in with email
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { user: userCredential.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return { user: result.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  },

  // Sign in with GitHub
  signInWithGitHub: async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      return { user: result.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await signOut(auth)
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  }
}