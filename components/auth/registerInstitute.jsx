import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { AiFillLeftCircle } from 'react-icons/ai'
import { BiCircle } from 'react-icons/bi'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { HiOutlineMail, HiOutlineShieldCheck } from 'react-icons/hi'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useRouter } from 'next/router'

import { host } from '../../utils/constant'

import LogoWithTitle from '../../assets/logo_title.svg'

import 'react-phone-number-input/style.css'
import toast from 'react-hot-toast'
import { appHost } from '../utils'
import dynamic from 'next/dynamic'
const OTPInput = dynamic(
  () => {
    return import('otp-input-react')
  },
  { ssr: false }
)

const initialErrorText = {
  color: '',
  phone: '',
  email: '',
  otp: '',
  password: '',
}

export const hasMin8 = (value) => value.length >= 8
export const hasUppercase = (value) => /[A-Z]/.test(value)
export const hasSpecialChar = (value) =>
  // eslint-disable-next-line no-useless-escape
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
export const hasNumber = (value) => /[0-9]/.test(value)

export const phoneNumberToNumber = (phoneNumber) =>
  parseInt(phoneNumber.replace(/\s/g, ''))

const Signup = () => {
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [errorText, setErrorText] = useState(initialErrorText)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [otpSent, setOtpSent] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem('ACCESS_TOKEN') !== null) {
      router.push = '/logged-in'
    }
  }, [])

  return (
    <main className='w-screen h-screen m-0 p-0 overflow-x-hidden overflow-y-hidden flex  font-dm-sans'>
      <section className='bg-gradient-to-r from-lavender via-turquoise to-cyan h-full w-1/2 hidden lg:flex justify-center items-center'>
        <Link prefetch={false} href={'/'}>
          <img src={LogoWithTitle.src} alt='Ostello Logo' className='w-auto h-20' />
        </Link>
      </section>
      <div className='h-screen overflow-y-auto w-full lg:w-1/2 lg:min-w-[700px] flex flex-col justify-start items-center  lg:py-6 lg:px-24'>
        <div className='hidden lg:block mr-auto '>
          <Link prefetch={false} href='/merchant'>
            <AiFillLeftCircle className='text-primary text-4xl' />
          </Link>
        </div>
        <nav className='lg:hidden flex items-center justify-between w-full px-6 py-4'>
          <Link prefetch={false} href='/merchant'>
            {' '}
            <button className='text-gray py-4 space-x-2 flex items-center'>
              <IoIosArrowBack />
              <p className=''>Back</p>
            </button>
          </Link>
          <div className='flex-1'></div>
          <img src={LogoWithTitle.src} alt='Ostello Logo' className='w-auto h-8' />
        </nav>
        <div className='flex flex-col py-6 lg:py-0   px-6 lg:px-16 items-center justify-center  w-full lg:h-full  lg:shadow-2xl lg:shadow-lavender lg:rounded-2xl '>
          <div className='flex items-center transition-all'>
            <div className='flex flex-col py-6 px-6 lg:px-16 items-center justify-center h-full w-full lg:rounded-2xl '>
              {!phoneVerified ? (
                <>
                  {' '}
                  <h1 className='font-bold text-2xl text-center '>
                    Welcome to Ostello
                  </h1>
                  <h2 className='font-medium text-base text-center '>
                    Register as a new Institute
                  </h2>
                </>
              ) : (
                <>
                  {' '}
                  <h1 className='font-bold text-xl md:text-2xl text-center lg:w-max '>
                    Let's create an account
                  </h1>
                  <h2 className='font-medium text-xs text-center '>
                    Already have an account?{' '}
                    <span className='text-primary'>
                      {' '}
                      <Link prefetch={false} href='/merchant/login'>
                        {' '}
                        Login to your account{' '}
                      </Link>
                    </span>
                  </h2>
                </>
              )}
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className=''>
            {!phoneVerified ? (
              <VerifyPhoneNumber
                phoneVerifyState={[isPhoneVerified, setIsPhoneVerified]}
                errorState={[errorText, setErrorText]}
                phoneNumberState={[phoneNumber, setPhoneNumber]}
                proceed={[otpSent, setOtpSent]}
                phoneVerifiedState={[phoneVerified, setPhoneVerified]}
              />
            ) : (
              <VerifyEmailPassword
                emailState={[email, setEmail]}
                passwordState={[password, setPassword]}
                errorState={[errorText, setErrorText]}
                phoneNumberState={[phoneNumber, setPhoneNumber]}
              />
            )}
          </form>
        </div>
      </div>
    </main>
  )
}

