import React from 'react'
import Arrow from './Arrow'
import schoolBoyModel from '../../../../assets/Pages/Home/images/schoolBoyModel.webp'
import { useRouter } from 'next/router'
export default function ListingCard() {
  const router = useRouter()
  return (
    <div 
    onClick={() => {
      router.push('/search/delhi')
    }} className='bg-[#62529D] flex justify-end relative flex-col rounded-xl text-white w-full lg:max-w-[330px] sm:h-full h-[350px]'>
      <div className='m-5 absolute top-0'>
        <p className='text-[21px] md:text-[23px] font-bold'>
          Avail the services now to grow with Ostello
        </p>
        <Arrow url={'/search/delhi'} />
      </div>
      <div className='flex justify-end mt-20'>
        <img
          src={schoolBoyModel.src}
          className='lg:w-full  w-[250px]'
          alt=' Avail the services now to grow with Ostello'
        />
      </div>
    </div>
  )
}
