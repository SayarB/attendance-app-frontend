import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

import {
  onAuthStateChanged,
  signInWithPhoneNumber,
  signOut
} from 'firebase/auth'
const AuthContext = createContext()

export function useAuth () {
  return useContext(AuthContext)
}

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const value = {
    currentUser,
    signIn,
    signOut: logOut,
    loading
  }

  function signIn (recaptchaVerifier, phno) {
    return signInWithPhoneNumber(auth, phno, recaptchaVerifier)
  }
  function logOut () {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('state changed')
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
