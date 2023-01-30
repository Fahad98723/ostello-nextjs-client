import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

function Modal({
  open,
  children,
  onClose = () => {},
  modalRef,
  closeOnOutsideClick = true,
}) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setMounted(true)
    if (document) {
      const dom = document.querySelector('#root-modal')
      ref.current = dom
    }
  }, [])

  if (!open) return null

  const JSX_MODAL = (
    <>
      <div
        className='h-screen w-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-[999]  '
        ref={modalRef}
        onClick={() => {
          closeOnOutsideClick && onClose()
        }}
      >
        <ModalContainer
          className=' rounded-lg '
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </ModalContainer>
      </div>
    </>
  )
  if (mounted && ref.current) {
    return ReactDOM.createPortal(JSX_MODAL, ref.current)
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  background-color: #fff;
`

export default Modal
