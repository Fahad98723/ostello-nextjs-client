import React from 'react'

const Btn = ({ title, className, onclick }) => {
  return (
    <button
      onClick={onclick}
      className={`font-dm-sans md:mt-8 mb-2 bg-white md:text-lg text-sm rounded-xl md:px-8 px-6 md:py-3 py-2 font-semibold outline-none border-0 ${className}`}
      style={{
        color: 'rgba(125, 35, 224, 1)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      {title}
    </button>
  )
}

export default Btn
