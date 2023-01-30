import axios from 'axios'
import { IoIosArrowBack } from 'react-icons/io'
import React, { useState, useEffect } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { HiOutlineMail, HiOutlineShieldCheck } from 'react-icons/hi'

import { host, OWNER_ID } from '../../utils/constant'
import LogoWithTitle from '../../assets/logo_title.svg'
import { isEmpty } from '../utils'

export function logout() {
  if (typeof window !== 'undefined') {
    window.localStorage.clear()
    window.location.reload()
  }
}

const Login = () => {
  const [isPassShown, setIsPassShown] = useState(false)

  const router = useRouter()
  const [email, setEmail] = useState('')
  const handleEmail = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  }
  const [password, setPassword] = useState('')
  const handlePassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }
  const [errorText, setErrorText] = useState('')

  useEffect(() => {}, [])

  const handleLogin = (e) => {
    e.preventDefault()
    axios
      .post(
        `${host}/users/login/`,
        {
          email: email,
          password: password,
        },
        {
          'Access-Control-Allow-Origin': '*',
        }
      )
      .then((res) => {
        typeof window !== 'undefined' &&
          window.localStorage.setItem(
            'ACCESS_TOKEN',
            res.data.message['access_token']
          )
        console.log(res)
        typeof window !== 'undefined' &&
          window.localStorage.setItem(
            'REFRESH_TOKEN',
            res.data.message['refresh_token']
          )
        // axios
        //   .get(`${host}/users?email=${email}`, {
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
        //         "ACCESS_TOKEN"
        //       )}`,
        //     },
        //   })
        //   .then((res) => {
        //     setOwnerId(res.data.message.id);
        //     ("Owner Id success: " + res.data.message.id);
        //     router.push("/");
        //   })
        //   .catch((err) => (JSON.stringify(err)));

        fetch(`${host}/users?email=${email}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${
              typeof window !== 'undefined' &&
              window.localStorage.getItem('ACCESS_TOKEN')
            }`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
            typeof window !== 'undefined' &&
              window.localStorage.setItem('OWNER_ID', res.message.id)
            typeof window !== 'undefined' &&
              window.localStorage.setItem('USER_TYPE', res.message.usertype)
            if (res.message.institute === null) {
              router.push('/merchant/details')
            } else {
              typeof window !== 'undefined' &&
                window.localStorage.setItem(
                  'INSTITUTE_ID',
                  res.message.institute
                )
              router.push('/')
            }
          })
          .catch((err) => console.error(err))
      })
      .catch((err) => {
        console.error(err)
        setErrorText('Error loggin in.')
      })
  }

  return !isEmpty(OWNER_ID) ? (
    router.push('/login')
  ) : (
    <main className='w-screen h-screen m-0 p-0 overflow-x-hidden overflow-y-hidden flex  font-dm-sans'>
      <section className='bg-gradient-to-r from-lavender via-turquoise to-cyan h-full w-1/2 hidden lg:flex justify-center items-center'>
        <img
          loading='lazy'
          src={LogoWithTitle.src}
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
            src={LogoWithTitle.src}
            alt='Ostello Logo'
            className='w-auto h-8'
          />
        </nav>
        <div className='flex flex-col py-6 px-6 lg:px-16 h-full w-full lg:shadow-2xl lg:shadow-lavender lg:rounded-2xl'>
          <h1 className='font-medium text-xl'>
            Log In to your Institute Panel
          </h1>
          <form onSubmit={(e) => e.preventDefault()} className=''>
            <div className='space-y-6 mt-12'>
              <div className=''>
                <div className='flex'>
                  <div className='text-base'>Email</div>
                  <div className='flex-1'></div>
                  {errorText.length > 0 && (
                    <div className='text-xs text-[#FF0000]'>{errorText}</div>
                  )}
                </div>
                <div className='flex space-x-2 items-center py-4 px-4 shadow-md rounded-xl text-xl'>
                  <div className=''>
                    <HiOutlineMail className='text-slate text-2xl' />
                  </div>
                  <input
                    type='email'
                    placeholder='Email'
                    className='flex-1 text-base focus:outline-none focus:border-0'
                    value={email}
                    onChange={(e) => handleEmail(e)}
                  />
                </div>
              </div>
              <div className=''>
                <div className='text-base'>Password</div>
                <div className='flex space-x-2 items-center py-4 px-4 shadow-md rounded-xl text-xl'>
                  <div className=''>
                    <HiOutlineShieldCheck className='text-slate text-2xl' />
                  </div>
                  <input
                    type={isPassShown ? 'text' : 'password'}
                    placeholder='Password'
                    className='text-base flex-1 w-48 focus:outline-none focus:border-0'
                    value={password}
                    onChange={(e) => handlePassword(e)}
                  />
                  <button
                    className={`px-2 py-1 font-medium flex justify-center items-center lg:space-x-2 rounded-2xl text-black`}
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
                        {/* <span className="text-slate hidden lg:block">Show</span> */}
                      </React.Fragment>
                    )}
                  </button>
                </div>
              </div>
              <button className='text-[#E52B50] text-md hover:underline'>
                Forgot your password ?
              </button>
            </div>
            <div className='flex flex-col items-center py-12'>
              <button
                onClick={(e) => handleLogin(e)}
                className='transition-all hover:-translate-y-1 shadow-lg px-12 lg:px-24 py-2 rounded-full font-medium text-lg bg-gradient-to-r from-cyan via-turquoise to-lavender'
              >
                Login
              </button>
              <p className='font-medium text-sm mt-8 mb-2 text-gray'>
                New to Ostello ?
              </p>
              <button
                className='transition-all hover:-translate-y-1 shadow-lg p-[4px] rounded-full font-medium text-lg bg-gradient-to-r from-cyan via-turquoise to-lavender'
                onClick={() => router.push('/merchant/signup')}
              >
                <div className='px-12 lg:px-24 py-2 bg-white rounded-full text-base'>
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

export default Login
