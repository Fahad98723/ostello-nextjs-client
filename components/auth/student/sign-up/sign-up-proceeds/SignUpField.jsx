import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {useRouter } from 'next/router'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
//sub components
import { Times, Check } from '../../sub-components/icons'
import Panel from '../../sub-components/panel'
import {
    Heading,
    Paragraph,
    DottedParagraph,
} from '../../sub-components/layout'
import Button from '../../sub-components/Button'
import { host } from '../../../../../utils/constant'
import { useDispatch } from 'react-redux'
import { addRegisterData } from '../../../../../redux/slices/signUpSlice'
import { phoneNumberToNumber } from '../../../registerInstitute'
import toast from 'react-hot-toast'

const SignUpField = ({ handleActive, handleNumber }) => {
    const [code, setCode] = useState('')
    const [active, setActive] = useState(false)
    const mobileNumRef = useRef(null)
    const emailRef = useRef(null)
    const [value, setValue] = useState('+91')
    const dispatch = useDispatch()
    const router = useRouter()
    const [number, setNumber] = useState('')

    useEffect(() => {
        axios
        .get(
            `${host}/users?phonenumber=${phoneNumberToNumber(
                mobileNumRef.current.value,
            )}`,
        )
        .then(async (res) => {
            if (res.data.message.usertype) {
                toast.error(
                    'You already have account please login !',
                )
                return router.push('/login')
            }
            
        })
        .catch((err) => {
            console.log(err);
        })
    },[router,mobileNumRef, number ])

    return (
        <Panel className="shadow">
            <Heading content="join ostello" />
            <Paragraph>
                or{' '}
                <Link prefetch={false} href="/login">
                    <DottedParagraph content="login to your account" />
                </Link>
            </Paragraph>

            <div className="my-10 h-10 px-4 rounded-lg border border-gray lg:w-5/5 flex items-center text-lg">
                <PhoneInput
                    className="w-10"
                    placeholder="Enter your mobile number"
                    defaultCountry="IN"
                    value={value}
                    onChange={setValue}
                    international
                />
                <p className="py-2">{value}</p>
                <p className="px-2 text-3xl text-gray">|</p>
                <input
                    type="number"
                    ref={mobileNumRef}
                    onBlur={(e) => setNumber(e.target.value)}
                    className="w-full outline-none"
                    placeholder="Enter Your Number"
                />
            </div>
            <input ref={emailRef} type="email" className="hidden" />

            <p
                onClick={() => setActive(!active)}
                className={
                    active
                        ? 'hidden'
                        : 'block font-dm-sans text-primary font-medium text-base cursor-pointer'
                }
            >
                Have a Referral Code?
            </p>
            {active && (
                <div className="border border-gray px-4 h-10 w-full rounded-lg flex justify-between items-center">
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        type="text"
                        placeholder="Referral code"
                        className="w-full outline-none "
                    />
                    <span className="text">
                        {code.length ? <Check /> : <Times />}
                    </span>
                </div>
            )}

            <div className="flex md:justify-start justify-center mt-12">
                <Button
                    onClick={() => {
                       setTimeout(() => {
                        if (mobileNumRef.current.value) {
                            if (code.length > 1) {
                                return handleActive('popup')
                            }
                            handleActive('otp')
                        }
                       }, 1000);

                        handleNumber(mobileNumRef.current.value)
                        dispatch(
                            addRegisterData({
                                phonenumber: mobileNumRef.current.value,
                                email: emailRef.current.value,
                            }),
                        )
                        axios({
                            method: 'get',
                            url: `${host}/auth/otp/generate`,
                            params: {
                                phonenumber: mobileNumRef.current.value,
                                email: emailRef.current.value,
                                otp: 2154,
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
                    content="Continue"
                />
            </div>
      <div className='flex justify-center items-end  mt-10'>
      <Link prefetch={false} href="/merchant/login">
          <a
            className='border border-primary text-primary py-2 px-6 rounded-lg font-dm-sans hover:opacity-80'
            href=''
          >
            Are you an Institute?
          </a>
        </Link>
      </div>
    </Panel>
  )
}

export default SignUpField
