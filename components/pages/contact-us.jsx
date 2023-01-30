import React, { Fragment, useState, useEffect } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import { HiPhone } from 'react-icons/hi'
import { HiOutlineMail } from 'react-icons/hi'
import Footer from '../layout/Footer'
import NavHeader from '../layout/NavHeader'
import BackgroundGradient from '../assets/background/landing_gradient.png'
import ContactVector from '../assets/vectors/contactVector.png'
import toast from 'react-hot-toast'
import useScreenWidth from '../hooks/useScreenWidth'
import MetaHelmet from '../MetaHelmet'
// import OstelloMap from '../components/OstelloMaps';

const Contact = ({meta}) => {
  const { screenWidth } = useScreenWidth()
  const [name, setName] = useState(false)
  const [email, setEmail] = useState(false)

  const [message, setMessage] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [messageValue, setMessageValue] = useState('')

  const submitHandler = () => {
    nameValue.length < 1 ? setName(true) : setName(false)
    emailValue.length < 1 ? setEmail(true) : setEmail(false)
    messageValue.length < 1 ? setMessage(true) : setMessage(false)

    toast.success('Message has been sent!')
  }


  return (
    <Fragment>
      <div
        className='font-dm-sans w-screen min-h-screen'
        style={
          screenWidth > 768
            ? {
                backgroundImage: `url(${BackgroundGradient.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100vw 90vh',
                backgroundPosition: '0% -25%',
              }
            : {}
        }
      >
        <MetaHelmet title={meta.title} description={meta.description} link={meta.link} />
        <NavHeader />

        <div className='lg:flex flex-row sm:pl-10 pl-8 justify-around bg-white w-50 m-auto md:w-9/12 block md:pl-0 lg:w-10/12 pt-10 xl:top-32 z-10  lg:pl-12 xl:pl-20 lg:pr-20 lg:mt-20 xl:mt-8 xl:pt-10 rounded-3xl pb-20 px-16'>
          <div className='lg:w-50'>
            <div className=''>
              <h1 className='block lg:inline-block font-semibold text-4xl xl:text-7xl text-primary mb-6xl:pl-0 mt-4'>
                Contact Us!
              </h1>

              <p className='lg:ml-4 mt-1 mb-10 xl:mb-0'>
                Start a conversation…
                <span className='text-purple-main'>
                  <br />
                  Send us a message{' '}
                </span>
                and we will respond as quickly as possible.
              </p>
            </div>

            <form action='' className='flex flex-col w-64 lg:ml-4 lg:mt-10'>
              <label htmlFor='name' className=''>
                Your Name
              </label>

              <input
                type='text'
                onChange={(e) => {
                  setNameValue(e.target.value)
                }}
                className='bg-primary bg-opacity-10 lg:w-80 h-8 rounded-lg  px-2  mt-2 mb-2'
              />

              {name && (
                <p className='text-[#FF0000]-900 font-semibold'>
                  Please Enter valid Name
                </p>
              )}

              <label htmlFor='email'>Your Email</label>

              <input
                onChange={(e) => {
                  setEmailValue(e.target.value)
                }}
                type='email'
                className='bg-primary bg-opacity-10 lg:w-80 h-8 rounded-lg px-2 mt-2 mb-2'
              />

              {email && (
                <p className='text-[#FF0000]-900 font-semibold'>
                  Please Enter valid Email
                </p>
              )}

              <label htmlFor='message'>Your Message</label>

              <textarea
                name='message'
                onChange={(e) => {
                  setMessageValue(e.target.value)
                }}
                placeholder='Type something if you want...'
                className='bg-primary bg-opacity-10 lg:w-80 h-32 rounded-lg p-2 mt-2'
              ></textarea>

              {message && (
                <p className='text-[#FF0000]-900 font-semibold'>
                  Please Enter valid Message
                </p>
              )}
            </form>

            <button
              onClick={submitHandler}
              className='bg-primary text-white w-32 rounded-lg mt-6 lg:ml-4 xl:mb-0 h-8'
            >
              Submit
            </button>
          </div>

          <div className=' lg:flex flex-col items-start w-30'>
            <img src={ContactVector.src} alt='' className='w-96' />

            <div className='container lg:flex flex-row justify-around lg:gap-10'>
              <div className=' lg:flex flex-col items-start w-30 pb-5'>
                <div
                  onClick={() =>
                    typeof window !== 'undefined' &&
                    (window.location = 'https://g.page/r/CciI9ETJBe0KEAE')
                  }
                  className='flex mt-10 cursor-pointer'
                >
                  <HiLocationMarker className='text-primary text-2xl mr-6' />
                  <p>
                    Block-A - 1/57 Jangpura Extention <br /> New Delhi - 110014
                  </p>
                </div>

                <div
                  onClick={() => (window.location = 'tel:+918271469630')}
                  className='flex mt-6 cursor-pointer'
                >
                  <HiPhone className='text-primary text-2xl mr-6' />
                  <p>8271469630</p>
                </div>

                <div
                  onClick={() =>
                    (window.location = 'mailto:support@ostello.co.in')
                  }
                  className='flex mt-6 cursor-pointer'
                >
                  <HiOutlineMail className='text-primary text-2xl mr-6' />
                  <p>Support@ostello.co.in</p>
                </div>
              </div>
              {/* <div className="rounded-lg border-solid border-2 border-purple-main">
                                <OstelloMap />
                            </div> */}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Fragment>
  )
}
export default Contact

export const getStaticProps = async () => {
  const meta = {
    title: "Contact Us - ostello.co.in",
    description: "For any information or query regarding any issue that you face, contact us at ostello.co.in",
    link: "https://www.ostello.co.in/contact-us"
  }
  // console.log(data);
  return {
    props: {
      meta,
    },
  };
};