export const VerifyPhoneNumber = ({
  phoneVerifyState,
  errorState,
  phoneNumberState,
  phoneVerifiedState,
}) => {
  const [phoneNumber, setPhoneNumber] = phoneNumberState
  const [, setIsPhoneVerified] = phoneVerifyState
  const [errorText, setErrorText] = errorState
  const [, setShowError] = useState(false)
  const [value, setValue] = useState('+91')
  const [, setPhoneVerified] = phoneVerifiedState

  const handlePhoneNumber = (e) => {
    const normalizedPhoneNumber = (value, previousValue) => {
      if (!value) return value
      const currentValue = value.replace(/[^\d]/g, '')
      const cvLength = currentValue.length

      if (!previousValue || value.length !== previousValue.length) {
        setErrorText(initialErrorText)
        if (cvLength < 4) return currentValue
        else if (cvLength <= 7)
          return `${currentValue.slice(0, 3)} ${currentValue.slice(3)}`
        else return `${currentValue.slice(0, 5)} ${currentValue.slice(5, 10)}`
      }
    }

    e.preventDefault()
    setPhoneNumber(normalizedPhoneNumber(e.target.value, phoneNumber))
  }

  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpSec, setOtpSec] = useState(30)
  const [otpSentOnce, setOtpSentOnce] = useState(false)

  const router = useRouter(useState)

  const handleOTPSend = (e) => {
    e.preventDefault()
    if (`${phoneNumberToNumber(phoneNumber)}`.length < 10) {
      setErrorText({
        ...errorText,
        color: 'red',
        phone: 'Enter a valid Phone Number',
      })
      return
    }

    typeof window !== 'undefined' && window.localStorage.setItem('OWNER_PHONE', phoneNumber)

    axios
      .get(`${host}/users?phonenumber=${phoneNumberToNumber(phoneNumber)}`)
      .then((res) => {
        if (res.data.message.id) {
          toast.error('User already exist. Please login')
          typeof window !== 'undefined' && window.localStorage.setItem('OWNER_ID', res.data.message.id)
          router.push('/merchant/login')
        }
      })
      .catch(() => {
        setOtpSent(true)
        setOtpSec(30)
        if (!otpSentOnce) {
          axios({
            method: 'get',
            url: `${host}/auth/otp/generate`,
            params: {
              phonenumber: phoneNumberToNumber(phoneNumber),
              email: '',
            },
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          })
            .then((res) => {
              setErrorText({
                ...errorText,
                color: 'green',
                otp: res.data.message,
              })
              setOtpSentOnce(false)
            })
            .catch((err) => {
              console.log(err)
              setErrorText({ ...errorText, color: 'red', otp: err.data.error })
            })
        } else {
          axios({
            method: 'get',
            url: `${host}/auth/otp/resend`,
            params: {
              phonenumber: phoneNumberToNumber(phoneNumber),
              retrytype: 'string',
            },
          })
            .then((res) => {
              setErrorText({
                ...errorText,
                color: 'green',
                otp: res.data.message,
              })
              setOtpSentOnce(true)
            })
            .catch((err) => {
              console.log(err)
              setErrorText({
                ...errorText,
                color: 'red',
                otp: err.data.error,
              })
            })
        }
      })
  }

  const handleOTPVerify = (e) => {
    e.preventDefault()
    axios({
      method: 'get',
      url: `${host}/auth/otp/verify`,
      params: {
        phonenumber: phoneNumberToNumber(phoneNumber),
        otp: otp,
      },
    })
      .then((res) => {
        setErrorText({
          ...errorText,
          color: 'green',
          otp: res.data.message,
        })
        setIsPhoneVerified(true)
        setPhoneVerified(true)

        axios
          .get(`${host}/users?phonenumber=${phoneNumberToNumber(phoneNumber)}`)
          .then((res) => {
            console.log(res)
            if (res.data.message.id) {
              typeof window !== 'undefined' && window.localStorage.setItem('OWNER_ID', res.data.message.id)
              router.push('/merchant/login')
            }
          })
          .catch((err) => {
            console.error(err)

            router.push('/merchant/signup')
          })
      })
      .catch((err) => {
        console.log(err)

        setErrorText({
          ...errorText,
          color: 'red',
          otp: err.data.error,
        })
        setShowError(true)
      })
  }

  useEffect(() => {
    let timer = null
    if (otpSent) {
      timer = setTimeout(() => {
        setOtpSec((s) => s - 1)
        if (otpSec <= 1) {
          setOtpSent(true)
          clearInterval(timer)
        }
      }, 1000)
    }
    return () => clearTimeout(timer)
  })

  return (
    <div className='space-y-4 mt-6'>
      <div className=''>
        <div className='flex'>
          <div className='flex-1'></div>
          <p className={`text-${errorText.color}`}>{errorText.phone}</p>
        </div>

        <div className=' flex space-x-2 items-center py-1 mb-6 lg:mb-5 px-4 shadow-md rounded-xl text-xl'>
          <PhoneInput
            className='w-10   '
            placeholder='Enter your mobile number'
            defaultCountry='IN'
            value={value}
            onChange={setValue}
            international
          />
          <p className='py-2 text-base'>{value}</p>
          <p className='px-2 text-medium-white text-3xl'>|</p>
          <input
            type='text'
            placeholder='Enter your Phone No '
            className='flex-1 focus:outline-none focus:border-0  text-base '
            onChange={(e) => handlePhoneNumber(e)}
            value={phoneNumber}
          />
        </div>

        <div className=''>
          <div className='flex-1'></div>
          <p
            className={`text-${errorText.color} flex justify-center items-center m-auto`}
          >
            {errorText.otp}
          </p>
        </div>

        {otpSent ? (
          <div className='flex justify-between items-center space-x-2 py-4 px-4 text-xl'>
            <OTPInput
              inputClassName='border-2 border-grey-border text-xl rounded '
              className='items-center m-auto '
              value={otp}
              onChange={setOtp}
              autoFocus
              OTPLength={4}
              otpType='number'
              disabled={false}
            />
          </div>
        ) : (
          ''
        )}

        {otpSent && otpSec < 1 && (
          <button
            className={`  px-10 lg:py-2 m-auto py-1 text-base flex justify-center items-center lg:space-x-2  `}
            onClick={(e) => handleOTPSend(e)}
          >
            <p className=' font-bold' style={{ color: '#A7A7A7' }}>
              Resend OTP
            </p>
          </button>
        )}

        {otpSec !== 30 && otpSec !== 0 && otpSec > 0 && (
          <p className='text-gray text-sm flex justify-center items-center  m-auto mb-3'>
            Resend OTP in <span className='font-medium pl-2'> {otpSec}</span>s
          </p>
        )}

        {otpSent ? (
          <button
            className='border-2 px-10 lg:py-2 m-auto py-1 text-base flex justify-center items-center lg:space-x-2 rounded-lg bg-primary border-primary text-white'
            onClick={(e) => handleOTPVerify(e)}
          >
            Verify OTP
          </button>
        ) : (
          <button
            className={` border-2 px-10 lg:py-2 m-auto py-1 text-base flex justify-center items-center lg:space-x-2 rounded-lg bg-primary border-primary text-white `}
            onClick={(e) => handleOTPSend(e)}
          >
            <p className='text-white'>Proceed</p>
          </button>
        )}
      </div>

      <div className='flex lg:flex-row flex-col items-center  space-x-2  lg:w-max  '>
        <p className='font-medium text-sm text-gray'>
          Already have an account ?
        </p>

        <button onClick={() => router.push('/merchant/login')}>
          <div className='text-primary-main px-12 lg:px-0 lg:py-0 rounded-full text-sm text-primary-800'>
            Login to your Merchant Account
          </div>
        </button>
      </div>
    </div>
  )
}

