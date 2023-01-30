import React, { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useClickOutside } from '../../../../../components/hooks/useClickOutside'
import { addRegisterData } from '../../../../../redux/slices/signUpSlice'

//residence drop down menu data
const Data = [
  {
    title: 'Andaman and Nicobar Islands',
  },
  {
    title: 'Andhra Pradesh',
  },
  {
    title: 'Arunachal Pradesh',
  },
  {
    title: 'Bihar ',
  },
  {
    title: 'Chandigarh ',
  },
  {
    title: 'Assam ',
  },
  {
    title: 'Chhattisgarh ',
  },
  {
    title: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    title: 'Delhi ',
  },
  {
    title: 'Goa ',
  },
  {
    title: 'Gujarat ',
  },
  {
    title: 'Haryana ',
  },
  {
    title: 'Himachal Pradesh',
  },
  {
    title: 'Jammu and Kashmir',
  },
  {
    title: 'Jharkhand ',
  },
  {
    title: 'Karnataka ',
  },
  {
    title: 'Kerala ',
  },
  {
    title: 'Ladakh ',
  },
  {
    title: 'Lakshadweep ',
  },
  {
    title: 'Madhya Pradesh',
  },
  {
    title: 'Maharashtra ',
  },
  {
    title: 'Manipur ',
  },
  {
    title: 'Meghalaya ',
  },
  {
    title: 'Mizoram ',
  },
  {
    title: 'Nagaland ',
  },
  {
    title: 'Odisha ',
  },
  {
    title: 'Puducherry ',
  },
  {
    title: 'Punjab ',
  },
  {
    title: 'Rajasthan ',
  },
  {
    title: 'Sikkim ',
  },
  {
    title: 'Tamil Nadu',
  },
  {
    title: 'Telangana ',
  },
  {
    title: 'Tripura ',
  },
]

//residence drop down menu
const Residence = () => {
  const [active, setActive] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const Toggler = () => {
    setActive(!active)
  }

  const dispatch = useDispatch()

  const onOptionClicked = (value) => () => {
    setSelectedOption(value)
    dispatch(addRegisterData({ city: value }))
    setActive(false)
  }

  let domNode = useClickOutside(() => {
    setActive(false)
  })

  return (
    <div ref={domNode} className='relative'>
      <div
        onClick={Toggler}
        className='cursor-pointer  border border-gray h-10 rounded-lg mt-4 mb-2 p-4 flex items-center justify-between w-[200px]'
      >
        <p className=' truncate'>{selectedOption || 'State of Residence'}</p>{' '}
        <span>{active ? <BsChevronUp /> : <BsChevronDown />}</span>
      </div>

      {active && (
        <div>
          <ul className='absolute bg-white rounded-lg w-full p-4 shadow-xl h-[44vh] overflow-y-scroll'>
            {Data.map((d, i) => (
              <>
                <li
                  className='cursor-pointer text-light-black capitalize text-sm font-dm-sans my-3'
                  onClick={onOptionClicked(d.title)}
                  key={i}
                >
                  {d.title}
                </li>
                <div className='h-1 bg-gray opacity-25 w-full'></div>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Residence
