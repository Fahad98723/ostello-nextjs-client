import React from 'react';
import  Link  from 'next/link';
import { Container, FooterDivider } from './index.styled';
import { AboutUs, Contact, Terms, Events } from './sections';
import Logo from '../../assets/logo_title_light.svg';
import Social from './social';


const MobileFooter = () => {
    return (
        <Container className='z-10 overflow-x-hidden'>
            <Link prefetch={false} href="/"> <img src={Logo.src} alt="logo" className='pl-11 w-52 mt-4 mb-10'/></Link>
            <AboutUs />
            <FooterDivider />
            <Events />
            <FooterDivider />
            <Contact />
            <FooterDivider />
            <Terms />
            <Social />
            <div className="text-center lg:text-xl font-semibold text-white mt-10">
                2022 &copy; Ostello India Private Limited
            </div>
        </Container>
    )
}

export default MobileFooter