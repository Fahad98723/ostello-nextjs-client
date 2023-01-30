import React, { useState, useEffect } from 'react'
import LogoWithTitle from '../../assets/logo_title.svg'
import { HiOutlineShieldCheck } from 'react-icons/hi'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { IoIosArrowBack } from 'react-icons/io'
import { useRouter } from 'next/router'
import axios from 'axios'
import { host } from '../../util/constant/constant'
import {
  hasMin8,
  hasNumber,
  hasSpecialChar,
  hasUppercase,
  phoneNumberToNumber,
  VerifyPhoneNumber,
} from './Signup'
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai'
import AuthModal from '../pages/HomeLanding/Header/Navbar/AuthModal'
import { useSelector } from 'react-redux'
const initialErrorText = {
  color: '',
  phone: '',
  email: '',
  otp: '',
  password: '',
  confirmPassword: '',
}

const ForgotPass = () => {
  const router = useRouter()
  const [errorText, setErrorText] = useState(initialErrorText)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isPhoneVerified, setisPhoneVerified] = useState(false)
  const [isVerified, setisVerified] = useState(false)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const {isAuthenticated,userData } = useSelector(authSelector)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleVerify = (e) => {
    e.preventDefault()
    if (isPhoneVerified) {
      setisVerified(true)
    } else {
      setErrorText({
        ...errorText,
        color: 'red',
        phone: 'Please verify your phone number',
      })
    }
  }

  const handleChangePWD = (e) => {
    e.preventDefault()
    if (
      !hasMin8(password) ||
      !hasNumber(password) ||
      !hasSpecialChar(password) ||
      !hasUppercase(password)
    ) {
      setErrorText({
        ...errorText,
        color: 'red',
        password: 'Enter a valid password',
      })
    } else if (password !== confirmPassword) {
      setErrorText({
        ...errorText,
        color: 'red',
        confirmPassword: 'Confirm password do not match',
      })
    } else {
      axios
        .patch(`${host}/users/forgot`, {
          phonenumber: phoneNumberToNumber(phoneNumber),
          password: password,
        })
        .then(() => {
          setOpen(true)
          dispatch(setAuthModalState(1))
        })
        .catch((err) => console.error(err))
    }
  }

  useEffect(() => {
    if (isPhoneVerified) {
      setisVerified(true)
    }
  }, [isPhoneVerified])

  return (
    <main className='w-screen h-screen m-0 p-0 overflow-x-hidden overflow-y-hidden flex  font-dm-sans'>
      <AuthModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      <section className='bg-gradient-to-r from-lavender via-turquoise to-cyan h-full w-1/2 hidden lg:flex justify-center items-center'>
        <img
          loading='lazy'
          src={LogoWithTitle}
          alt='Ostello Logo'
          className='w-auto h-20'
        />
      </section>
      <section className='h-screen overflow-y-auto w-full lg:w-1/2 lg:min-w-[700px] flex flex-col justify-start items-center lg:py-6 lg:px-24'>
        <nav className='lg:hidden flex items-center justify-between w-full px-6 py-4'>
          <button className='text-gray py-4 space-x-2 flex items-center'>
            <IoIosArrowBack />
            <p className=''>Back</p>
          </button>
          <div className='flex-1'></div>
          <img
            loading='lazy'
            src={LogoWithTitle}
            alt='Ostello Logo'
            className='w-auto h-8'
          />
        </nav>
        <div className='flex flex-col py-6 px-6 lg:px-16 h-full w-full lg:shadow-2xl lg:shadow-lavender lg:rounded-2xl'>
          <h1 className='font-medium text-xl'>Forgot your password?</h1>
          <form onSubmit={(e) => e.preventDefault()} className=''>
            {!isVerified ? (
              <VerifyPhoneNumber
                phoneNumberState={[phoneNumber, setPhoneNumber]}
                phoneVerifyState={[isPhoneVerified, setisPhoneVerified]}
                errorState={[errorText, setErrorText]}
              />
            ) : (
              <CreateNewPassword
                errorState={[errorText, setErrorText]}
                passwordState={[password, setPassword]}
                confirmpwdState={[confirmPassword, setConfirmPassword]}
              />
              // <div className="">Yayy</div>
            )}
            <div className='flex flex-col items-center py-12'>
              {!isVerified ? (
                <button
                  onClick={(e) => handleVerify(e)}
                  className='transition-all hover:-translate-y-1 shadow-lg px-12 lg:px-24 py-2 rounded-full font-medium text-lg bg-gradient-to-r from-cyan via-turquoise to-lavender'
                >
                  Verify
                </button>
              ) : (
                <button
                  onClick={(e) => handleChangePWD(e)}
                  className='transition-all hover:-translate-y-1 shadow-lg px-12 lg:px-12 py-2 rounded-full font-medium text-lg bg-gradient-to-r from-cyan via-turquoise to-lavender'
                >
                  Change Password
                </button>
              )}

              <p className='font-medium text-sm mt-8 mb-2 text-gray'>
                New to Ostello ?
              </p>
              <button
                className='transition-all hover:-translate-y-1 shadow-lg p-[4px] rounded-full font-medium text-lg bg-gradient-to-r from-cyan via-turquoise to-lavender'
                onClick={() => router.push('/merchant/signup')}
              >
                <div className='px-12 lg:px-12 py-2 bg-white rounded-full text-base'>
                  Create your Institute account
                </div>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default ForgotPass

const CreateNewPassword = ({ passwordState, errorState, confirmpwdState }) => {
  const [password, setPassword] = passwordState
  const [confirmpwd, setConfirmpwd] = confirmpwdState
  // eslint-disable-next-line no-unused-vars
  const [errorText, setErrorText] = errorState

  const handlePassword = (e) => {
    e.preventDefault()
    setErrorText(initialErrorText)
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    e.preventDefault()
    setErrorText(initialErrorText)
    setConfirmpwd(e.target.value)
  }

  const [isPassShown, setIsPassShown] = useState(false)

  return (
    <div className='space-y-6 mt-12'>
      <div className=''>
        <div className='flex'>
          <div className='text-base'>New Password</div>
          <div className='flex-1'></div>
          <p className={`text-${errorText.color}`}>{errorText.password}</p>
        </div>
        <div className='flex space-x-2 items-center py-4 px-4 shadow-md rounded-xl text-xl'>
          <div className=''>
            <HiOutlineShieldCheck className='text-slate text-2xl' />
          </div>
          <input
            type={isPassShown ? 'text' : 'password'}
            placeholder='Password'
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
            {hasMin8(password) ? (
              <AiFillCheckCircle />
            ) : (
              <AiOutlineCheckCircle />
            )}
          </div>
          <p className='text-slate text-sm'>Minimum 8 characters</p>
        </div>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-primary'>
            {hasUppercase(password) ? (
              <AiFillCheckCircle />
            ) : (
              <AiOutlineCheckCircle />
            )}
          </div>
          <p className='text-slate text-sm flex-1 min-w-48'>An Uppercase</p>
        </div>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-primary'>
            {hasSpecialChar(password) ? (
              <AiFillCheckCircle />
            ) : (
              <AiOutlineCheckCircle />
            )}
          </div>
          <p className='text-slate text-sm'>Special char(&$%#)</p>
        </div>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-primary'>
            {hasNumber(password) ? (
              <AiFillCheckCircle />
            ) : (
              <AiOutlineCheckCircle />
            )}
          </div>
          <p className='text-slate text-sm'>A Number</p>
        </div>
      </div>

      <div className=''>
        <div className='flex'>
          <div className='text-base'>Confirm Password</div>
          <div className='flex-1'></div>
          <p className={`text-${errorText.color}`}>
            {errorText.confirmPassword}
          </p>
        </div>
        <div className=' flex space-x-2 items-center py-4 px-4 shadow-md rounded-xl text-xl'>
          <div className=''>
            <HiOutlineShieldCheck className='text-slate text-2xl' />
          </div>
          <input
            type='password'
            placeholder='Confirm Password'
            className='flex-1 focus:outline-none focus:border-0 text-base'
            value={confirmpwd}
            onChange={(e) => handleConfirmPassword(e)}
          />
        </div>
      </div>
    </div>
  )
}
