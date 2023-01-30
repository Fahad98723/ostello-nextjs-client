import {
  HeartOutlined,
  HomeOutlined,
  ImportOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Affix } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import AuthModal from './pages/HomeLanding/Header/Navbar/AuthModal';
import { setAuthModalState } from '../redux/slices/authSlice';
import {useDispatch} from 'react-redux'

export default function BottomNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [activeUrl, setActiveUrl] = useState('/')
  const router = useRouter()
  const dispatch = useDispatch()
  const [open,setOpen] = useState(false)
  const navIconClasses = `
   text-xl
  `
  // useEffect(() => {
  //   router.push(activeUrl)
  // }, [activeUrl, router.push])

  const [scrollPosition, setScrollPosition] = useState(0)
  const [visibleBar, setVisibleBar] = useState(true)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleScroll = () => {
    const position = typeof window !== 'undefined' && window.pageYOffset
    setScrollPosition((prev) => {
      if (prev <= position) {
        setVisibleBar(false)
      }
      if (prev >= position) {
        setVisibleBar(true)
      }

      return position
    })
  }

  useEffect(() => {
    typeof window !== 'undefined' && window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      typeof window !== 'undefined' && window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // console.log(scrollPosition, 'isVIsible?', visibleBar)

  const bottomNavs = [
    {
      title: 'Home',
      url: '/',
      icon: <HomeOutlined className={navIconClasses} />,
    },
    {
      title: 'Wishlist',
      url: '/wishlist',
      icon: <HeartOutlined className={navIconClasses} />,
    },
    {
      title: 'Invite & Earn',
      url: '/inviteAndEarn',
      icon: <UserAddOutlined className={navIconClasses} />,
    },
    {
      title: 'Account',
      url: '/account',
      icon: (
        <UserOutlined
          className={navIconClasses}
          // onClick={() => setIsLoggedIn(false)}
        />
      ),
    },
    {
      title: 'Login',
      url: '/login',
      icon: (
        <ImportOutlined
          className={navIconClasses}
          // onClick={() => setIsLoggedIn(true)}
        />
      ),
    },
  ]

  return (
    <div className={`md:hidden bg-white z-50 ${visibleBar ? '' : 'hidden'}`}>
      <AuthModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      <Affix offsetBottom={0} className=' bg-white  rounded-b-none '>
        <div
          style={{ borderRadiusTop: 'none' }}
          className=' bg-white rounded-xl rounded-b-none flex justify-around py-1   '
        >
          {bottomNavs.map((item, i) => (
            <div
              onClick={() => {
                if(item.url === '/login') {
                    setOpen(true)
                    dispatch(setAuthModalState(2))
              }
              else{
                setActiveUrl(item.url)
                router.push(item.url)
              }
            }}
              key={i}
              className={` flex items-center justify-center flex-col mx-2 font-medium cursor-pointer  ${
                activeUrl === item.url ? 'text-[#7D23E0]' : 'text-gray-400'
              } ${item.title === 'Account' && !isLoggedIn && 'hidden'} ${
                item.title === 'Login' && isLoggedIn && 'hidden'
              }`}
            >
              <span>{item.icon}</span>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </Affix>
    </div>
  )
}
