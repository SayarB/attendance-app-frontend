import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import logo from '../logo.svg'
import axios from 'axios'
import { getIdToken } from 'firebase/auth'
import { useAuth } from '../Context/AuthContext'

import { toast } from 'react-toastify'
import Lottie from 'react-lottie'
import animationData from '../assets/loading'
import googleLogo from '../assets/google-logo.svg'

function Login () {
  const authState = useAuth()
  const navigate = useNavigate()

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (authState.currentUser !== null) navigate('/', { replace: true })
  }, [])

  const handleClick = async () => {
    setLoading(true)
    authState
      .signIn()
      .then(async (result) => {
        try {
          const idToken = await getIdToken(result.user, true)
          const res = await axios.post(
            'https://attendencegdsc.herokuapp.com/get_user/',
            {
              club_name: 'testing',
              token: idToken
            }
          )

          if (res.status === 404) {
            toast.error('User Not Found')
            setLoading(false)
            authState.signOut()
          } else {
            setLoading(false)
            navigate('/', { replace: true })
          }
        } catch (err) {
          authState.signOut().then(() => {
            setLoading(false)
          })
          console.log('Error: ', err)

          if (err.response.status === 404) toast.error('Could not find user')
        }
      })
      .catch((err) => {
        console.log(err.name)
        setLoading(false)
        if (err.code !== 'auth/popup-closed-by-user') {
          toast.error(err.code)
        } else {
          toast.error('The Popup for authentication was closed')
        }
      })
  }
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    isClickToPauseDisabled: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <>
      {isLoading && (
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
      <div className='font-sans absolute h-full w-full max-h-[800px] max-w-[500px] bg  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-10 flex flex-col'>
        <div className='flex items-center my-10'>
          <img src={logo} alt='' className='w-14 mr-5' />
          <p className='text-primary text-5xl ml font-sans'>Nock</p>
        </div>
        <div className=' my-10'>
          <p className='text-[2rem] font-thin leading-10'>
            Hey, <br /> Login Now
          </p>
          <p className='text-[1rem] my-5'>
            If you are new ask your{' '}
            <span className='text-primary'>
              club seniors about <span className=' font-bold'>Nock</span> access
            </span>
          </p>

          <Button
            disabled={false}
            id='sign-in-button'
            onClick={handleClick}
            type='submit'
            className=' mx-0 w-full flex items-center justify-center text-base md:text-lg'
          >
            <img src={googleLogo} alt='' className='mx-5 w-10 ' />
            <p className='flex-1'>Sign In with Google</p>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Login
