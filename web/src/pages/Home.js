// import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import { useAuth } from '../Context/AuthContext'

const dateString = new Date().toLocaleString('default', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
function Home () {
  const auth = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (auth.currentUser === null) navigate('/welcome')
  }, [auth])

  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log('Logged Out')
  //       navigate('/welcome')
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  return (
    <div className='flex flex-col h-[100vh] items-center'>
      <div className=' w-full max-w-2xl p-10 flex items-center justify-between font-sans'>
        <div>
          <p className='text-xl'>Welcome 👋</p>
          <p className='text-3xl'>{auth.currentUser?.displayName}</p>
        </div>
        <div className=' overflow-hidden rounded-xl w-[4rem] bg-[#F3F3F3]'>
          <img src='avatar.svg' alt='' className='w-full' />
        </div>
      </div>
      <div className=' w-full border-y-2 py-3 text-center'>
        <p className=' font-sans text-primary'>{dateString}</p>
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <Button disabled={false}>Check In</Button>
      </div>
    </div>
  )
}

export default Home
