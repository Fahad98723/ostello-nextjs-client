import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'

import { setCategory } from '../../../../../redux/slices/SearchSlice'

const CategoryCard = ({ currentValue, className }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <div
      onClick={() => {
        dispatch(setCategory(currentValue.title.toLowerCase()))
        router.push(`/search`)
      }}
      key={currentValue.id}
      className={`  overflow-hidden m-5 rounded-3xl hover:scale-110 transition-all duration-300 cursor-pointer ${className}`}
      style={{
        boxShadow: '0px 0px 31.2346px -6.24691px rgba(125, 35, 224, 0.15)',
      }}
    >
      <img alt='' className='h-36 w-48' src={currentValue.src?.src} />
      <p className='text-center p-1 text-light-black md:text-lg font-bold font-dm-sans'>
        {currentValue.title}
      </p>
    </div>
  )
}

export default CategoryCard
