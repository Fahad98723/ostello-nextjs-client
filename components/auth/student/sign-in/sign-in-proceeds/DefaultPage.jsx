import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import PhoneInput from 'react-phone-number-input'
import { host } from '../../../../../utils/constant'
import { phoneNumberToNumber } from '../../../../../utils/utils'
import Button from '../../sub-components/Button'
import {
  DottedParagraph,
  Flex,
  Heading,
  Paragraph,
} from '../../sub-components/layout'
import Panel from '../../sub-components/panel'

export default function DefaultPage({ handleActive, handleNumber }) {
  const mobileNumRef = useRef(null)
  const emailRef = useRef(null)
  const [value, setValue] = useState('+91')
  const router = useRouter()
  return (
    <>
      <Panel>
        <Heading content='sign in' />
        <Paragraph>
          <span>or </span>
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
            content={'Send OTP'}
          />
          <Link prefetch={false} href='/merchant/login'>
            <a
              href=''
              className='border border-primary text-primary py-2 px-6 rounded-lg font-dm-sans hover:opacity-80 sm:hidden mt-10'
            >
              Are you an Institute?
            </a>
          </Link>
        </Flex>
        <div className='flex justify-center items-end translate-y-80 md:translate-y-40'>
          <Link prefetch={false} href='/merchant/login'>
            <a
              className='border border-primary text-primary py-2 px-6 rounded-lg font-dm-sans hover:opacity-80'
              href=''
            >
              Are you an Institute?
            </a>
          </Link>
        </div>
      </Panel>
    </>
  )
}
