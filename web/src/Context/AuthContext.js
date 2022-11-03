import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import Lottie from 'react-lottie'
import animationData from '../assets/loading.json'

import {
  onAuthStateChanged,
  signOut,
  getRedirectResult,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect
} from 'firebase/auth'
const AuthContext = createContext()

export function useAuth () {
  return useContext(AuthContext)
}

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const provider = new GoogleAuthProvider()
  const value = {
    currentUser,
    signIn,
    signOut: logOut,
    getResult,
    loading
  }

  function signIn () {
    return signInWithRedirect(auth, provider)
  }
  function getResult () {
    return getRedirectResult(auth)
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
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading
        ? (
            children
          )
        : (
          <div className='relative w-[100vw] h-[100vh] bg-white z-10'>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              <Lottie
                isClickToPauseDisabled
                options={lottieOptions}
                height={300}
                width={300}
              />
            </div>
          </div>
          )}
    </AuthContext.Provider>
  )
}
