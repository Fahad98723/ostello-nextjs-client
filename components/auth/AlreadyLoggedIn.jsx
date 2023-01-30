import React from 'react'
import Link from 'react-router-dom'
import Logo from '../../assets/logo_title.svg'
import { logout } from './Login'
const AlreadyLoggedIn = () => {
  return (
    <main className='w-screen h-screen m-0 p-0 overflow-x-hidden overflow-y-hidden flex flex-col space-y-4 items-center justify-center  font-dm-sans'>
      <img loading='lazy' src={Logo} alt='' className='h-16' />
      <h1 className='text-4xl font-extrabold'>Already logged in!</h1>
      <h2 className='text-ghost text-lg'>
        Redirect to{' '}
        <Link prefetch={false} href={'/'}>
          {' '}
          <span className='underline'>Home Page</span>{' '}
        </Link>
      </h2>
      <button
        onClick={() => {
          // typeof window !== 'undefined' && window.localStorage.clear();
          logout()
          typeof window !== 'undefined' && window.location.href = '/login'
        }}
        className='shadow-md px-6 py-1 border-2 text-lg border-ghost rounded-xl text-ghost'
      >
        Logout
      </button>
    </main>
  )
}

export default AlreadyLoggedIn
