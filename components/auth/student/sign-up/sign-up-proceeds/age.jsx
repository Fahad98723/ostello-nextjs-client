import React, { useState } from 'react'

const Data = [
  {
    id: 1,
    title: '18 & Above',
  },
  {
    id: 2,
    title: 'Below 18',
  },
]

const DetectAge = () => {
  const [checked, setChecked] = useState(1)

  const handleToggle = (id) => {
    if (checked === id) {
      return setChecked(1)
    }
    setChecked(id)
  }

  return (
    <>
      <p className='md:mt-10 font-dm-sans font-semibold text-lg capitalize text-primary'>
        Select Age Group
      </p>

      {Data.map((d, idx) => (
        <CheckBox
          onToggle={() => handleToggle(d.id)}
          currentValue={d}
          active={checked === d.id}
          key={idx}
        />
      ))}
    </>
  )
}

export default DetectAge

const CheckBox = ({ currentValue, onToggle, active }) => {
  return (
    <div
      onClick={onToggle}
      key={currentValue.id}
      className={
        active
          ? 'flex items-center font-dm-sans text-primary rounded-xl p-5 border border-primary mt-4 cursor-pointer h-10'
          : 'flex items-center font-dm-sans text-light-black rounded-xl p-5 h-10 border border-light-black mt-4 cursor-pointer'
      }
    >
      <div
        className={
          active
            ? 'rounded-full w-5 h-5 border-2 border-primary mr-3 flex justify-center items-center'
            : 'rounded-full w-5 h-5 border-2 border-light-black mr-3 flex justify-center items-center'
        }
      >
        <div className={active ? 'h-3 w-3 bg-primary rounded-full' : ''}></div>
      </div>
      <label className='cursor-pointer'>{currentValue.title}</label>
    </div>
  )
}
