import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { signInWithPhoneNumber } from 'firebase/auth'
const AuthContext = createContext()

export function useAuth () {
  return useContext(AuthContext)
}

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const value = {
    currentUser,
    signIn
  }

  function signIn (recaptchaVerifier, phno, callback) {
    return signInWithPhoneNumber(auth, phno, recaptchaVerifier).then(callback)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
    return unsubscribe()
  })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
