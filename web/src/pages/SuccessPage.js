import React from 'react'
import Lottie from 'react-lottie'
import image from '../assets/success.png'

import CustomLink from '../Components/CustomLink'
import animationData from '../assets/confetti.json'
function SuccessPage () {
  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
    <>
      <Lottie
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        options={lottieOptions}
        height={300}
        width={300}
      />
      <div className=' w-full h-[100vh] p-4 flex flex-col items-center justify-center'>
        <img src={image} alt='' className='w-full max-w-xl' />
        <p className='text-3xl font-sans text-center my-4 mx-2'>
          You Checked In <span className='text-primary '>Sucessfully</span>
        </p>
        <CustomLink path='/'>Done</CustomLink>
      </div>
    </>
  )
}

export default SuccessPage
