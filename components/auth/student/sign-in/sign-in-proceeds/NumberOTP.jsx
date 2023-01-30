import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TiWarningOutline } from 'react-icons/ti'
//react otp input

const OTPInput = dynamic(
  () => {
    return import('otp-input-react')
  },
  { ssr: false }
)
const { ResendOTP } = dynamic(
  () => {
    return import('otp-input-react')
  },
  { ssr: false }
)
//sub component
import Panel from '../../sub-components/panel'
import {
  Heading,
  Paragraph,
  VioletParagrapgh,
  Flex,
} from '../../sub-components/layout'
import Button from '../../sub-components/Button'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  addAccessToken,
  addRefreshToken,
  addUserData,
} from '../../../../../redux/slices/authSlice'
import { isEmpty } from '../../../../../utils/utils'
import { host } from '../../../../../utils/constant'
import dynamic from 'next/dynamic'

const renderButton = (buttonProps) => {
  return (
    <button {...buttonProps}>
      {buttonProps.remainingTime !== 0
        ? `Resend OTP in ${buttonProps.remainingTime}`
        : 'Resend OTP'}
    </button>
  )
}

const renderTime = (remainingTime) => {
  return <span className='hidden'>{remainingTime} seconds remaining</span>
}

export default function NumberOTP({ handleActive, mobilenumber }) {
  const [OTP, setOTP] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  mobilenumber = mobilenumber?.toString()
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)
  let [redirectLink, setRedirectLink] = useState('')
  useEffect(() => {
    setRedirectLink(typeof window !== 'undefined' && window.location.search?.split('=')?.[1])
  }, [])

  return (
    <>
      <Panel className='shadow'>
        <Heading content='send OTP' />
        <Paragraph
          content={`We have sent an OTP to your registered mobile number xxxxxxx${mobilenumber?.substr(
            mobilenumber.length - 3,
            mobilenumber.length
          )}`}
        />

        <div className='flex justify-center items-center mt-10 mb-7'>
          <OTPInput
            className={error ? 'OTP-input' : 'OTP-input-2'}
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={4}
            otpType='any'
            disabled={false}
            secure={false}
          />
        </div>

        <div className='flex justify-center items-center font-dm-sans mb-5'>
          <span style={{ color: '#F2747F' }}>
            {error ? <TiWarningOutline /> : ''}
          </span>
          <span style={{ color: '#F2747F' }}>{error}</span>
        </div>

        <VioletParagrapgh
          onClick={() => handleActive('changenumber')}
          content='Change mobile number?'
        />

        <Flex>
          <Button
            disabled={isVerified}
            content='Verify OTP'
            onClick={() => {
              console.log(OTP, mobilenumber, 'here')
              axios
                .post(`${host}/users/login/phone`, {
                  otp: OTP,
                  phonenumber: mobilenumber,
                })
                .then(({ data }) => {
                  console.log(data, 'data')
                  setIsVerified(true)
                  const { access_token, refresh_token } = data.message
                  dispatch(addAccessToken(access_token))
                  dispatch(addRefreshToken(refresh_token))
                  axios
                    .get(`${host}/users?phonenumber=${mobilenumber}`, {
                      headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
                          'ACCESS_TOKEN'
                        )}`,
                      },
                    })
                    .then((res) => {
                      dispatch(addUserData(res.data.message))
                      localStorage.setItem('OWNER_ID', res.data.message.id)
                    })
                  !isEmpty(redirectLink)
                    ? router.push(redirectLink)
                    : router.push('/')
                })
                .catch((err) => console.log(err, 'ERR'))
            }}
          />
          {/* <ResendOTP
            className='mb-5 border-b border-primary border-dashed text-primary'
            renderTime={renderTime}
            renderButton={renderButton}
            onResendClick={() => {
              setError('')
              setOTP('')
              console.log('Resend clicked')
              axios
                .get(
                  `${host}/auth/otp/resend?phonenumber=${mobilenumber}&retrytype=text`
                )
                .then(({ data }) => console.log(data))
                .catch((err) => console.log(err))
            }}
          /> */}
        </Flex>
        <div className='hidden md:block absolute bottom-0 md:mb-5 font-dm-sans text-light-black text-sm  w-11/12 mx-auto'>
          Having trouble? please contact{' '}
          <span className='text-primary' to='/'>
            <a href='mailto:support@ostello.co.in'>support@ostello.co.in</a>
          </span>{' '}
          for further support
        </div>
      </Panel>
      <div className='md:hidden absolute bottom-0 px-2 md:mb-5 font-dm-sans text-light-black text-sm w-full'>
        Having trouble? please contact{' '}
        <span className='text-primary' to='/'>
          <a href='mailto:support@ostello.co.in'>support@ostello.co.in</a>
        </span>{' '}
        for further support
      </div>
    </>
  )
}
