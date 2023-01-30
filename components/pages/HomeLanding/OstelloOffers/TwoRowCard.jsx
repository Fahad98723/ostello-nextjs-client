import { useRouter } from 'next/router'
import React from 'react'

import collegeGirlModel from '../../../../assets/Pages/Home/images/collegeGirlModelMobile.webp'
import collegeGirlModelMobile from '../../../../assets/Pages/Home/images/collegeGirlModelMobile.webp'
import Arrow from './Arrow'
export default function TwoRowCard() {
  const router = useRouter()
  return (
    <div onClick={() => {
      router.push('/search/delhi')
    }} className='bg-[#A96BA8] flex justify-end flex-col rounded-xl w-full lg:max-w-[370px] relative sm:h-auto h-[370px]'>
      <div className='m-5 text-white absolute top-0'>
        <p className='text-[21px] md:text-[23px] font-bold'>
          10% discount on all courses. First come first serve basis. Avail it
          now oke.
        </p>
        <Arrow url={'/search/delhi'} />
      </div>
      <div className='flex justify-center  mt-5 '>
        <img
          src={collegeGirlModel.src}
          className='w-[400px] h-full hidden lg:block'
          alt='10% discount on all courses - Ostello'
        />
        <img
          src={collegeGirlModelMobile.src}
          className=' lg:hidden w-[250px]'
          alt='10% discount on all courses - Ostello'
        />
      </div>
    </div>
  )
}
