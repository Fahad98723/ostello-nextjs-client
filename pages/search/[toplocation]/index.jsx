import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../../components/layout/Footer'
import LoadingSpinner from '../../../components/layout/LoadingSpinner'
import MetaHelmet from '../../../components/MetaHelmet'
import CoursesAndInstitutes from '../../../components/pages/Filter/CoursesAndInstitutes'
import Recommended from '../../../components/pages/Filter/Recommended'
import Navbar from '../../../components/pages/HomeLanding/Header/Navbar'
import OstelloConnect from '../../../components/pages/HomeLanding/OstelloConnect'
import OstelloSubscribe from '../../../components/pages/HomeLanding/OstelloSubscribe'
import { urlToTitle } from '../../../components/utils'
import {
  selectSearch,
  setLocationQuery
} from '../../../redux/slices/SearchSlice'
import { setUserLocation } from '../../../redux/slices/UserAnalytics'
import { host } from '../../../utils/constant'

const TopLocation = ({ currentTop }) => {
  const {
    selectedInstituteName,
    filteredCourses,
    filteredInstitutes,
    locationQuery,
    searchQuery,
    filters,
    areaLocation,
    searchByName,
  } = useSelector(selectSearch)
  const { metatitle, metadesc, slugurl, name } = currentTop
  console.log(currentTop)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(()=> {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function(position) {
      dispatch(setUserLocation({latitude:position.coords.latitude,longitude: position.coords.longitude}))
    });
  })
  useEffect(() => {
    if (name) {
      const loc = urlToTitle(name)
      console.log(loc)
      dispatch(setLocationQuery(loc))
    }
  }, [name])

  if (router.isFallback) {
    return <LoadingSpinner />
  }
  console.log(metatitle, metadesc, slugurl, 'meta..')

  return (
    <main className='md:max-w-[1350px] mx-auto '>
      <MetaHelmet k title={metatitle} description={metadesc} link={`https://www.ostello.co.in/search/${slugurl}`} />
      <div className="md:fixed md:top-0 md:z-50 md:bg-white md:max-w-[1350px] w-full mx-auto  md:shadow md:rounded-xl">
      <Navbar />
      {/* <div className=' p-3 rounded-b-xl md:shadow-md '>
        <div className=' md:max-w-[700px] mx-auto grid grid-cols-1 sm:grid-cols-2 divide-gray/30 divide-y sm:divide-x sm:divide-y-0 rounded-md border border-gray p-2  sm:mx-auto bg-white '>
          <div className='w-full'>
            <LocationSearch />
          </div>
          <div className='relative w-full'>
            <Search />
          </div>
        </div>
      </div> */}
      </div>
      <div className="md:mt-[50px]">
      <Recommended {...{ name }} />
      <OstelloConnect />
      <CoursesAndInstitutes />
      <OstelloSubscribe />
      <Footer />
      </div>
    </main>
  )
}

export default TopLocation

export async function getServerSideProps({ params }) {

  console.log(params)
  const location = params.toplocation.replace(/-/g, ' ')
  console.log(location)
  const { data } = await axios.get(`${host}/locations?name=${location}`)
  console.log(data)
  const currentTop = data.message[0]

  if (!data) {
    return {
      notFound: true,
    }
  }
  // Pass post data to the page via props
  return { props: { currentTop } }
}