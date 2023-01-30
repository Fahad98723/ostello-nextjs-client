import React from 'react'
import imgLoading from '../../assets/slackLoading.gif'

export default function LoadingSpinner() {
  return (
    <div className='h-screen w-screen flex items-center justify-center bg-white'>
      <img src={imgLoading.src} className=' w-20' alt='' />
    </div>
  )
}
