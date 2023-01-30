import React from 'react'
import Link  from 'next/link'
import Logo from '../../../../assets/logo_title.svg'

const Navbar = () => {
  return (
    <div className='shadow z-40 flex justify-between items-center px-6 md:px-14 pt-6 pb-4 bg-white w-full'>
      <Link prefetch={false} href='/'>
        <img src={Logo.src} alt='logo' className='w-40' />
      </Link>
      <Link prefetch={false}
        href='/login'
      >
        <a className='bg-primary px-8 py-1 font-dm-sans text-white rounded-lg' href="">Login</a>
      </Link>
    </div>
  )
}

export default Navbar