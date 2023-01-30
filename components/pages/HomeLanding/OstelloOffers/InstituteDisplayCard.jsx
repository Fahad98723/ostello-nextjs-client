import React from 'react'

import graduationModel from '../../../../assets/Pages/Home/images/graduationModel.webp'

export default function InstituteDisplayCard() {
  return (
    <div className='bg-[#F1B5C7] mr-5 flex justify-end flex-col rounded-xl w-full  relative  h-[350px]'>
      <div className='m-5 absolute top-0 '>
        <p className='text-[21px] md:text-[23px] font-bold'>
          Achieve your goal with Ostello
        </p>
      </div>
      <div className='flex justify-center mt-10 '>
        <img
          src={graduationModel.src}
          className='lg:w-[320px]  w-[350px]'
          alt='achieve your goal with ostello'
        />
      </div>
    </div>
  )
}
