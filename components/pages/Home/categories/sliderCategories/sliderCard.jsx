import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'

import { setCategory } from '../../../../../redux/slices/SearchSlice'

const SliderCard = ({ currentValue, className }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <div
      onClick={() => {
        dispatch(setCategory(currentValue.title.toLowerCase()))
        router.push(`/search`)
      }}
      key={currentValue.id}
      className={` overflow-hidden rounded-2xl hover:scale-110 duration-300 transition-all cursor-pointer ${className}`}
      style={{
        boxShadow: '0px 0px 31.2346px -6.24691px rgba(125, 35, 224, 0.15)',
      }}
    >
      <div className=''>
        <img className='h-28 w-40' src={currentValue.src?.src} alt='' />
        <p className='font-dm-sans text-center p-1 text-light-black text-sm font-bold'>
          {currentValue.title}
        </p>
      </div>
    </div>
  )
}

export default SliderCard
