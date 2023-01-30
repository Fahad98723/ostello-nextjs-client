import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { assets } from '../../../utils/assets'
import { isEmpty } from '../../../utils/utils'
const Logo = assets.images.ostello_titled_logo
import { footerLinks, socialLinks } from './Data'

export default function Footer() {
  return (
    <footer className='  divide-y divide-gray/20 md:p-10 p-5 container mx-auto '>
      <div className='flex  flex-col md:flex-row justify-center space-y-10 sm:space-y-0 sm:space-x-[100px] mb-5'>
        <div className='md:w-9/12'>
          <Image src={Logo} height={31} width={151} alt='ostello-logo' />
          <p className='mt-5'>
          Ostello empowers people to take control of their career <br />
           decisions and achieve their version of success.
          </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3  gap-5 grid-rows-2 sm:sm:grid-rows-none w-full'>
          {footerLinks.map((item, key) => (
            <div key={key}>
              <h1>{item.domain}</h1>
              <div className='sm:mt-5'>
                {item.subDomains.map((subDomain, key) => (
                  <Link prefetch={false} href={subDomain.url} key={key}>
                    <a href='' className='flex items-center my-2'>
                      <p className='text-gray hover:text-primary duration-300'>
                        {subDomain.title}
                      </p>
                      {!isEmpty(subDomain.tag) && (
                        <span className='mx-1 h-fit px-1 bg-emerald-300 text-green-700 rounded-md text-xs'>
                          {subDomain.tag}
                        </span>
                      )}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex md:flex-row-reverse flex-col pt-5 justify-between md:items-center'>
        <div className='flex space-x-5 items-center'>
          {socialLinks.map((item, key) => (
            <Link prefetch={false} key={key} href={item.url}>
              <a className='' key={key}>
                <img className={`${item.size}`} src={item.img} alt={item.title} />
              </a>
            </Link>
          ))}
        </div>
        <p className='mt-2 md:mt-0'>
          {' '}
          &copy; {(new Date()).getFullYear()} Ostello India Private Limited
        </p>
      </div>
    </footer>
  )
}
