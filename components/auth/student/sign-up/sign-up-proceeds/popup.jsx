import React from 'react';
//image src
import Popup from '../../../../../assets/courses_institutions/sign-up/popup.svg';
//sub components
import Button from '../../sub-components/Button';
const PopUp = ({ handleActive }) => {
  return (
    <div className='popup z-50 fixed bg-black bg-opacity-25 top-0 bottom-0 left-0 right-0 h-screen flex justify-center items-center'>
      <div className='p-3 md:w-96 font-dm-sans flex flex-col w-11/12  items-center rounded-3xl bg-white'>
        <img style={{ width: '13rem' }} src={Popup.src} alt='vector' />
        <h4 className='text-primary font-semibold text-3xl my-5'>
          Congratulations!
        </h4>
        <p className='text-center text-lg mb-4'>
          Complete your sign up and your reward will be waiting
        </p>
        <Button onClick={() => handleActive('otp')} content='Continue' />
      </div>
    </div>
  )
}

export default PopUp