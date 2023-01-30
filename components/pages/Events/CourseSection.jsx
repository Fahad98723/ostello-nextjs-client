import { RightOutlined } from '@ant-design/icons'
import Carousel from 'react-elastic-carousel'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import CourseCard from '../Home/PopularCourses/CourseCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCourse,
  fetchCourses,
} from '../../../redux/slices/courseSlice'
import { institutesSelector } from '../../../redux/slices/instituteSlice'
import { isEmpty } from '../../../utils/utils'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { setSelectedInstituteName } from '../../../redux/slices/SearchSlice'

export default function CourseSection() {
  const { courses } = useSelector(selectCourse)
  const { currentInstitute } = useSelector(institutesSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])
  const router = useRouter()

  console.log(courses);
  return (
    <div
      name='Courses'
      className='xl:px-10 px-5 sm:px-0 py-10 container  mx-auto'
    >
      {!isEmpty(courses) && (
        <section className='mb-20'>
          <div className='flex justify-between items-center  mb-10'>
            <h1 className='md:text-4xl text-3xl font-medium'>
              Similar Courses
            </h1>
            <button
              onClick={() =>{
                dispatch(
                  setSelectedInstituteName(
                      currentInstitute.name
                  )
              );
                 router.push('/search')}}
              className='md:px-4 py-2 w-[157px] text-xl ring-1 md:flex justify-between items-center ring-[#7D23E0] text-[#7D23E0] rounded-lg active:opacity-75 hidden '
            >
              <p>View more</p>
              <RightOutlined className='text-[#7D23E0] text-lg' />
            </button>
          </div>
          <div className='md:flex  md:justify-start  my-16 lg:my-20 flex-col justify-center items-center lg:flex-row  lg:space-x-12'>
            <Splide
              className='md:ml-0 w-full'
              options={{
                rewind: true,
                autoplay: true,
                pauseOnHover: true,
                pagination: false,
                arrows: true,
                perPage: 3,
                breakpoints: {
                  1200: { perPage: 2, gap: '1rem' },
                  640: { perPage: 1, gap: 0 },
                },
              }}
            >
              {courses?.map((item, idx) => (
                <SplideSlide
                  key={idx}
                  className='my-10 flex items-center justify-center'
                >
                  <CourseCard {...item} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
          <button
            onClick={() =>{
              dispatch(
                setSelectedInstituteName(
                    currentInstitute.name
                )
            );
               router.push('/search')}}
            className='my-10 px-4 py-2 w-[150px] text-xl ring-1  mx-auto flex justify-between items-center ring-[#7D23E0] text-[#7D23E0] rounded-lg active:opacity-75 md:hidden '
          >
            <p>View more</p>
            <RightOutlined className='text-[#7D23E0] text-lg' />
          </button>
        </section>
      )}

      {!isEmpty(currentInstitute.courses) && (
        <section className='md:mx-auto'>
          <div className='flex justify-between items-center  mb-10'>
            <h1 className='md:text-3xl text-3xl font-medium '>
              Other Courses by {currentInstitute?.name}
              {/* XYZ <br className='lg:hidden' /> Design Academy */}
            </h1>
            <button
              onClick={() => {
                dispatch(setSelectedInstituteName(currentInstitute.name))
                router.push('/search')
              }}
              className='md:px-4 py-2 w-[157px] text-xl ring-1 md:flex justify-between items-center ring-[#7D23E0] text-[#7D23E0] rounded-lg active:opacity-75 hidden'
            >
              <p>View more</p>
              <RightOutlined className='text-[#7D23E0] text-lg' />
            </button>
          </div>
          <div className='md:flex  md:justify-start  my-16 lg:my-20 flex-col justify-center items-center lg:flex-row  lg:space-x-12'>
            <Splide
              className='md:ml-0 w-full'
              options={{
                rewind: true,
                autoplay: true,
                pauseOnHover: true,
                pagination: false,
                arrows: true,
                perPage: 3,
                breakpoints: {
                  1200: { perPage: 2, gap: '1rem' },
                  640: { perPage: 1, gap: 0 },
                },
              }}
            >
              {currentInstitute?.courses?.map((item) => (
                <>
                  <SplideSlide className='my-10 flex items-center justify-center'>
                    <CourseCard
                      {...item}
                      key={item.id}
                      institute={currentInstitute}
                    />
                  </SplideSlide>
                </>
              ))}
            </Splide>
          </div>
          <button
            onClick={() =>{
              dispatch(
                setSelectedInstituteName(
                    currentInstitute.name
                )
            );
               router.push('/search')}}
            className='my-10 px-4 py-2 w-[150px] text-xl ring-1  mx-auto flex justify-between items-center ring-[#7D23E0] text-[#7D23E0] rounded-lg active:opacity-75 md:hidden '
          >
            <p>View more</p>
            <RightOutlined className='text-[#7D23E0] text-lg ' />
          </button>
        </section>
      )}
    </div>
  )
}
