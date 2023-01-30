import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Container from '../../../components/layout/Container'
import SharePopup from '../../../components/UI/SharePopup'
import { authSelector } from '../../../redux/slices/authSlice'
export default function ShareCourse() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { isAuthenticated } = useSelector(authSelector)

  return (
    <>
      <SharePopup open={open} onClose={() => setOpen(false)} />
      <div className='shareBG '>
        <Container
          className={
            'flex md:justify-between md:items-center flex-col justify-center items-center space-y-10  md:flex-row md:px-20 h-full'
          }
        >
          <h1 className='text-white font-medium text-center  md:text-4xl text-2xl '>
            Share this course and <br /> receive exciting offers
          </h1>
          <button
            onClick={() => {
              if (isAuthenticated) {
                setOpen(true)
                return
              }
              router.push('/signup')
            }}
            className='px-6 py-2 text-xl lg:text-2xl w-fit  text-[#7D23E0]  bg-[#ffff] rounded-lg font-medium active:opacity-80'
          >
            {isAuthenticated ? 'Share' : ' Sign up and Share'}
          </button>
        </Container>
      </div>
    </>
  )
}
