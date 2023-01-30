import React from 'react'
import Arrow from './Arrow'
import teamWorkModel from '../../../../assets/Pages/Home/images/teamWorkModel.webp'
import { useRouter } from 'next/router'

export default function TwoColCard() {
  const router = useRouter()
  return (
    <div onClick={() => {
      router.push('/search/delhi')
    }} className='bg-[#BAE8E8] flex flex-col justify-end rounded-xl relative w-full lg:max-w-[690px] sm:h-auto h-[350px]'>
      <div className='m-5 text-black  absolute top-0'>
        <p className='text-[23px] font-bold'>
          Best discount offers at your nearest location.
        </p>
        <Arrow url={'/search/delhi'} />
      </div>
      <div className='flex justify-center sm:justify-end mt-5 '>
        <img
          src={teamWorkModel.src}
          className='md:w-[420px] md:h-[266px] w-[300px] rounded-br-xl pt-5'
          alt='Best discount offers at your nearest location - Ostello'
        />
      </div>
    </div>
  )
}
