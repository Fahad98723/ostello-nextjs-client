import { CloseCircleOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import instaViolet from '../../../assets/images/icons/instaViolet.svg'
import fbViolet from '../../../assets/images/icons/fbViolet.svg'
import whatsappViolet from '../../../assets/images/icons/whatsappViolet.svg'
import linkedinViolet from '../../../assets/images/icons/linkedinViolet.svg'
import twitterViolet from '../../../assets/images/icons/twitterViolet.svg'
import Container from '../../layout/Container'
import Modal from '../../UI/Modal/Modal'
import SharePopup from '../../UI/SharePopup'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { authSelector } from '../../../redux/slices/authSlice'
export default function ReferCourse() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { isAuthenticated } = useSelector(authSelector)

  return (
    <>
      <SharePopup
        isReferral
        TextToCopy={'EHDOSB261'}
        open={open}
        onClose={() => setOpen(false)}
      />
      <div className='shareBG '>
        <Container
          className={
            'flex md:justify-between md:items-center flex-col justify-center items-center space-y-10  md:flex-row lg:px-20 h-full'
          }
        >
          <h1 className='text-white font-medium text-center md:text-left  md:text-4xl text-xl '>
            Refer someone you know and <br /> receive exciting offers.
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
            {isAuthenticated ? 'Refer' : ' Sign up and Refer'}
          </button>
        </Container>
      </div>
    </>
  )
}
