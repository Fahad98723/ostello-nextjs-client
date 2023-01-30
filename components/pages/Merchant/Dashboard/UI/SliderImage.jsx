import React, { useState } from 'react'
import { FaLinkedinIn } from 'react-icons/fa'

const SliderImage = ({ src, url, name, role }) => {
  const [flip, setFlip] = useState(false)

  return (
    <div
      className='flex flex-col w-4/5'
      onMouseEnter={() => setFlip(true)}
      onMouseLeave={() => setFlip(false)}
    >
      <div className='relative'>
        <img
          src={src}
          alt={`${name}` || ''}
          className={` w-full  rounded-3xl   `}
        />

        <div
          className={`  ${
            flip ? 'flex' : 'hidden'
          }  h-full   overflow-hidden  rounded-3xl w-full`}
          style={{
            background: 'rgba(125, 35, 224, 0.3)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <a href={url} target='_blank' rel='noreferrer'>
          <FaLinkedinIn
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className={` w-max text-gray bg-white text-3xl rounded-md p-1 ${
              flip ? 'flex' : 'hidden'
            } `}
          />
        </a>

        <div className='flex-1'></div>
      </div>
      <h3 className='lg:text-lg  text-primary mt-2 font-semibold text-center'>
        {name}
      </h3>

      <div className='text-desc-gray text-center '>{role}</div>
    </div>
  )
}

export default SliderImage
