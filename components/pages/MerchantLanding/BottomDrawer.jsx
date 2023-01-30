import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import React, { useState } from 'react'
import { useClickOutside } from '../../components/hooks/useClickOutside'

export default function BottomDrawerMobile({
  placeholderText,
  isOpen,
  children,
  options = [],
  selectedValue = '',
  className,
  primaryVariant,
  onChange,
  isDropdown,
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(selectedValue)
  // let domNode = useClickOutside(() => {
  //   setOpen(false)
  // })

  return (
    <>
      {!isDropdown ? (
        <div className='sm:hidden w-fit bg-white drawer'>
          <div
            onClick={() => setOpen(true)}
            className='flex items-center relative ring-1 ring-gray/30  justify-between m-1 px-3 rounded-md py-1 space-x-2 w-fit cursor-pointer select-none'
          >
            <p className=' whitespace-nowrap'>{placeholderText}</p>
            {children && (
              <>
                {open ? (
                  <UpOutlined className='flex items-center text-gray/30 text-xs' />
                ) : (
                  <DownOutlined className='flex items-center text-gray/30 text-xs' />
                )}
              </>
            )}
          </div>

          <Drawer
            closable={false}
            headerStyle={{
              padding: 0,
              backgroundColor: 'transparent',
            }}
            bodyStyle={{ padding: 0, maxHeight: '70vh' }}
            className=' sm:hidden p-0 '
            title={
              <div className='p-4 rounded-lg'>
                <p className=''>{placeholderText}</p>
              </div>
            }
            height={'auto'}
            visible={open}
            onClose={() => setOpen(!open)}
            placement={'bottom'}
          >
            <span>{children}</span>
          </Drawer>
        </div>
      ) : (
        <div className='w-fit'>
          <div
            onClick={() => setOpen(true)}
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

          <Drawer
            closable={false}
            headerStyle={{
              padding: 0,
              backgroundColor: 'transparent',
            }}
            bodyStyle={{ padding: 0, maxHeight: '70vh' }}
            className=' sm:hidden p-0 no-scrollbar '
            title={
              <div className='p-4 rounded-lg'>
                <p className=''>{placeholderText}</p>
              </div>
            }
            height={'auto'}
            visible={open}
            onClose={() => setOpen(!open)}
            placement={'bottom'}
          >
            <div
              className={` py-1 rounded-lg divide divide-y-[.5px] divide-gray/10   bg-white no-scrollbar ${
                !open && 'hidden'
              }`}
            >
              {options.map((item, i) => (
                <div
                  onClick={() => {
                    setSelected(item)
                    onChange(item)
                  }}
                  key={i}
                >
                  <p
                    className={`px-5 py-1 cursor-pointer transition-all duration-300 ease-in-out  ${
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
            <div className='flex p-2  rounded-lg justify-between border mb-10 border-b-0 border-l-0  border-r-0 border-gray/10   '>
              <button className='text-primary text-sm px-8 py-1 font-medium'>
                Clear All
              </button>

              <button className='bg-primary text-white px-8 py-1 rounded-md '>
                Apply
              </button>
            </div>
          </Drawer>
        </div>
      )}
    </>
  )
}
