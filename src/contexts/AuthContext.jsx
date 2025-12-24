import { createContext, useContext, useEffect, useState } from 'react'
import { auth, firebaseAuth } from '../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    loading,
    signUp: async (email, password, displayName) => {
      const { user, error } = await firebaseAuth.signUp(email, password, displayName)
      return { data: { user }, error }
    },
    signIn: async (email, password) => {
      const { user, error } = await firebaseAuth.signIn(email, password)
      return { data: { user }, error }
    },
    signInWithGoogle: async () => {
      const { user, error } = await firebaseAuth.signInWithGoogle()
      return { data: { user }, error }
    },
    signInWithGitHub: async () => {
      const { user, error } = await firebaseAuth.signInWithGitHub()
      return { data: { user }, error }
    },
    signOut: async () => {
      const { error } = await firebaseAuth.signOut()
      return { error }
    },
    resetPassword: async (email) => {
      const { error } = await firebaseAuth.resetPassword(email)
      return { data: {}, error }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}