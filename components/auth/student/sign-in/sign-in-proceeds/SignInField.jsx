import React, { useState, useRef } from 'react'
import Link from 'next/link'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
//sub components
import Panel from '../../sub-components/panel'
import {
  Heading,
  DottedParagraph,
  Paragraph,
  Flex,
} from '../../sub-components/layout'
import Button from '../../sub-components/Button'
import toast from 'react-hot-toast'
import { phoneNumberToNumber } from '../../../registerInstitute'
import { useRouter } from 'next/router'
import { host } from '../../../../../utils/constant'

const SignInField = ({ handleActive, handleNumber }) => {
  const mobileNumRef = useRef(null)
  const emailRef = useRef(null)
  const [value, setValue] = useState('+91')
  const router = useRouter()

  return (
    <Panel className='shadow'>
      <Heading content='sign in' />

      <Paragraph>
        <span>or</span>
        <Link prefetch={false} href='/signup' passHref>
          <a href=''>
            <DottedParagraph content='create your account' />
          </a>
        </Link>
      </Paragraph>

      <div className='my-10 h-10 px-4 rounded-lg border border-gray lg:w-5/5 flex items-center text-lg'>
        <PhoneInput
          className='w-10'
          placeholder='Enter your mobile number'
          defaultCountry='IN'
          value={value}
          onChange={setValue}
          international
        />
        <p className='py-2'>{value}</p>
        <p className='px-2 text-3xl text-gray'>|</p>
        <input
          onKeyDown={(evt) =>
            ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
          }
          type='number'
          ref={mobileNumRef}
          className='w-full outline-none '
          placeholder='Enter Your Number'
        />
      </div>
      <input ref={emailRef} type='email' className='hidden' />
      <Flex>
        <Button
          onClick={() => {
            handleNumber(mobileNumRef.current.value)
            axios
              .get(
                `${host}/users?phonenumber=${phoneNumberToNumber(
                  mobileNumRef.current.value
                )}`
              )
              .then(async (res) => {
                if (res.data.message.usertype !== 3) {
                  toast.error('You are not student. Login with this page !')
                  return router.push('/merchant/login')
                }
                axios({
                  method: 'get',
                  url: `${host}/auth/otp/generate`,
                  params: {
                    phonenumber: mobileNumRef.current.value,
                    email: emailRef.current.value,
                  },
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                  },
                }).then(() => {
                  handleActive('otp')
                })
              })
              .catch((err) => {
                toast.error('User not exists, Please sign up !')
                router.push('/signup')
              })
          }}
        >
          Send OTP
        </Button>
        <Link prefetch={false} href="/merchant/login">
          <a
            href=''
            className='border border-primary text-primary py-2 px-6 rounded-lg font-dm-sans hover:opacity-80 sm:hidden mt-10'
          >
            Are you an Institute?
          </a>
        </Link>
      </Flex>
      <Link prefetch={false} href="/merchant/login" className='flex justify-center items-end translate-y-80 md:translate-y-40'>
          <a
            className='border border-primary text-primary py-2 px-6 rounded-lg font-dm-sans hover:opacity-80'
            href=''
          >
            Are you an Institute?
          </a>
      </Link>
    </Panel>
  )
}

export default SignInField
