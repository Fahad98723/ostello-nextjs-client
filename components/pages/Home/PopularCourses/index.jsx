import React, { useEffect } from 'react'
import { Container } from './index.styled'
// import Carousel from 'react-elastic-carousel'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCourses,
  selectCourse,
} from '../../../../redux/slices/courseSlice'
import CourseCard from './CourseCard'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { isEmpty } from '../../../../utils/utils'

const PopularCourses = () => {
  const { courses } = useSelector(selectCourse)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  if (isEmpty(courses)) return null
  return (
    <Container className='custom overflow-x-hidden px-0 pt-10 w-full'>
      <h2 className='font-dm-sans text-center font-medium mb-10 text-2xl md:text-5xl'>
        Popular Courses
      </h2>

      {!isEmpty(courses) && (
        <div className='mx-auto w-full lg:pl-10 lg:pr-10'>
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
                  <CourseCard {...item} key={item.id} />
                </SplideSlide>
              
            ))}
          </Splide>
        </div>
      )}
    </Container>
  )
}

export default PopularCourses
