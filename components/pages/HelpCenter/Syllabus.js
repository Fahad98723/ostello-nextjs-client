import { DownOutlined, UpOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCourse } from '../../../redux/slices/courseSlice'
import { isJsonParsable } from '../../../utils/utils'

import Container from '../../layout/Container'

export default function Syllabus() {
  const [activeKey, setActiveKey] = useState(null)
  const { currentCourse } = useSelector(selectCourse)
  const syllabus = currentCourse.syllabus

  return (
    <div name='Syllabus' className='bg-[##E5E5E5]'>
      <Container className={'py-20'}>
        <h1 className='my-10 text-3xl md:text-5xl text-center font-bold'>
          What's in the course
        </h1>
        <div className=' px-5'>
          {isJsonParsable(syllabus)
            ? JSON.parse(syllabus)
            : syllabus.map((item, i) => (
                <div
                  key={i}
                  className='lg:w-[1000px] my-2 text-white mx-auto '
                  onClick={() => setActiveKey(i === activeKey ? null : i)}
                >
                  <div className='bg-[#6E3DA5] flex justify-between rounded-md cursor-pointer active:opacity-75 px-3 py-4   '>
                    <div className='flex space-x-2 justify-center items-center ml-2 text-md md:text-xl  '>
                      <DownOutlined
                        className={`flex justify-center transition-all duration-300 ease-in-out ${
                          activeKey === i && 'rotate-180'
                        }`}
                      />
                      <p className=''>
                        Part {i + 1} - {item.title}
                      </p>
                    </div>
                    <div className='md:flex space-x-2 items-center  hidden'>
                      <p className='text-md'>{item.lectures} lectures</p>.
                      <p className='text-md'>{item.hours} hours</p>
                    </div>
                  </div>

                  <div className=''>
                    <p
                      className={
                        activeKey === i
                          ? 'text-black ring-2 p-2 rounded-lg md:text-lg mt-1 mb-5 '
                          : 'hidden'
                      }
                    >
                      {item.description.split('\n').map((r, idx) => (
                        <p key={idx}>{r}</p>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </Container>
    </div>
  )
}
