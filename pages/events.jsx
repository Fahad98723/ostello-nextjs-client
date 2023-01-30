import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BackgroundGradient from '../assets/background/landing_gradient.png'
import Event_Landing from '../assets/vectors/events_Landing.png'
import useScreenWidth from '../components/hooks/useScreenWidth'
import Footer from '../components/layout/Footer'
import MetaHelmet from '../components/MetaHelmet'
import UpcomingEvent from '../components/pages/Events/UpcomingEvent'
import Navbar from '../components/pages/HomeLanding/Header/Navbar'
import { setUserLocation } from '../redux/slices/UserAnalytics'

const Events = ({meta}) => {
  const { screenWidth } = useScreenWidth()
  const dispatch = useDispatch()
  useEffect(()=> {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function(position) {
      dispatch(setUserLocation({latitude:position.coords.latitude,longitude: position.coords.longitude}))
    });
  })
  return (
    <div
      className='font-dm-sans w-screen min-h-screen'
      style={
        screenWidth > 768
          ? {
              backgroundImage: `url(${BackgroundGradient.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100vw 140vh',
              backgroundPosition: '50% 0%',
              marginTop: '70px',
            }
          : {}
      }
    >
      <MetaHelmet title={meta.title} description={meta.description} link={meta.link} />
      <div className="fixed w-full bg-white z-50 top-0 shadow">
      <Navbar />
      </div>
      {/* section-1  */}
      <section className='py-16 px-2  lg:px-6 relative'>
        <div
          className='  w-11/12  bg-opacity-40 m-auto rounded-2xl py-10 lg:py-14 relative  '
          style={{
            backgroundImage: `url(${Event_Landing.src})`,
          }}
        >
          <div
            className='w-full top-0 rounded-3xl h-full absolute '
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backgroundSize: '100vw 200vh',
            }}
          />

          <h1 className='text-center text-white text-3xl  lg:text-6xl font-bold relative  '>
            Great Events for <br /> Great Experiences
          </h1>
          <p className=' px-2 lg:text-xl relative text-white text-center py-4 lg:pt-8  '>
            Ostello hosts exciting events all year round to keep you updated
            about the latest trends and <br /> help you scale your academic
            pathway. So, lock the date and don’t forget to be part of our <br />
            informative and interesting events.{' '}
          </p>
        </div>
      </section>

      {/* section-2  */}
      <section className=''>
        <UpcomingEvent />
        <div className=''></div>
      </section>

      <Footer />
    </div>
  )
}

export default Events

export const getStaticProps = async () => {
  const meta = {
    title: "Events - ostello.co.in",
    description: "To pave your path towards success in the best way possible | Ostello Events | From Webinars to Live sessions, we have it all.",
    link: "https://www.ostello.co.in/events"
  }
  // console.log(data);
  return {
    props: {
      meta,
    },
  };
};