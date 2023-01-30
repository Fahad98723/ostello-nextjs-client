import React, { useState } from 'react'
import axios from 'axios'
import { TiWarningOutline } from 'react-icons/ti'
//react input otp
import dynamic from 'next/dynamic'
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
//sub components
import Panel from '../../sub-components/panel'
import {
  Heading,
  Paragraph,
  Flex,
  VioletParagrapgh,
} from '../../sub-components/layout'
import Button from '../../sub-components/Button'
import { host } from '../../../../../utils/constant'

const OtpLogin = ({ handleActive, mobilenumber }) => {
  const [OTP, setOTP] = useState('')
  const [error, setError] = useState('')

  return (
    <>
      <Panel className='shadow'>
        <Heading content='Enter OTP' />
        <Paragraph content='We have sent an OTP on your registered mobile number' />

        <div className='flex justify-center items-center mt-10 mb-7'>
          <OTPInput
            className={error ? 'OTP-input' : 'OTP-input-2'}
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={4}
            otpType='any'
            disabled={false}
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
            onClick={() => {
              axios({
                method: 'get',
                url: `${host}/auth/otp/verify`,
                params: {
                  phonenumber: mobilenumber,
                  otp: OTP,
                },
                headers: {
                  'Access-Control-Allow-Origin': '*',
                },
              })
                .then((res) => {
                  console.log(res, 'validRed')
                  if (res.data.error) {
                    console.log(res.data.error)
                    setError(`Oops..wrong OTP, try again`)
                  } else {
                    console.log(res, 'validate...')
                    handleActive('completedetails')
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            }}
            content='Verify OTP'
          />
          <ResendOTP
            className='mb-5 border-b border-primary border-dashed text-primary'
            renderTime={renderTime}
            renderButton={renderButton}
            onResendClick={() => console.log('Resend clicked')}
          />
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

export default OtpLogin

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
