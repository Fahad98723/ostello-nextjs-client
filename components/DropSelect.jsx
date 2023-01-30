import { DownOutlined, UpOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useClickOutside } from './hooks/useClickOutside'

export default function DropSelect({
  affix,
  prefix,
  placeholderText,
  options = [],
  selectedValue = '',
  className,
  primaryVariant,
  onChange,
  children,
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(selectedValue)
  let domNode = useClickOutside(() => {
    setOpen(false)
  })
  return (
    <div className='w-fit hidden sm:block' ref={domNode}>
      <div
        onClick={() => setOpen(!open)}
        className={` flex items-center relative ring-1 ring-gray/30  justify-between  px-3 rounded-md py-1 space-x-2 w-fit cursor-pointer select-none ${className} ${
          primaryVariant && 'text-white bg-primary'
        }`}
      >
        <p className={` whitespace-nowrap`}>
          {selected ? selected : placeholderText}
        </p>
        {options.length && (
          <>
            {open ? (
              <UpOutlined
                className={`flex items-center  text-xs ${
                  primaryVariant ? 'text-white' : 'text-gray/30'
                }`}
              />
            ) : (
              <DownOutlined
                className={`flex items-center  text-xs ${
                  primaryVariant ? 'text-white' : 'text-gray/30'
                }`}
              />
            )}
          </>
        )}
      </div>
      <div
        className={`absolute sm:shadow-3xl z-[60] py-1 rounded-lg w-fit  bg-white ${
          !open && 'hidden'
        }`}
      >
        {options.map((item, i) => (
          <div
            onClick={() => {
              setSelected(item)
              onChange(item)
              setOpen(!open)
            }}
            key={i}
          >
            <p
              className={`px-3 py-1 cursor-pointer transition-all duration-300 ease-in-out  ${
                item === selected
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary/60 hover:text-white'
              }`}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