const VerifyEmailPassword = ({
  emailState,
  passwordState,
  errorState,
  phoneNumberState,
}) => {
  const [email, setEmail] = emailState
  const [password, setPassword] = passwordState
  const [errorText, setErrorText] = errorState
  const [phoneNumber] = phoneNumberState

  const router = useNavigate()

  const handleLogin = async (e) => {
    try {
      const res = await axios.post(
        `${host}/users/login/`,
        {
          email: email,
          password: password,
        },
        {
          'Access-Control-Allow-Origin': '*',
        }
      )

      typeof window !== 'undefined' && window.localStorage.setItem(
        'ACCESS_TOKEN',
        res.data.message['access_token']
      )
      typeof window !== 'undefined' && window.localStorage.setItem(
        'REFRESH_TOKEN',
        res.data.message['refresh_token']
      )

      const userDetails = await axios.get(`${host}/users?email=${email}`, {
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
            'ACCESS_TOKEN'
          )}`,
        },
      })

      if (userDetails.data.message.institute === null) {
        typeof window !== 'undefined' && window.localStorage.setItem('OWNER_ID', userDetails.data.message.id)
        router.push('/merchant/details')
      }
    } catch (err) {
      console.log(err)
      setErrorText('Error loggin in.')
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    if (
      email.length <= 0 ||
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setErrorText({
        ...initialErrorText,
        color: 'red',
        email: 'Enter valid email',
      })
      return
    } else if (
      !hasMin8(password) ||
      !hasNumber(password) ||
      !hasSpecialChar(password) ||
      !hasUppercase(password)
    ) {
      setErrorText({
        ...initialErrorText,
        color: 'red',
        password: 'Enter valid password',
      })
    } else {
      axios
        .get(`${host}/users?email=${email}`, {
          headers: {
            Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
              'ACCESS_TOKEN'
            )}`,
          },
        })
        .then((res) => {
          if (res.data.id) {
            handleLogin(e)
          }
        })
        .catch((err) => {
          axios
            .post(
              `${host}/users/register`,
              {
                email: email,
                password: password,
                phonenumber: phoneNumberToNumber(phoneNumber),
                usertype: 2,
              },
              {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                },
              }
            )
            .then((res) => {
              handleLogin()
            })
            .catch((err) => {
              console.log(err)
              setErrorText({ ...errorText, color: 'red', email: err.message })
            })
        })
    }
  }

  const handlePassword = (e) => {
    e.preventDefault()
    setErrorText(initialErrorText)
    setPassword(e.target.value)
  }

  const handleEmail = (e) => {
    e.preventDefault()
    setErrorText(initialErrorText)
    setEmail(e.target.value)
  }

  const [isPassShown, setIsPassShown] = useState(false)

  return (
    <div className=' space-y-6 mt-6'>
      <div className=''>
        <div className='flex'>
          <div className='text-base '>Email</div>
          <div className='flex-1'></div>
          <p className={`text-${errorText.color}`}>{errorText.email}</p>
        </div>
        <div className=' flex space-x-2 items-center py-4 px-4  lg:mx-0 shadow-md rounded-xl text-xl'>
          <div className=''>
            <HiOutlineMail className='text-slate text-2xl' />
          </div>
          <input
            type='email'
            placeholder='Enter your email'
            className='flex-1 focus:outline-none focus:border-0 text-base'
            onChange={(e) => handleEmail(e)}
            value={email}
          />
        </div>
      </div>
      <div className=''>
        <div className='flex'>
          <div className='text-base'>Password</div>
          <div className='flex-1'></div>
          <p className={`text-${errorText.color}`}>{errorText.password}</p>
        </div>
        <div className='flex space-x-2 items-center py-4 px-4 shadow-md rounded-xl text-xl'>
          <div className=''>
            <HiOutlineShieldCheck className='text-slate text-2xl' />
          </div>
          <input
            type={isPassShown ? 'text' : 'password'}
            placeholder='Create new password'
            className='flex-1 focus:outline-none focus:border-0 text-base'
            value={password}
            onChange={(e) => handlePassword(e)}
          />
          <button
            className={` px-2 py-1 font-medium flex justify-center items-center lg:space-x-2 rounded-2xl `}
            onClick={() => setIsPassShown(!isPassShown)}
          >
            {isPassShown ? (
              <React.Fragment>
                <BsEyeSlash className='text-slate text-2xl' />
                {/* <span className="text-slate hidden lg:block">Hide</span> */}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <BsEye className=' text-2xl text-slate' />
                {/* <span className="text-white hidden lg:block">Show</span> */}
              </React.Fragment>
            )}
          </button>
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-primary'>
            {hasMin8(password) ? <AiFillCheckCircle /> : <BiCircle />}
          </div>
          <p className='text-slate text-sm'>Minimum 8 characters</p>
        </div>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-primary'>
            {hasUppercase(password) ? <AiFillCheckCircle /> : <BiCircle />}
          </div>
          <p className='text-slate text-sm flex-1 min-w-48'>An Uppercase</p>
        </div>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-primary'>
            {hasSpecialChar(password) ? <AiFillCheckCircle /> : <BiCircle />}
          </div>
          <p className='text-slate text-sm'>Special char(&$%#)</p>
        </div>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-primary'>
            {hasNumber(password) ? <AiFillCheckCircle /> : <BiCircle />}
          </div>
          <p className='text-slate text-sm'>A Number</p>
        </div>
      </div>
      <div className='flex justify-center '>
        <button
          onClick={(e) => handleSignup(e)}
          className='border-2 px-10 
          lg:w-full lg:py-2  transition-all hover:-translate-y-1 m-auto py-1 text-base  lg:space-x-2 rounded-lg  hover:bg-lavender bg-primary  text-white '
        >
          Sign up
        </button>
      </div>
      <div className='flex lg:w-max text-center '>
        <p className='text-center  text-sm'>
          By clicking you agree to all the{' '}
          <a
            href={appHost + '/terms'}
            target='_blank'
            rel='noreferrer'
            className='text-primary hover:underline cursor-pointer'
          >
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a
            href={appHost + '/privacy'}
            target='_blank'
            rel='noreferrer'
            className='text-primary hover:underline cursor-pointer'
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
