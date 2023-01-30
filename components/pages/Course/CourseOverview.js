import React, { useState } from 'react'
import stats from '../../../assets/images/icons/statistics.png'
import connection from '../../../assets/images/icons/connecion.png'
import message from '../../../assets/images/icons/message.svg'
import poster from '../../../assets/images/icons/poster.png'
import like from '../../../assets/images/icons/like.png'
import Container from '../../layout/Container'
import { ReadMoreComponent } from '../../../utils/utils'

export default function CourseOverview({ description, highlights }) {
  const [readMore, setReadMore] = useState(false)
  const keyPoints = [
    {
      title: highlights?.[0],
      icon: stats.src,
    },
    {
      title: highlights?.[1],
      icon: connection.src,
    },
    {
      title: highlights?.[2],
      icon: message.src,
    },
    {
      title: highlights?.[3],
      icon: poster.src,
    },
    {
      title: highlights?.[4],
      icon: like.src,
    },
  ].filter((item) => item.title !== undefined)

  const ravi = description.split('\n')
  const [show, setShow] = useState(false)
  const lengthOfText = description?.length
  const lessShowCharactersCount = Math.round((lengthOfText * 50) / 100)
  return (
    <Container
      name='Overview'
      className=' container mx-auto course_overview grid grid-cols-1 place-items-center md:grid-cols-2 md:gap-10 
         py-10 xl:px-20 px-10 items-center text-[#414141]'
    >
      <div className='text-justify  '>
        <h1 className='lg:text-5xl text-3xl  text-rights font-semibold lg:mb-10'>
          Course Overview
        </h1>
        <div className={'text-xl  text-justify my-5 '}>
          {/* {description.length <= 150 ? (
            <p>{description}</p>
          ) : (
            <ReadMoreComponent
              text={description}
              toggleClass={'text-[#7D23E0] cursor-pointer '}
            />
          )} */}
          {description.length <= 150 ? (
            ravi.map((r, key) => <p key={key}>{r}</p>)
          ) : (
            <div className={''}>
              <p>
                {' '}
                {show
                  ? ravi.map((r, key) => <p key={key}>{r}</p>)
                  : ravi.map((r, key) => <p key={key}>{r}</p>).slice(0, 4)}{' '}
                <span
                  className='text-[#7D23E0] cursor-pointer'
                  onClick={() => setShow(!show)}
                >
                  {show ? 'Read Less' : 'Read More'}
                </span>{' '}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className='lg:px-10 lg:w-[500px] py-5 p-5 ring-2 ring-[#7178D3] rounded-xl h-fit  font-medium  w-fit'>
        <h1 className='text-3xl pb-5'>Key Highlights</h1>
        <div className='space-y-5'>
          {keyPoints.map((item, i) => (
            <div key={i} className='flex items-center space-x-5 my-2'>
              <img className='w-6 h-6' src={item.icon} alt='' />
              <p className='md:text-lg'>{item.title.slice(0, 40)}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
