import { CloseOutlined, ImportOutlined, MenuOutlined } from '@ant-design/icons'
import { Affix } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import logo from '../../assets/images/logo.svg'
import logoWH from '../../assets/images/logoWhiteBG.svg'
import { authSelector, getUser, logout, setAuthModalState } from '../../redux/slices/authSlice'
import AuthModal from '../pages/HomeLanding/Header/Navbar/AuthModal'

export default function Navbar({ links, primaryBG = '#7A81DC' }) {
  const [isAffixed, setIsAffixed] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const iconStyle = `flex items-center text-2xl `
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated, userData, instituteDetails } =
    useSelector(authSelector)
  let userName = userData?.name
  const [open, setOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(0)
  const handleClose = () => {
    setOpen(false)
  }
  const handleActiveModal = (index,open) => {
  setActiveModal(index)
  }
  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <div className=''>
      <AuthModal handleClose={handleClose} handleActiveModal={handleActiveModal} activeModal={activeModal} open={open}/>
      <Affix offsetTop={0} onChange={(e) => setIsAffixed(e)} className=''>
        <div
          className={
            isAffixed
              ? 'py-1 relative bg-white '
              : `py-1 bg-[${primaryBG}] relative`
          }
        >
          <>
            <div
              className={` absolute  inset-0   h-screen rounded-l-2xl px-5 py-10 flex flex-col justify-around bg-[#ffffff]  md:hidden   z-[100] ease-in-out transition-all duration-300 shadow-2xl ml-auto  w-[85%] ${
                isActive ? 'translate-x-0  ' : 'translate-x-full'
              } `}
            >
              <div className='flex justify-between items-center'>
                <img
                  onClick={() => router.push('/')}
                  className={`w-32 md:hidden cursor-pointer `}
                  src={logoWH.src}
                  alt=''
                />
                <CloseOutlined
                  className='text-2xl flex items-center'
                  onClick={() => setIsActive(false)}
                />
              </div>
              <div className='ml-5 '>
                {links.map((item, i) => (
                  <div
                    key={i}
                    className={`flex  space-x-5  items-center py-2 cursor-pointer text-lg font-medium my-2  active:text-[#7D23E0] `}
                  >
                    <span
                      className={`${
                        i === activeSection
                          ? ' text-[#7D23E0]'
                          : 'text-[#414141]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <Link prefetch={false} href={`#${item.title}`}>
                    <a
                    onClick={() => {setIsActive(!isActive)
                      setActiveSection(i)}}
                      href=""
                      smooth="true"
                      spy='true'
                      className={`w-fit cursor-pointer text-md xl:text-xl whitespace-nowrap   active:text-[#7D23E0] mx-2 ${
                        i === activeSection
                          ? ' text-[#7D23E0]'
                          : isAffixed
                          ? 'text-[#414141]'
                          : 'text-white'
                      }`}
                      key={i}
                    >
                      {item.title}
                    </a>
                    </Link>
                  </div>
                ))}
              </div>
              <div>
                <div
                  className={`flex ml-5   space-x-5  items-center py-2 cursor-pointer text-lg  my-5  active:text-[#7D23E0]`}
                >
                  {isAuthenticated ? (
                    <div
                        onClick={() => {
                          userData.usertype === 2
                            ? router.push('/merchant/dashboard/profile')
                            : userData.usertype === 3 && router.push('/profile')
                        
                      }}
                      className='bg-primary h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer hover:scale-110 duration-300 '
                    >
                      {userName?.slice(0, 1).toUpperCase()}
                    </div>
                  ) : (
                    <>
                      <span className='text-[#414141]'>
                        <ImportOutlined className={iconStyle} />
                      </span>
                      <span
                        onClick={() =>{
                          setOpen(true)
                          setActiveModal(1)
                        } }
                        smooth="true"
                        spy='true'
                        activeClass=''
                      >
                        Login
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>

          <div className={isAffixed ? 'bg-white  ' : `bg-[${[primaryBG]}]`}>
            <nav
              className={`relative container mx-auto flex md:space-x-5 items-center justify-between   py-2 px-5 md:px-10   md:flex `}
            >
              <img
                onClick={() => router.push('/')}
                className={`w-32  md:w-40 xl:w-40 `}
                src={isAffixed ? logoWH.src : logo.src}
                alt=''
              />
              <MenuOutlined
                onClick={() => setIsActive(true)}
                className={`text-2xl flex items-center sm:hidden ${
                  isAffixed ? 'text-[#7d23e0]' : 'text-white'
                }`}
              />

              <div className='md:flex items-center w-full justify-evenly  hidden select-none '>
                {links.map((item, i) => (
                  <div
                    key={i}
                    className='flex flex-col justify-center items-center py-2  '
                  >
                    <Link prefetch={false} href={`#${item.title}`}>
                    <a
                      onClick={() => {setIsActive(!isActive)
                        setActiveSection(i)}}
                      href=""
                      smooth="true"
                      spy="true"
                      className={`w-fit cursor-pointer text-md xl:text-xl whitespace-nowrap   active:text-[#7D23E0] mx-2 ${
                        i === activeSection
                          ? ' text-[#7D23E0]'
                          : isAffixed
                          ? 'text-[#414141]'
                          : 'text-white'
                      }`}
                      key={i}
                    >
                      {item.title}
                    </a>
                    </Link>
                    <div
                      className={
                        ' h-1 w-[50%] rounded-lg   ' +
                        (i !== activeSection
                          ? 'bg-["transparent"] '
                          : 'bg-[#7D23E0]')
                      }
                    />
                  </div>
                ))}
              </div>

              {isAuthenticated ? (
                <div className='md:flex items-center space-x-2 hidden'>
                  <div
                    onClick={() =>
                      router.push(
                        userData.usertype === 2
                          ? '/merchant/dashboard/profile'
                          : userData.usertype === 3 && '/profile'
                      )
                    }
                    className='bg-primary h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer hover:scale-110 duration-300 '
                  >
                    {userName?.slice(0, 1).toUpperCase()}
                  </div>
                  {/* <div
                    onClick={() => dispatch(logout())}
                    className={`  font-medium   lg:text-xl md:px-8 px-4 md:py-2 py-1  md:text-lg rounded-md active:opacity-80 sm:block hidden cursor-pointer ${
                      isAffixed
                        ? 'bg-[#7D23E0] text-[#ffffff]'
                        : 'text-[#7D23E0] bg-[#ffffff]'
                    }`}
                  >
                    Logout
                  </div> */}
                </div>
              ) : (
                <div
                onClick={() => {
                  setOpen(true)
                  dispatch(setAuthModalState(2))
              }}
                  className={`  font-medium   lg:text-xl md:px-8 px-4 md:py-2 py-1  md:text-lg rounded-md active:opacity-80 sm:block hidden cursor-pointer ${
                    isAffixed
                      ? 'bg-[#7D23E0] text-[#ffffff]'
                      : 'text-[#7D23E0] bg-[#ffffff]'
                  }`}
                >
                  Login
                </div>
              )}
            </nav>
          </div>
        </div>
      </Affix>
    </div>
  )
}
