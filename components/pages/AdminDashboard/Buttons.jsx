import React from 'react'

export default function Button({ children, variant = 'violet', ...rest }) {
  return (
    <>
      {variant === 'red' ? (
        <button className='px-12 font-bold rounded-lg py-2 text-white bg-[#7D23E0]'>
          {children}
        </button>
      ) : variant === 'violet' ? (
        <button className='px-12 text-center font-bold rounded-lg py-2 text-white bg-[#E46060]'>
          {children}
        </button>
      ) : null}
    </>
  )
}
