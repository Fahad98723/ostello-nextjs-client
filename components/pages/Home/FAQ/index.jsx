import React, { useState } from 'react'
import FaqLogic from './FaqLogic'
import Data from './data'
import Link from 'next/link'

const FAQ = () => {
  const [clicked, setClicked] = useState(1)

  const handleToggle = (id) => {
    if (clicked === id) {
      return setClicked(1)
    }
    setClicked(id)
  }

  return (
    <section className='relative overflow-x-hidden my-10'>
      <h2 className='font-dm-sans text-xl md:text-4xl font-bold text-center mb-4 md:mb-12  md:text-center ml-4 md:ml-0'>
        Frequently Asked Questions
      </h2>
      <div className='flex items-center justify-center flex-col'>
        {Data?.map((d) => (
          <FaqLogic
            currentValue={d}
            key={d.id}
            onClick={() => handleToggle(d.id)}
            active={clicked === d.id}
          />
        ))}
      </div>
      <div className='flex justify-center md:justify-end items-center w-full md:w-4/5'>
        <div className='text-medium-slate text-center md:text-right'>
          <span>Or visit our help center to know more</span>
          <br className='md:hidden' />
          <Link prefetch={false} href='/helpcenter' passHref>
            <a
              className='underline font-bold ml-2'
              style={{ color: '#0026AE' }}
            >
              Help Center
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FAQ
