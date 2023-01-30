import Link from 'next/link'
import React from 'react'
import Btn from './Btn'
import BgDesktop from '../../../../assets/courses_institutions/course-banner/xyz.png'
import BgMobile from '../../../../assets/courses_institutions/course-banner/course_banner_mobile.svg'
import useScreenWidth from '../../../hooks/useScreenWidth'
import { Container } from './index.styled'

const BannerCard = ({ currentValue }) => {
  const { screenWidth } = useScreenWidth()
  return (
    <div
      key={currentValue.id}
      className=' rounded-2xl relative w-48 md:w-full '
    >
      <img
        src={screenWidth > 768 ? BgDesktop.src : BgMobile.src}
        className='rounded-2xl w-full'
        alt=''
      />
      <div
        className={`text-center absolute w-full z-40 top-0  py-10 bg-[rgba(0,0,0,0.4)] h-full rounded-xl`}
      >
        <h3 className='text-white font-semibold text-3xl md:text-4xl lg:text-6xl my-4'>
          {currentValue.title}
        </h3>
        <p className='text-white font-medium text-xl md:text-3xl w-60 mb-5 mx-auto leading-5'>
          {currentValue.desc}
        </p>
        <Link prefetch={false} href={'/merchant/signup'}>
          <Btn title='Register Now' />
        </Link>
      </div>
    </div>
  )
}

export default BannerCard
