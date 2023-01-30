import React, { useState } from 'react'
//images
import Logo from '../../../../assets/logo_title.svg'
import SignInImg from '../../../../assets/courses_institutions/sign-in/signIn.svg'
import SigninEmailImg from '../../../../assets/courses_institutions/sign-in/signin-email.svg'
import OTPImg from '../../../../assets/courses_institutions/sign-up/OTP.svg'
import ChangenumberImg from '../../../../assets/courses_institutions/sign-up/change-number.svg'
//components
import SignInEmail from './sign-in-proceeds/SignInEmail'
import OTP from './sign-in-proceeds/OTPNumber'
import ChangeNumber from './sign-in-proceeds/changeMobileNumber'
import ChangeEmail from './sign-in-proceeds/changeEmail'
import OTPEmail from './sign-in-proceeds/OtpEmail'
//styled components
import { Container } from './index.styled'
import BottomBar from '../../../../components/layout/BottomBar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import DefaultPage from './sign-in-proceeds/DefaultPage'
import NumberOTP from './sign-in-proceeds/NumberOTP'

const SignIn = () => {
  const [active, setActive] = useState('default')
  const [mobilenumber, setmobilenumber] = useState()
  const [email, setEmail] = useState()
  const router = useRouter()

  const handleEmail = (val) => {
    setEmail(val)
  }

  const handleMobileNumber = (val) => {
    setmobilenumber(val)
  }

  const handleActive = (val) => {
    setActive(val)
  }
  const params = router.query
  console.log(active)

  return (
    <>
      <div className='py-3 shadow-reverse bg-cloud md:bg-white w-full inline-block'>
        <Link prefetch={false} href='/'>
          <img
            className='w-40 ml-4 md:ml-16 md:mt-2'
            src={Logo.src}
            alt='logo'
          />
        </Link>
      </div>
      <Container className='flex items-center md:justify-evenly flex-col md:flex-row'>
        <>
          {active === 'default' && (
            <>
              <img
                className='hidden md:block mr-8'
                src={SignInImg.src}
                alt='vector'
              />
              <DefaultPage
                {...{ handleActive, handleNumber: handleMobileNumber }}
              />
            </>
          )}
          {active === 'email' && (
            <div>
              <img
                className='hidden md:block mr-8'
                src={SigninEmailImg.src}
                alt='vector'
              />
              <SignInEmail
                handleEmail={handleEmail}
                handleActive={handleActive}
              />
            </div>
          )}
          {active === 'otp' && (
            <>
              <img
                className='hidden md:block mr-8'
                src={OTPImg.src}
                alt='vector'
              />

              <NumberOTP
                mobilenumber={mobilenumber}
                handleActive={handleActive}
              />
            </>
          )}
          {active === 'otpemail' && (
            <div>
              <img
                className='hidden md:block ml-8 mr-8'
                src={OTPImg.src}
                alt='vector'
              />
              <OTPEmail email={email} handleActive={handleActive} />
            </div>
          )}
          {active === 'changenumber' && (
            <div>
              <img
                className='hidden md:block mr-8'
                src={ChangenumberImg.src}
                alt='vector'
              />
              <ChangeNumber
                handleNumber={handleMobileNumber}
                handleActive={handleActive}
              />
            </div>
          )}
          {active === 'changeemail' && (
            <div>
              <img
                className='hidden md:block mr-8'
                src={SigninEmailImg.src}
                alt='vector'
              />
              <ChangeEmail
                handleEmail={handleEmail}
                handleActive={handleActive}
              />
            </div>
          )}
        </>
      </Container>
      {/* <BottomNavabr /> */}
      <BottomBar />
    </>
  )
}
export default SignIn