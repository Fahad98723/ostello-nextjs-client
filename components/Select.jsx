import { DownOutlined, UpOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useRouter, useParams } from 'react-router-dom'
import { useClickOutside } from './hooks/useClickOutside'
import useScreenWidth from './hooks/useScreenWidth'
import { titleToUrl } from './utils'

export default function Select({
  placeholderText,
  isOpen,
  children,
  isSelectOption,
  options = [],
  selectedValue = '',
  className,
  primaryVariant,
  onChange,
  baseLink,
  divider,
  suffix,
  prefix,
  originLeft = true,

  ring = true,
}) {
  const [open, setOpen] = useState(isOpen)
  const [selected, setSelected] = useState(selectedValue)
  const { screenWidth, screenSize } = useScreenWidth()
  const router = useRouter()
  let domNode = useClickOutside(() => {
    setOpen(false)
  })
  return (
    <div className='' ref={domNode}>
      <div
        onClick={() => setOpen(!open)}
        className={`flex relative items-center  ${
          ring && 'ring-1'
        } ring-gray/30  justify-between m-1 px-3 rounded-md text-xl text-white py-1 space-x-2 w-fit cursor-pointer select-none   ${
          primaryVariant && ' bg-primary'
        } ${className}`}
      >
        {prefix}
        <p className=' whitespace-nowrap '>
          {' '}
          {isSelectOption && selected ? selected : placeholderText}
        </p>
        {(children || options.length > 0) && (
          <>
            {open ? (
              <UpOutlined
                className={`flex items-center text-white text-xs $`}
              />
            ) : (
              <DownOutlined
                className={`flex items-center  text-xs text-white`}
              />
            )}
          </>
        )}
        {suffix}
        <>
          <div
            className={`absolute top-14  ${
              originLeft ? '-left-2' : '-right-2'
            } sm:shadow-3xl py-1 rounded-lg w-fit ${
              divider && 'divide-y-[.5px] divide-gray/10'
            }  bg-white text-black ${!open && 'hidden'}`}
          >
            {options.map((item, i) => (
              <div
                onClick={() => {
                  setSelected(item)
                  onChange(titleToUrl(item))
                  baseLink && router.push(`${baseLink}${titleToUrl(item)}`)
                  setOpen(!open)
                }}
                key={i}
              >
                <p
                  className={`px-3 py-1 cursor-pointer transition-all whitespace-nowrap duration-300 ease-in-out  ${
                    titleToUrl(item) === selected
                      ? 'bg-primary text-white'
                      : 'hover:bg-primary/60 hover:text-white'
                  }`}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  )
}
