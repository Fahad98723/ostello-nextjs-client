import React, { useEffect, useRef, useState } from 'react'
import { AiFillStar, AiOutlineSearch } from 'react-icons/ai'
import { IoLocationOutline } from 'react-icons/io5'
import {
  clearFilters,
  filterCourse,
  filterInstitute,
  selectSearch,
  setFilteredCourses,
  setFilteredInstitutes,
  setLocationQuery,
  setSelectedInstituteName,
} from '../../redux/slices/SearchSlice'
import { Affix } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses, selectCourse } from '../../redux/slices/courseSlice'
import {
  fetchInstitutes,
  institutesSelector,
} from '../../redux/slices/instituteSlice'
import { isEmpty, titleToUrl } from '../utils'
import { useClickOutside } from '../hooks/useClickOutside'
import {
  geo_api_search_url,
  geo_api_url,
  host,
  isAuthenticated,
} from '../../utils/constant.js'
import axios from 'axios'
import {
  addRecentLocations,
  authSelector,
  logout,
} from '../../redux/slices/authSlice'
import logo from '../../assets/logo_title.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SearchIcon = <AiOutlineSearch />
const LocationIcon = <IoLocationOutline />

const TopNavData = [
  {
    id: 1,
    type: 'location',
    icon: LocationIcon,
    content: '',
    placeholderText: 'Choose location',
  },
  {
    id: 2,
    type: 'search',
    icon: SearchIcon,
    content: '',
    placeholderText: 'Search for courses,institutes',
  },
]

export default function TopSearchBar() {
  const [clicked, setClicked] = useState(1)

  const handleToggle = (id) => {
    if (clicked === id) {
      return setClicked(1)
    }
    setClicked(id)
  }

  const dispatch = useDispatch()

  return (
    <>
      <Affix className='bg-white '>
        <div className='flex items-center justify-center lg:justify-between space-x-2  mx-auto  bg-white lg:px-10 '>
          <Link prefetch={false} href='/' className='hidden lg:block' passHref>
            <img src={logo.src} className='hidden lg:block w-32 lg:w-40 cursor-pointer ' alt='' />
          </Link>
          <div className=' flex  justify-between space-x-2 top-0 max-w-2xl bg-white  p-3 w-full '>
            {TopNavData.map((d, i) => (
              <Tabs
                key={i}
                currentValue={d}
                onToggle={() => handleToggle(d.id)}
                active={clicked === d.id}
                setClicked={setClicked}
              />
            ))}
          </div>

          <div className='hidden lg:block'>
            {!isAuthenticated ? (
              <Link prefetch={false} href={'/login'} passHref>
                <button className=' bg-primary text-white px-10 py-2 rounded-lg'>
                  Login
                </button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  dispatch(logout())
                }}
                className=' bg-primary text-white px-10 py-2 rounded-lg'
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </Affix>
    </>
  )
}
import courseImage from '../../assets/images/courseImg.png'
import videoImage from '../../assets/images/videoImg.png'

export const Card = ({ currentValue }) => {

  const img =
    currentValue.img?.[0]?.url ||
    (currentValue.type === 'course' ? courseImage.src : videoImage.src)
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(currentValue.url)}
      style={{ borderBottom: '1px solid #E8E8E8' }}
      key={currentValue.id}
      className='flex bg-white p-2 cursor-pointer'
    >
      <img src={img.src} className='w-[100px] h-[80px]' alt={currentValue.name} />
      <div className='ml-2'>
        <h4 className='text-lg text-light-black'>{currentValue.name}</h4>
        <div style={{ color: '#939393' }} className='text-base mb-2'>
          {currentValue.type}
        </div>
        <div
          className='flex justify-center items-center w-fit space-x-2 text-white font-semibold'
          style={{
            backgroundColor: '#1CC24B',
            borderRadius: '6px',
            padding: '2px 6px',
          }}
        >
          <span>{currentValue.rate || 0}</span>
          <span>
            <AiFillStar />
          </span>
        </div>
      </div>
    </div>
  )
}

