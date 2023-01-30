import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsCoin } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../../components/layout/LoadingSpinner'
import Navbar from '../../components/pages/HomeLanding/Header/Navbar'
import ProfileNavbar from '../../components/pages/Profile/ProfileNavbar'
import ProfileToggleNavbar from '../../components/pages/Profile/ProfileToggleNavbar'
import { authSelector } from '../../redux/slices/authSlice'
import { ACCESS_TOKEN, host } from '../../utils/constant'

export default function Wallet() {
  const [walletData, setWalletData] = useState({})
  const { isAuthenticated } = useSelector(authSelector)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
        const { data } = await axios.get(`${host}/wallet`, config)
        setWalletData(data)
      } catch (err) {
        console.log(err, 'err')
      } finally {
        setLoading(false)
      }
    }

    fetchWallet()
  }, [])
  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <div>
      <Head>
        <title>Reviews - Profile - Ostello</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className="fixed w-full bg-white z-50 top-0 shadow">
      <Navbar />
      </div>
      <ProfileToggleNavbar></ProfileToggleNavbar>

      <div className=' grid grid-cols-8 gap-0 bg-white mt-7'>
        <div className=' hidden  lg:block col-span-2 '>
          <div>
            <ProfileNavbar></ProfileNavbar>
          </div>
        </div>
        <div className=' '>
          <h1 className='text-2xl md:text-4xl mx-auto text-center my-10'>
            Wallet
          </h1>
          <div
            className='mt-20 flex justify-around mx-auto w-[400px] shadow-xl rounded-lg px-4 py-2
          '
          >
            <div className='flex flex-col items-center w-fit space-y-2'>
              <BsCoin className='text-6xl' />
              <h2 className='text-lg'>Balance</h2>
            </div>

            <div className='text-7xl'>{walletData?.balance || 0} ₹</div>
          </div>
          <>
            <p className='text-xl whitespace-nowrap px-4 py-2 my-10 '>
              Used Referral Code : {walletData?.referralcode}
            </p>
          </>
        </div>
      </div>
    </div>
  )
}
