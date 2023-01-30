import React, { useState } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'
import Carousel from 'react-elastic-carousel'

import Data from './data'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

export function Card({
  id,
  src,
  title,
  academy,
  shareicon,
  TimerIcon,
  duration,
  ArrowIcon,
  studentnumber,
  EmiIcon,
  EMi,
  rate,
  starticon,
  ratenumber,
  price,
  discount,
}) {
  const [isLiked, setIsLiked] = useState(false)
  const style = {
    color: '#767676',
    margin: '4px 0',
  }
  return (
    <div
      key={id}
      className='single-card rounded-3xl mb-12 relative sm:min-w-[300px] max-w-[400px]'
      style={{ boxShadow: '0px 2px 40px -8px rgba(125, 35, 224, 0.2' }}
    >
      <img src={src} alt={title} className='w-full' />
      <div
        onClick={() => setIsLiked(!isLiked)}
        style={{
          color: '#767676',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
        }}
        className={`lg:text-3xl text-2xl h-10 w-10 lg:h-12 lg:w-12  absolute top-2 right-0 mr-4 mt-4 bg-white flex items-center justify-center rounded-full active:opacity-75 cursor-pointer  ${
          isLiked && 'text-[#FF0000]'
        }`}
      >
        {isLiked ? (
          <HeartFilled className='text-[#FF0000] flex items-center ' />
        ) : (
          <HeartOutlined className='flex items-center' />
        )}
      </div>
      <div className='px-5 py-4'>
        <div className='flex justify-between items-center'>
          <div>
            <h4 style={style} className='font-medium text-xl md:text-2xl'>
              {academy}
            </h4>
            <h5 className='font-semibold text-base'>{title}</h5>
          </div>
          <button
            className='rounded-full  text-lg md:text-3xl p-2'
            style={{
              boxShadow: ' 0px 0px 10px rgba(0, 0, 0, 0.15)',
              color: '#767676',
            }}
          >
            {' '}
            {shareicon}
          </button>
        </div>
        <div className='md:flex items-center hidden'>
          {' '}
          <span style={{ color: '#44DDFF' }} className='mr-2'>
            {TimerIcon}
          </span>
          <span style={style}>{duration}</span>
        </div>
        <div className='md:flex items-center hidden'>
          {' '}
          <span className='mr-2 bg-primary text-white rounded-full'>
            {ArrowIcon}
          </span>{' '}
          <span style={style}>{studentnumber}</span>
        </div>
        <div className='flex justify-between'>
          <div className='hidden md:flex items-center'>
            <span style={{ color: '#0D9F1C' }} className='mr-2'>
              {EmiIcon}
            </span>
            <span style={style}>{EMi}</span>
          </div>
          <div className='flex items-center'>
            <div
              className='flex items-center text-white rounded-md  px-2 font-semibold  my-2 md:mt-0 text-xl lg:text-2xl'
              style={{ backgroundColor: '#FFD130' }}
            >
              <span className='mr-1'>{rate}</span>
              <span>{starticon}</span>
            </div>
            <span
              className='block md:hidden ml-3 text-sm '
              style={{ color: '#BDBDBD' }}
            >
              {ratenumber}
            </span>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-row md:flex-col items-center md:block '>
            <p className='text-light-black font-semibold text-xl md:text-2xl mr-2 md:mr-0 '>
              {price}
            </p>
            <p className='line-through  text-sm' style={{ color: '#E46060' }}>
              {discount}
            </p>
          </div>
          <button className='items-center text-primary text-xl space-x-2 md:flex active:opacity-75 hidden'>
            <span>view details </span>
            <BsArrowRightCircle className='flex items-center' />
          </button>
        </div>
      </div>
    </div>
  )
}

const SingleCard = () => {
  return (
    <Carousel
      showArrows={false}
      breakPoints={[
        { width: 350, itemsToShow: 1 },
        { width: 768, itemsToShow: 2 },
        { width: 900, itemsToShow: 3 },
      ]}
    >
      {Data.map(
        (
          {
            id,
            src,
            title,
            academy,
            shareicon,
            TimerIcon,
            duration,
            ArrowIcon,
            studentnumber,
            EmiIcon,
            EMi,
            rate,
            starticon,
            ratenumber,
            price,
            discount,
            detailsLink,
          },
          i
        ) => (
          <Card
            key={id}
            id={id}
            ArrowIcon={ArrowIcon}
            shareicon={shareicon}
            starticon={starticon}
            src={src}
            academy={academy}
            title={title}
            discount={discount}
            duration={duration}
            studentnumber={studentnumber}
            EMi={EMi}
            price={price}
            rate={rate}
            detailsLink={detailsLink}
            EmiIcon={EmiIcon}
            TimerIcon={TimerIcon}
            ratenumber={ratenumber}
          />
        )
      )}
      {/* {Data.map(
        (
          {
            id,
            src,
            academy,
            title,
            duration,
            studentnumber,
            EMi,
            price,
            discount,
            rate,
            detailsLink,
            EmiIcon,
            TimerIcon,
            ratenumber,
          },
          i
        ) => (
          <CourseCard
            key={id}
            src={src}
            academy={academy}
            title={title}
            duration={duration}
            studentnumber={studentnumber}
            EMi={EMi}
            price={price}
            discount={discount}
            rate={rate}
            detailsLink={detailsLink}
            EmiIcon={EmiIcon}
            TimerIcon={TimerIcon}
            ratenumber={ratenumber}
          />
        )
      )} */}
    </Carousel>
  )
}

export default SingleCard