const Tabs = ({ currentValue, onToggle, active, setClicked }) => {
  const { icon, type, id, placeholderText, content } = currentValue
  const [isOpened, setIsOpened] = useState(false)
  const inputRef = useRef({})
  const searchRef = useRef(null)
  const [searchField, setSearchField] = useState('')
  const [locationShow, setLocationShow] = useState(false)
  const [searchShow, setSearchShow] = useState(false)
  const [searchData, setSearchData] = useState([])
  const dispatch = useDispatch()
  const { institutes } = useSelector(institutesSelector)
  const { courses } = useSelector(selectCourse)
  const router = useRouter()
  const { query } = router.query
  const [locationType, setLocationType] = useState('')
  const { userLocation, recentLocations } = useSelector(authSelector)
  const { locationQuery, searchQuery, selectedInstituteName } = useSelector(selectSearch)
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    if (
      !isEmpty(searchData) &&
      (searchField?.length > 1) &&
      active
    ) {
      const temp = searchData?.filter((item) => {
          return item?.keywords
            ?.toLowerCase()
            .includes(searchField?.toLowerCase())
      })
      setFilteredItems(temp)
    }
  }, [searchData, searchField, type, active])

  useEffect(() => {
    dispatch(
      setFilteredCourses(
        filteredItems?.filter((item) => item.type === 'course')
      )
    )
    dispatch(
      setFilteredInstitutes(
        filteredItems?.filter((item) => item.type === 'institute')
      )
    )
  }, [filteredItems])

  useEffect(() => {
    if(searchQuery?.length > 0 ){
       dispatch(filterCourse())
    }
    if(selectedInstituteName?.length > 0 ){
          const filterByName = courses.filter((course) =>{ return course.institute?.name.toLowerCase().includes(selectedInstituteName.toLowerCase())
          })
          console.log(filterByName)
          dispatch(setFilteredCourses(filterByName))
      }
      if(locationQuery.length > 0 ){
           dispatch(filterInstitute())
      }

  },[selectedInstituteName, searchQuery, courses,locationQuery])

  useEffect(() => {
    isEmpty(institutes) && dispatch(fetchInstitutes())
    isEmpty(courses) && dispatch(fetchCourses())

    const courseData = courses.map((item, idx) => {
      const { id, name, ratings, images, slug } = item
      return {
        ...item,
        id,
        name,
        rating: ratings,
        type: 'course',
        url: slug,
        img: images,
        keywords: name,
      }
    })
    const instituteData = institutes.map((item, idx) => {
      const { id, name, rating, images, locations, slug } = item
      const { city, area, state, line1 } = locations[0]
      return {
        ...item,
        id,
        name,
        rating,
        type: 'institute',
        url: `/institute/${slug}`,
        img: images,
        keywords: name + line1 + area + city + state,
      }
    })
    if (!isEmpty(courseData) && !isEmpty(instituteData)) {
      setSearchData([...instituteData, ...courseData])
    }
  }, [courses, institutes, query])

  useEffect(() => {
    inputRef.current.autoFocus = true
    const interval = setInterval(() => {
      if (!filteredItems.length) {
        setSearchShow(false)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [filteredItems])

  useEffect(() => {
    if (locationType.length < 1) {
      dispatch(addRecentLocations({}))
    } else {
      window.localStorage.removeItem('RECENT_LOCATIONS')
      axios
        .get(geo_api_search_url(locationType))
        .then(({ data }) => {
          const { lat, lng } = data?.results[0]?.geometry?.location
          axios
            .get(geo_api_url(lat, lng))
            .then(({ data }) => {
              const root = data.results
              const formattedLocationInformation = {
                formatted: root,
              }
              dispatch(addRecentLocations(formattedLocationInformation))
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }
  }, [locationType])

  const handleChange = (e) => {
    type === 'location'
      ? setLocationType(e.target.value)
      : setSearchField(e.target.value)
    if (e.target.value.length > 0) {
      setSearchShow(true)
    } else {
      dispatch(clearFilters({ courses, institutes }))
    }
  }

  let domNode = useClickOutside(() => {
    setSearchShow(false)
    setLocationShow(false)
  })

  const Scroll = ({ style, children, className }) => {
    return (
      <div
        style={style}
        className={`${className} w-full absolute left-0 mt-5 rounded-xl bg-white`}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      ref={domNode}
      className={
        active
          ? 'relative w-full flex  items-center border border-primary  rounded-full p-2  space-x-1 transition-all duration-700 ease-in border-opacity-40 '
          : 'border-primary border-opacity-40 flex items-center border rounded-full p-2 space-x-1  '
      }
      key={id}
    >
      <div
        onClick={onToggle}
        className={`text-primary text-2xl rounded-full ${
          id === 2 && active && 'order-2'
        }`}
      >
        {icon}
      </div>

      <form
        className='w-full'
        action=''
        onSubmit={(e) => {
          e.preventDefault()
          setSearchShow(false)
          setSearchField(type === 'search' ? searchField : locationType)
          type === 'location'
            ? dispatch(
                setLocationQuery(locationType)
                )
            : dispatch(
                setFilteredCourses(
                  filteredItems.filter((item) => item.type === 'course')
                )
              )
        }}
      >
        {type === 'location' ? (
          <input
            ref={inputRef}
            onClick={() => {
              setIsOpened(!isOpened)
              type === 'location' && setLocationShow(true)
            }}
            autoFocus={true}
            className={` outline-none
            border-none
            w-full
            placeholder:text-sm
            focus:bg-none
             transition-all duration-1000 ease-in
            autofill:bg-transparent ${!active && 'hidden'}`}
            placeholder={placeholderText}
            name={type}
            onChange={handleChange}
            value={locationType || ''}
          />
        ) : (
          <input
            ref={searchRef}
            onClick={() => {
              setIsOpened(!isOpened)
              setSearchShow(true)
            }}
            autoFocus={true}
            className={` outline-none
            border-none
            w-full
            placeholder:text-sm
            focus:bg-none
             transition-all duration-1000 ease-in
            autofill:bg-transparent ${!active && 'hidden'}`}
            placeholder={placeholderText}
            name={type}
            onChange={handleChange}
            value={searchField || ''}
          />
        )}
      </form>
      {type === 'search' && active && (
        <div ref={domNode}>
          {searchShow &&
            (filteredItems.length > 0 ? (
              <Scroll
                style={{
                  boxShadow: '0px 4px 15px rgba(125, 35, 224, 0.2)',
                }}
                className='overflow-y-scroll z-10 max-h-[44vh]'
              >
                {' '}
                {filteredItems.map((item, index) => (
                  <Card key={index} currentValue={item} />
                ))}
              </Scroll>
            ) : (
              <Scroll>
                <div className='flex justify-center items-center my-8 '>
                  No matched Courses or Institutions
                </div>
              </Scroll>
            ))}
        </div>
      )}
      {type === 'location' && active && (
        <div ref={domNode}>
          <Scroll
            style={{
              boxShadow: '0px 4px 15px rgba(125, 35, 224, 0.2)',
            }}
            className='overflow-y-scroll z-10 max-h-[44vh]'
          >
            {' '}
            {(recentLocations.length > 1) && locationShow && (
              <div className='divide-y-[.5px] space-y-5 divide-light-slate/10 font-sm text-gray bg-white'>
                {recentLocations[0]?.formatted?.map((item, idx) => (
                  <>
                    <div key={idx}>
                      {item.formatted_address && (
                        <div
                          className='flex bg-white p-2 cursor-pointer'
                          onClick={(e) => {
                            dispatch(setLocationQuery(item.formatted_address.split(',').splice(0,2).join(' ')))
                            setLocationType(
                              item.formatted_address.split(',').splice(0,2).join(' ')
                              )

                      //       if(locationQuery?.length > 1){
                      //         dispatch(setFilteredInstitutes([]))
                      //         const query = locationQuery.toLowerCase()
                      //         query.split(' ').map((data) => {
                      //             const result = institutesData.filter((item) => {
                      //                return item.keywords?.toLowerCase()
                      //                 .includes(data)
                      //             })
                      //             console.log(result);
                      //                 return result ? dispatch(setFilteredInstitutes(result)) : []
                      //     })
                      // }
                          }}
                        >
                          <p>
                          {item.formatted_address.split(',').length >  3 ? item.formatted_address.split(',').slice(0, 3) : item.formatted_address}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ))}
              </div>
            )}
          </Scroll>
        </div>
      )}
    </div>
  )
}

