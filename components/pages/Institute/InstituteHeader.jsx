import React, { useEffect, useState } from 'react'

import {
  HeartFilled,
  HeartOutlined,
  PlayCircleFilled,
  ShareAltOutlined,
  StarFilled,
} from '@ant-design/icons'

import toast from 'react-hot-toast'
import Carousel from 'react-elastic-carousel'
import videoImage from '../../../assets/images/videoImg.png'
import locationIcon from '../../../assets/images/icons/location.svg'
import { useRouter } from 'next/router'
import SharePopup from '../../UI/SharePopup'
import imgProto from '../../../assets/images/icons/img.svg'
import { useSelector } from 'react-redux'
import { institutesSelector } from '../../../redux/slices/instituteSlice'
import { isEmpty, titleToUrl } from '../../utils'
import VideoPlayer from '../../VideoPlayer'
import Head from 'next/head'
import useScreenWidth from '../../hooks/useScreenWidth'

export default function InstituteHeader({currentInstitute}) {
  const [isActiveHeart, setHeart] = useState(false)
  const [contents, setContents] = useState([])
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [loadInactive, setLoadInactive] = useState(false)
  const { screenWidth } = useScreenWidth()
  useEffect(() => {
    if (!isEmpty(currentInstitute)) {
      let videos = currentInstitute.videos
      let images = currentInstitute.images
      setContents(
        []
          .concat(
            videos?.map((item) => {
              return { ...item, type: 'video' }
            })
          )
          .concat(
            images?.map((item) => {
              return { ...item, type: 'image' }
            })
          )
      )
      return
    }

    if (!isEmpty(currentInstitute.updatedRequest.videos) && loadInactive) {
      let videos = currentInstitute.updatedRequest.videos
      let images = currentInstitute.updatedRequest.images
      setContents(
        []
          .concat(
            videos?.map((item) => {
              return { ...item, type: 'video' }
            })
          )
          .concat(
            images?.map((item) => {
              return { ...item, type: 'image' }
            })
          )
      )
    }
  }, [currentInstitute, loadInactive])
  const { classmode, workinghours, locations, slug } = currentInstitute

  const { line1, line2, state, country } = locations?.[0]

  let time = '14:15 to 17:15'

  const TwentyFourToTwelveHour = (textTime) => {
    console.log(textTime, 'textTFime')
    let [starting, ending] = textTime?.split(' to ')
    const converter = (time) => {
      let prefix = ''
      let updatedHour = ''
      let [hour, min] = time.split(':')
      if (hour > 12) {
        prefix = 'PM'
        updatedHour = (Number(hour) % 12).toString()
      } else {
        updatedHour = hour
        prefix = 'AM'
      }

      let convertedTime = `${updatedHour}:${min} ${prefix}`
      return convertedTime
    }

    let updatedTime = `${converter(starting)} to ${converter(ending)}`

    return updatedTime
  }

  const [timings, setTimings] = useState('')

  useEffect(() => {
    if (!isEmpty(workinghours)) {
      let time = TwentyFourToTwelveHour(workinghours)
      setTimings(time)
    }
  }, [workinghours])

  // const [viewPort, setViewPort] = useState({
  //   width: document.documentElement.clientWidth,
  //   height: document.documentElement.clientHeight
  // });
  // const [share, setShare] = useState(false);

  // useEffect(() => {
  //   const handleResize = (e) => {
  //     setViewPort({
  //       width: document.documentElement.clientWidth,
  //       height: document.documentElement.clientHeight
  //     });
  //   };
  //   window.addEventListener("resize", handleResize);
  // });

  return (
    <div name='Header' className=' '>
      <div className='bg-[#282828] py-5 md:py-20 '>
        <div className=' px-3 sm:px-20 container mx-auto  text-white lg:flex  flex-row-reverse justify-between '>
          <section className='lg:w-5/12'>
            <Carousel
              itemsToShow={1}
              showArrows={screenWidth > 768 && contents.length > 1  ? true : false}
              pagination={false}
              renderPagination={({ pages, activePage, onClick }) => {
                return (
                  <div className='flex items-center space-x-2 '>
                    {pages?.map((page,i) => {
                      const isActivePage = activePage === page
                      return (
                        <div
                          className={`cursor-pointer  h-2 rounded-lg my-5 transition-all duration-500 ease-in-out ${
                            isActivePage ? 'bg-white w-28 ' : 'bg-gray/20 w-6'
                          }`}
                          key={i}
                          onClick={() => onClick(page)}
                          // active={isActivePage}
                        />
                      )
                    })}
                  </div>
                )
              }}
            >
              {contents.map((item, i) => (
                <div
                  key={i}
                  className='video_container w-full md:w-[600px]'
                >
                  {item.type === 'video' ? (
                    <div className='border relative border-white rounded-xl overflow-hidden h-fit aspect-video'>
                      <VideoPlayer
                        thumbnailURL={item.thumbnail.url}
                        videoURL={item.video.url}
                      />
                      <div
                        onClick={() => router.push(slug + '/gallery')}
                        className=' group absolute top-5 right-5 md:top-5 md:right-5 p-3 bg-white border-solid border-primary border flex rounded-lg gap-2 transition-all ease-in-out duration-30 cursor-pointer'
                      >
                        <img src={imgProto.src} className='w-[10px] text-primary' alt='' />
                        <p className='text-[#414141] hidden group-hover:block   '>
                          See more
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className='border relative border-white rounded-xl overflow-hidden h-fit'>
                      <img src={item.url} className='w-full' alt='' />
                    </div>
                  )}
                </div>
              ))}
              {isEmpty(contents) && (
                <>
                  {[1].map((item, i) => (
                    <div key={i} className='video_container'>
                      <div className='relative'>
                        <img
                          src={videoImage.src}
                          className=' w-full xl:w-[700px] '
                          alt=''
                        />
                        <PlayCircleFilled
                          className='
                            text-black/90
                            absolute
                            text-6xl cursor-pointer active:opacity-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110 duration-300'
                        />
                        <div
                          onClick={() => router.push(slug + '/gallery')}
                          className=' group absolute top-5 right-5 md:top-10 md:right-10 p-3 bg-white flex rounded-lg gap-2 transition-all ease-in-out duration-300  cursor-pointer'
                        >
                          <img src={imgProto.src} className='w-[10px] text-primary' alt='' />
                          <p className='text-[#414141] hidden group-hover:block   '>
                            See more
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Carousel>
          </section>
          <div className='lg:w-6/12'>
            <section className=' my-1 cursor-pointer  '>
              <div className=" text-3xl xl:text-6xl lg:text-4xl flex flex-col  font-extrabold md:space-y-5">
                <span>{currentInstitute.name} </span>
              </div>
              <p className='text-sm mt-3 xl:text-lg text-[#d8d8d8]'>
                {classmode === 1
                  ? ' Online | Timings :24 Hours'
                  : classmode === 2
                  ? ` Offline | Timings : ${timings || ' not available'}`
                  : classmode === 3 &&
                    ` Hybrid | Timings : ${timings || ' not available'}`}{' '}
              </p>
            </section>
            <div className='border-b-0 border-l-0 border-r-0 border-2 border-dashed w-full my-5 hidden md:block' />

            <section className='  md:flex justify-between  text-[#d8d8d8] '>
              <div className=' flex flex-col gap-2'>
                <div className='border-b-0 border-l-0 border-r-0 border-2 border-dashed w-full my-2  md:hidden' />
                <div className='flex space-x-2 items-center '>
                  <img className=' md:h-8 mt-2' src={locationIcon.src} alt='' />
                  <p className=' md:text-lg  '>
                    {/* 273/2, Shahabad Mohammadpur, Vasant <br /> Kunj, New
                    Delhi-110061 */}
                    {!isEmpty(locations?.[0]) && (
                      <>
                        {line1} {line2} {state} {country}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </section>

            <section className='statistics mt-10 xl:mb-8 mb-4 '>
              <>
                <div className='info flex items-center sm:justify-between  space-x-5 '>
                  <div className='flex space-x-2 items-center'>
                    <div className=' rating flex xl:space-x-2 justify-between items-center bg-[#FFD130] px-2 py-1  md:text-xl text-sm rounded-md font-bold'>
                      <p className=''>{currentInstitute.rating}</p>
                      <StarFilled />
                    </div>
                    <p className=' md:text-lg text-[#d8d8d8]'>
                    {currentInstitute.studentsenrolled || 0} students enrolled
                    </p>
                  </div>
                  <div className='actions flex space-x-5 md:text-2xl'>
                    {isActiveHeart ? (
                      <HeartFilled
                        onClick={() => setHeart(!isActiveHeart)}
                        className={`flex   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm  items-center justify-center cursor-pointer  text-[#FF0000] md:ring-2 ring-1 ring-white text-sm md:text-2xl `}
                      />
                    ) : (
                      <HeartOutlined
                        onClick={() => {
                          setHeart(!isActiveHeart)
                          toast.success('Added to Wishlist')
                        }}
                        className={`flex items-center text-sm  text-white   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm justify-center cursor-pointer   md:ring-2 ring-1 ring-white md:text-2xl`}
                      />
                    )}

                    <ShareAltOutlined
                      onClick={() => setOpen(true)}
                      className='active:opacity-80 flex items-center text-sm  text-white   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm justify-center cursor-pointer   md:ring-2 ring-1 ring-white md:text-2xl r'
                    />
                  </div>
                  <SharePopup
                    TextToCopy={
                      typeof window !== 'undefined' && window.location.href
                    }
                    open={open}
                    onClose={() => setOpen(false)}
                  />
                </div>
              </>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
