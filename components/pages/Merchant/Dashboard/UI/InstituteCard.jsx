import {
  ArrowRightOutlined,
  HeartFilled,
  HeartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import instituteImage from '../../assets/images/institute.png'
import { isEmpty } from '../../utils/utils'
import emiIcon from '../../assets/icons/emi.svg'
import enrolledIcon from '../../assets/icons/enrolled.svg'
import locationIcon from '../../assets/icons/location.svg'
import Link from 'next/link'
import { useCopyToClipboard } from 'react-use'
import { toast } from 'react-hot-toast'
import { BsArrowRight } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { filterCourse, filterInstitute, setSelectedInstituteName } from '../../redux/slices/SearchSlice'
import { useRouter } from 'next/router'

export default function InstituteCard({
  id,
  name,
  services,
  studentsenrolled,
  rating,
  // isFavorite,
  // emi,
  locations,
  courses,
  slugUrl,
  images,
  coupons,
}) {
  const colors = ['green-400', 'yellow-500', 'red-500', 'blue-600']
  const [activeColor, setActiveColor] = useState()

  const [isFavorite, setIsFavorite] = useState(false)
  const [state, copyToClipboard] = useCopyToClipboard()
  const imageURL = images?.[0]?.url || instituteImage?.src
  const coupon = coupons?.[0] || '50% off | Use WELCOME50'
  const router = useRouter()
  const [courseNames, setCourseNames] = useState([])
  useEffect(() => {
    const names = courses?.map((item) => item.name)
    setCourseNames([...new Set(names)].slice(0, 5))
    setActiveColor(colors[Math.floor(Math.random() * colors.length)])
  }, [])

  useEffect(() => {
    if (state.value?.length) {
      toast.success(`"${state.value}" is copied !`)
    }
  }, [])
  const { area, city } = locations?.[0]

  const dispatch   = useDispatch()

  return (
    <>

     <div  className=' h-full min-h-[480px]'>
     <div style={{boxShadow: '0px 0px 38.7368px -7.74737px rgba(125, 35, 224, 0.15)'}} className=' hover:scale-105  duration-300  relative rounded-xl  sm:w-[370px] w-full   '>
        {/* <div
          onClick={() => {
            copyToClipboard('WELCOME50')
          }}
          className='absolute top-10 right-0 bg-primary px-4 py-1 text-white cursor-pointer'
        >
          {coupon}
        </div> */}
        <div className='p-4 select-none  '>
          <Link prefetch={false} href={slugUrl}>
            <a href='' className='flex items-center justify-center'>
              <img
                src={imageURL}
                className='w-full h-[180px] md:h-fit   rounded-xl'
                alt=''
              />
            </a>
          </Link>

          <div className='divide-y divide-gray/60'>
            <div>
              <div className='flex justify-between items-center  '>
                <Link prefetch={false} href={slugUrl}>
                  <a href=''>
                    <h1 className='text-2xl font-bold my-2'>{name}</h1>
                  </a>
                </Link>

                <div
                  className={` bg-green-600 border text-white flex items-center h-fit w-fit justify-center space-x-1 px-2 rounded-md font-bold text-lg`}
                >
                  <p className=''>{rating}.0</p>
                  <StarFilled />
                </div>
              </div>
              <div className='flex justify-between items-center pb-2 text-gray  font-normal  '>
                <div className=''>
                  {!isEmpty(courseNames) ? (
                    <>
                      {courseNames.slice(0,3).map((item, key, arr) => (
                        <span key={key}>
                          {key + 1 === arr.length ? (
                            <span className='text-[18px] font-normal  '>{item}</span>
                          ) : (
                            <span className='text-[18px] font-normal leading-[24px]'>{item}, </span>
                          )}
                        </span>
                      ))}
                    </>
                  ) : (
                    <span>Currently No course available .</span>
                  )}
                </div>
                <div
                  onClick={() => {
                    setIsFavorite((prv) => !prv)
                  }}
                  className={`rounded-full text-2xl shadow-xl text-gray flex items-center justify-center cursor-pointer p-1 `}
                >
                  {isFavorite ? (
                    <HeartFilled className='text-[#FF0000] flex items-center ' />
                  ) : (
                    <HeartOutlined className='flex items-center' />
                  )}
                </div>
              </div>
            </div>

            <div className='text-gray text-[16px]'>
              <div className='flex space-x-2 my-2'>
                <img src={enrolledIcon.src} alt='' />
                <p>{studentsenrolled || 0} + Students joined recently</p>
              </div>
              <div className='flex space-x-2 my-2'>
                <img src={emiIcon.src} alt='' />
                <p> Emi Available</p>
              </div>
              <div className='flex space-x-2 my-2'>
                <img src={locationIcon.src} alt='' />
                <p>
                  {area || ''}, {city ||''}
                </p>
              </div>
            </div>

            <div className='flex justify-between pt-4'>
                <button onClick={() => {
                                dispatch(
                                    setSelectedInstituteName(name));
                                router.push('/search');
                            }} className='text-gray underline cursor-pointer'>
                  {courses?.length || 0} courses
                </button>
              <Link prefetch={false} href={slugUrl}>
                <a className='items-center text-black  space-x-1 flex active:opacity-75   '>
                  <span className=''>View details</span>
                  <div className=' border rounded-full  '>
                    <ArrowRightOutlined className='flex items-center p-1 text-sm  ' />
                    {/* <BsArrowRight className='flex items-center m-1 font-bold' />{' '} */}
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}
