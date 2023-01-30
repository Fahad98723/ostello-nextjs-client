import React from 'react'
import { useRouter } from 'next/router'
//sub components
import DetectAge from './age'
import Residence from './residenceDropDown'
import Panel from '../../sub-components/panel'
import { Heading } from '../../sub-components/layout'
import Button from '../../sub-components/Button'
import axios from 'axios'
import { host } from '../../../../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import {
  addRegisterData,
  selectSignUp,
} from '../../../../../redux/slices/signUpSlice'
import { addAccessToken, addRefreshToken, addUserData, getUser } from '../../../../../redux/slices/authSlice'
import { appHost } from '../../../../../components/utils'

const CompleteDetails = () => {
  const { registerData } = useSelector(selectSignUp)
  const dispatch = useDispatch()
  const router = useRouter()


  console.log(registerData);
  
  const handleRegister = async () => {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }

    console.log(registerData, config, 'resData')

    try {
      const registerRes = await axios.post(
        `${host}/users/register`,
        registerData,
        config
      )

      console.log(registerRes);
      console.log(registerRes.data.message);

      const { access_token, refresh_token } = registerRes.data.message
      console.log(access_token, refresh_token )

      axios
                .post(`${host}/users/login/phone`, {
                  // otp: OTP,
                  phonenumber: registerData.phonenumber,
                })
                .then(({ data }) => {
                  console.log(data.message, 'data')
                  // setIsVerified(true)
                  const { access_token, refresh_token } = data.message
                  dispatch(addAccessToken(access_token))
                  dispatch(addRefreshToken(refresh_token))
                  axios
                    .get(`${host}/users?phonenumber=${registerData.phonenumber}`, {
                      headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${window.localStorage.getItem(
                          'ACCESS_TOKEN'
                        )}`,
                      },
                    })
                    .then((res) => {
                      dispatch(addUserData(res.data.message))
                      localStorage.setItem('OWNER_ID', res.data.message.id)
                    })
                  // !isEmpty(redirectLink)
                  //   ? router.push(redirectLink)
                  //   : router.push('/courses_institutes')
                })
                .catch((err) => console.log(err, 'ERR'))

      dispatch(addAccessToken(access_token))
      dispatch(addRefreshToken(refresh_token))
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Panel className='detail shadow'>
        <Heading content='Complete your details' />

        <form className='flex flex-col'>
          <input
            onChange={(e) =>
              dispatch(addRegisterData({ name: e.target.value }))
            }
            type='text'
            className='rounded-lg p-4 h-10 mt-4 border border-gray'
            placeholder='name'
          />
          <input
            type='email'
            onChange={(e) =>
              dispatch(
                addRegisterData({
                  email: e.target.value,
                  password: e.target.value,
                  usertype: 3,
                })
              )
            }
            className='rounded-lg p-4 h-10  mt-4 mb-2 border border-gray'
            placeholder='email'
          />
        </form>

        <Residence />

        <DetectAge />

        <div
          // to={'/courses_institutes'}
          className='flex  md:justify-start justify-center mt-12 '
          onClick={handleRegister}
        >
          <Button content='Continue' />
        </div>

        <p className=' bottom-0 md:mb-5 font-dm-sans text-light-black text-sm  w-11/12 mx-auto '>
          By continuing, you agree to Ostello’s
          <a
            href={appHost + '/terms'}
            target='_blank'
            rel='noreferrer'
            className='text-primary'
          >
            {' '}
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a
            href={appHost + '/privacy'}
            target='_blank'
            rel='noreferrer'
            className='text-primary'
          >
            Privacy Policy
          </a>
        </p>
      </Panel>
      <p className='md:hidden absolute bottom-0 px-2 md:mb-5 font-dm-sans text-light-black text-sm w-full'>
        By continuing, you agree to Ostello’s
        <a
          href={appHost + '/terms'}
          target='_blank'
          rel='noreferrer'
          className='text-primary'
        >
          {' '}
          Terms & Conditions
        </a>{' '}
        and{' '}
        <a
          href={appHost + '/privacy'}
          target='_blank'
          rel='noreferrer'
          className='text-primary'
        >
          Privacy Policy
        </a>
      </p>
    </>
  )
}

export default CompleteDetails
