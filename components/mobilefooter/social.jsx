import React from 'react';
import  Link  from 'next/link';
import { FaFacebookF,FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineInstagram, AiFillYoutube } from 'react-icons/ai';

const Social = () => {
    return (
        <div className='flex justify-center items-center mt-12'>
            <Link prefetch={false} href="/">
                <FaFacebookF className='text-white mx-2 text-2xl'/>
            </Link>
            <Link prefetch={false} href="/">
                <AiOutlineInstagram className='text-white mx-2  text-2xl' />
            </Link>
            <Link prefetch={false} href="/">
                <AiFillYoutube className='text-white mx-2  text-2xl' />
            </Link>
            <Link prefetch={false} href="/">
                <FaLinkedinIn className='text-white mx-2 text-2xl'/>
            </Link>
        </div>
    )
}

export default Social