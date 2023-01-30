import React, { useRef } from 'react'
import axios from 'axios'
//sub components
import Panel from '../../sub-components/panel'
import {
  Heading,
  Paragraph,
  Flex,
  DottedParagraph,
} from '../../sub-components/layout'
import Button from '../../sub-components/Button'
import { host } from '../../../../../utils/constant'

const ChangeEmail = ({ handleActive, handleEmail }) => {
  const emailRef = useRef()
  const mobileNumRef = useRef()

  return (
    <>
      <Panel className='shadow'>
        <Heading content='Change email ID' />
        <Paragraph content='Enter a valid email ID to get the OTP' />

        <input
          ref={emailRef}
          type='email'
          className='h-10 border border-gray rounded-lg w-full my-10 p-2'
          placeholder='Email address'
        />
        <input
          ref={mobileNumRef}
          type='number'
          className='hidden'
          placeholder='Email address'
        />
        <Flex>
          <Button
            onClick={() => {
              handleActive(emailRef.current.value ? 'otpemail' : 'changeemail')
              handleEmail(emailRef.current.value)
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
            content='Verify OTP'
          />
          <DottedParagraph
            onClick={() => handleActive('default')}
            content='Continue with mobile number'
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
export default ChangeEmail
