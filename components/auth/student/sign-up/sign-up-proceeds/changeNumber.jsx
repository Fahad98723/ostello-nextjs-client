import React, { useState, useRef } from 'react'
import axios from 'axios'
import PhoneInput from 'react-phone-number-input'
//sub components
import Panel from '../../sub-components/panel'
import { Heading, Paragraph } from '../../sub-components/layout'
import Button from '../../sub-components/Button'
import { host } from '../../../../../utils/constant'

const ChangeNumber = ({ handleActive, handleNumber }) => {
  const [value, setValue] = useState('+91')
  const mobileNumRef = useRef()
  const emailRef = useRef()

  return (
    <>
      <Panel>
        <Heading content='Change mobile number' />
        <Paragraph content='Enter a valid mobile number to get the OTP' />

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
            type='number'
            ref={mobileNumRef}
            className='w-full outline-none'
            placeholder='Enter Your Number'
          />
        </div>
        <input ref={emailRef} type='email' className='hidden' />

        <div className='flex  md:justify-start justify-center mt-12 '>
          <Button
            onClick={() => {
              handleActive(mobileNumRef.current.value ? 'otp' : 'changenumber')
              handleNumber(mobileNumRef.current.value)
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
              })
                .then((res) => {
                  console.log(res)
                })
                .catch((err) => {
                  console.log(err)
                })
            }}
            content='Send OTP'
          />
        </div>
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

export default ChangeNumber
