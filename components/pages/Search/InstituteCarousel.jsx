import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, titleToUrl } from '../../../utils/utils'
import { institutesSelector } from '../../../redux/slices/instituteSlice'
import defaultImage from '../../../assets/images/courseImg.png'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {
    filterInstitute,
  selectSearch,
  setFilteredInstitutes,
} from '../../../redux/slices/SearchSlice'
import axios from 'axios'
import Link from 'next/link'
import InstituteCard from '../../UI/InstituteCard'
import Container from '../../layout/Container'

export default function InstituteCarousel({ visible, hidden }) {
  const carouselRef = useRef({})
  const { institutes } = useSelector(institutesSelector)
  const [isViewMore, setIsViewMore] = useState(false)
  const [itemCount,setItemCount] = useState(15)
  const breakPoints = [
      { width: 320, itemsToShow: 2 },
      { width: 376, itemsToShow: 3 },

      { width: 700, itemsToShow: 6 },
      { width: 1400, itemsToShow: 5 },
      { width: 1800, itemsToShow: 6 },
  ]
  const {locationQuery, selectedInstituteName, filteredInstitutes} = useSelector(selectSearch);
  const dispatch = useDispatch()

//   useEffect(()=>{
//       (locationQuery?.length > 0) && dispatch(filterInstitute())
      
// },[locationQuery,dispatch])
  return (
      <>
          <div
              hidden={hidden}
              style={{
                  background:
                      'linear-gradient(180deg, rgba(122, 129, 220, 0.1) 0%, rgba(196, 196, 196, 0) 100%)',
              }}
              className="py-5 md:px-10  border-[#7178D3]/20 border-l-0 border-r-0 border-2 mb-5"
          >
              <h1
                  hidden={hidden}
                  className="sm:text-center sm:my-5 text-center sm:text-4xl text-2xl"
              >
                  Top institutes for you
              </h1>
              <Container className='px-0'>
        <div className='mb-10'>
          {/* <h1 className='text-2xl sm:text-4xl my-10'>Institutes near you</h1> */}
          <div className='grid xl:grid-cols-3 gap-[50px] my-10'>
            {!isEmpty(filteredInstitutes) ? (
              filteredInstitutes?.map((item, i) => (
                <InstituteCard key={item.id} {...item} />
              ))) : ( 
                !isEmpty(institutes) && (
                  institutes?.slice(0,itemCount).map((item, i) => (
                    <InstituteCard key={item.id} {...item} />
                  ))
              ))
                }
          </div>
          <div
            onClick={() => {
              const itemHandler = () => {
                if (!isViewMore) {
                  setItemCount(30)
                } else {
                  setItemCount(15)
                }
              }
              itemHandler()

              setIsViewMore(!isViewMore)
            }}
            className='text-xl text-primary flex items-center space-x-2 cursor-pointer justify-center'
          >
            <p>{isViewMore ? 'View Less' : 'View More'}</p>
            {isViewMore ? (
              <UpOutlined className='flex items-center text-sm' />
            ) : (
              <DownOutlined className='flex items-center text-sm' />
            )}
          </div>
        </div>
      </Container>
              {/* <div className="md:flex  md:justify-start  my-16 lg:my-20 flex-col justify-center items-center lg:flex-row  lg:space-x-12">
                        <Splide
                            className="md:ml-0 w-full"
                            options={{
                                rewind: true,
                                autoplay: true,
                                pauseOnHover: true,
                                pagination: false,
                                arrows: true,
                                perPage: 3,
                                breakpoints: {
                                    1200: { perPage: 2, gap: '2rem' },
                                    640: { perPage: 1, gap: 0 },
                                },
                            }}
                        >
                            {filteredInstitutes?.length > 0 ? (
                            filteredInstitutes?.map((item,key) => (
                                <>
                                    <SplideSlide className="my-10 flex items-center justify-center">
                                    <InstituteCard {...item} key={key} />
                                    </SplideSlide>
                                </>
                            )))
                            : institutes?.map((item,key) => (
                                <>
                                    <SplideSlide className="my-10 flex items-center justify-center">
                                    <InstituteCard {...item} key={key} />
                                    </SplideSlide>
                                </>
                            ))}
                        </Splide>
                    </div> */}
          </div>
      </>
  )
}
