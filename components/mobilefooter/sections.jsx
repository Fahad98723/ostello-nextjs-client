import React from 'react'
import Link  from 'next/link'
import Data from './data'

export const AboutUs = () => {
  return (
    <div className='pl-11'>
      {Data.map((d, idx) => (
        <div className='my-6' key={idx}>
          <h4 className='font-dm-sans my-3'>About us</h4>
          <div>
            {d.aboutus.map((dd, idx) => (
              <Link prefetch={false}
                href='/'
                key={idx}
                className='font-dm-sans block text-white  mb-1'
              >
                {dd.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Events = () => {
  return (
    <div className='pl-11'>
      {Data.map((d, idx) => (
        <div key={idx} className='my-6'>
          <h4 className='font-dm-sans my-3'>Events</h4>
          <div>
            {d.events.map((dd) => (
              <Link prefetch={false}
                href='/'
                key={dd.id}
                className='font-dm-sans block my-1 text-white  mb-1'
              >
                {dd.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Contact = () => {
  return (
    <div className='pl-11'>
      {Data.map((d, idx) => (
        <div key={idx} className='my-6'>
          <h4 className='font-dm-sans my-3'>Contact Us</h4>
          <div>
            {d.contact.map((dd) => (
              <Link prefetch={false}
                href={dd.href}
                key={dd.id}
                className='block font-dm-sans text-white mb-1'
              >
                {dd.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Terms = () => {
  return (
    <div className='pl-11'>
      {Data.map((d, key) => (
        <div key={key} className='my-6'>
          <h4 className='font-dm-sans my-3'>Terms of Use</h4>
          <div>
            {d.terms.map((dd) => (
              <Link prefetch={false}
                to='/'
                key={dd.id}
                className='block font-dm-sans text-white  mb-1'
              >
                {dd.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
