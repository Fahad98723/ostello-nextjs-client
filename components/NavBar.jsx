import React, { useEffect, useState } from 'react'
import Logo from '../assets/LogoWithText.svg'
import { FiSearch } from 'react-icons/fi'
import Link from 'next/link'

export const NavBar = ({ className, atStart }) => {
  const [isExpanded, setIsExpanded] = useState(atStart)
  const [atTop, setAtTop] = useState(atStart)

  useEffect(() => {
    const threshold = 0
    let lastScrollY = typeof window !== 'undefined' && window.pageYOffset
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = typeof window !== 'undefined' && window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }
      setIsExpanded(scrollY === lastScrollY || scrollY <= 30)
      setAtTop(scrollY <= 30)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        typeof window !== 'undefined' && window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    typeof window !== 'undefined' && window.addEventListener('scroll', onScroll)
    // console.log("Scroll down " + isExpanded);

    return () => typeof window !== 'undefined' && window.removeEventListener('scroll', onScroll)
  }, [isExpanded])

  return (
    <nav
      className={`${className} ${
        atTop ? 'lg:bg-primary' : 'lg:bg-white'
      } bg-white text-white h-20 lg:h-fit flex flex-row lg:flex-col px-4 py-4 ${
        !atTop && 'shadow-lg'
      } z-10`}
    >
      {/* For Mobile Only */}
      <div className='flex-1 bg-white flex justify-center items-center drop-shadow-lg h-full lg:hidden rounded-full px-2'>
        <p className=' font-dm-sans flex-1 px-8 py-2 rounded-l-full text-slate'>
          Search here
        </p>

        <button
          className={`bg-secondary w-10 h-10 flex justify-center items-center rounded-full`}
        >
          <FiSearch
            size={24}
            className='text-primary transition-all hover:scale-[1.2] hover:rotate-6'
            strokeWidth={2}
          />
        </button>
      </div>

      {/* For Desktop Only */}
      <div className='px-12 lg:flex w-full hidden'>
        <Link prefetch={false} href='/'>
          <img src={Logo} alt='' className='h-8 w-auto' />
        </Link>

        <div className='flex-1 flex-col space-y-6'>
          {isExpanded && (
            <div className='flex justify-center items-center space-x-4'>
              <React.Fragment>
                <NavBarItem atTop={atTop} text='About Us' />
                <NavBarItem atTop={atTop} text='Courses' />
                <NavBarItem atTop={atTop} text='List Your Institute' />
              </React.Fragment>
            </div>
          )}
          <div className='text-black w-full flex justify-center items-center'>
            <div
              className={`bg-secondary rounded-full h-fit flex ${
                isExpanded ? 'p-2 min-w-4/6' : 'p-1 w-72'
              } items-center transition-all ease-in-out`}
            >
              {isExpanded ? (
                <React.Fragment>
                  <InSearchButton
                    label='Location'
                    tagline='lorem ipsum lorem?'
                    className='border-r-[1px] border-light-gray '
                  />
                  <InSearchButton
                    label='Online/Offline'
                    tagline='Medium of Education'
                    className='border-r-[1px] border-light-gray '
                  />
                  <InSearchButton
                    label='Courses/Grades'
                    tagline='What do you want to study?'
                    className=''
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    className='px-6 w-full  font-dm-sans'
                    onClick={() => setIsExpanded(true)}
                  >
                    Search here
                  </button>
                </React.Fragment>
              )}

              <div className='flex-1'></div>

              <button
                className={`${
                  isExpanded ? 'w-12 h-12' : 'w-10 h-8'
                } bg-white flex justify-center items-center rounded-full`}
              >
                <FiSearch
                  size={isExpanded ? 32 : 16}
                  className='text-primary transition-all hover:scale-[1.2] hover:rotate-6'
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>

        <div className='w-fit'>
          <NavBarItem atTop={atTop} text='Login/Signup' />
        </div>
      </div>
    </nav>
  )
}

const NavBarItem = ({ text, atTop }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <button
      className={`${
        atTop ? ' text-white ' : ' text-primary '
      }  font-dm-sans font-medium text-lg px-2 flex flex-col justify-center items-center space-y-1`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <p>{text}</p>
      <div
        className={`${isHover ? 'w-2 opacity-100 ' : 'w-0 opacity-0 '} ${
          atTop ? 'bg-white ' : 'bg-primary '
        } h-1 transition-all rounded-full`}
      ></div>
    </button>
  )
}

const InSearchButton = ({ label, tagline, className }) => {
  return (
    <button className={`${className} text-left px-6  font-dm-sans min-w-1/5`}>
      <p className={`font-bold text-slate transition-all`}>{label}</p>
      <p className={`text-gray transition-all truncate`}>{tagline}</p>
    </button>
  )
}
