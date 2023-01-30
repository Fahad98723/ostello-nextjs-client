import React from 'react'

import { useCopyToClipboard } from 'react-use'

import avatar from './blog-assets/avatar.png'
import coverImg from './blog-assets/coverImg.png'
import introduction from './blog-assets/introduction.png'
import otherResource from './blog-assets/otherResource.png'
import copyIcon from './blog-assets/copyIcon.svg'

import facebook from '../../../../assets/icons/facebook.svg'
import twitter from '../../../../assets/icons/twitter.svg'
import linkedin from '../../../../assets/icons/linkedin.svg'
import OstelloSubscribe from '../../HomeLanding/OstelloSubscribe'
// import Navbar from '../../../layout/Navbar'
import { BsAward } from 'react-icons/bs'
import {
  AppstoreOutlined,
  IdcardOutlined,
  NotificationOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Footer from '../../../layout/Footer'
import { useRouter } from 'next/router'
import Navbar from '../../HomeLanding/Header/Navbar'
import toast from 'react-hot-toast'

// Tag Components ==>>
const Section = ({ children, className }) => (
  <section className={` space-y-2 mt-10 md:max-w-3xl md:mx-auto ${className}`}>
    {children}
  </section>
)
const Title = ({ children, className }) => (
  <h1 className={`font-bold text-2xl ${className}`}>{children}</h1>
)
const Paragraph = ({ children, className }) => (
  <p className={`text-gray py-2 md:text-lg ${className}`}>{children}</p>
)
const Image = ({ src, className }) => (
  <img className={`w-full ${className}`} src={src?.src} alt='' />
)

const Divider = ({ className }) => (
  <span
    className={`border-2 border-l-0 border-r-0 border-b-0 block w-full max-w-3xl mx-auto border-gray/10 ${className}`}
  />
)

const Tag = ({ type, children, className }) => {
  let red = ` text-[#FF0000]-600 bg-red-100 `
  let green = ` text-green-600 bg-green-100 `
  let blue = ` text-blue-600 bg-blue-100 `

  return (
    <span
      className={` rounded-xl px-2 py-1 ${
        type == 'red'
          ? red
          : type == 'green'
          ? green
          : type == 'blue'
          ? blue
          : null
      } ${className}`}
    >
      {children}
    </span>
  )
}

const LinkButton = ({ children, className, url, onClick, ...rest }) => {
  const router = useRouter()
  const handleClick = () => {
    if (url?.length) {
      router.push(url)
    }
  }
  return (
    <button
      onClick={() => {
        onClick()
        handleClick()
      }}
      className={` border-2 border-gray/30 rounded-md  active:opacity-80 duration-300 transition-all p-2 h-8 flex items-center justify-center w-fit  ${className}`}
    >
      {children}
    </button>
  )
}

export default function Blog() {
  const [state, copyToClipboard] = useCopyToClipboard()

  return (
    <>
      <Navbar usingFor={'blog'} />
      <main className='my-20 px-6 max-w-5xl mx-auto'>
        {/* Header */}
        <Section className='flex justify-center items-center flex-col -mt-6 '>
          <p className=' text-primary text-center  font-bold'>
            Published 20 Jan 2022
          </p>
          <Title className={'text-4xl text-center sm:text-left'}>
            UX review presentations
          </Title>
          <Paragraph className='text-center max-w-xl'>
            How do you create compelling presentations that wow your collegues
            and impress your managers? Here's how to get started.
          </Paragraph>
          <div className='flex items-center justify-center space-x-2 pt-2'>
            <Image src={avatar} className='w-fit ' alt='' />
            <div>
              <h6 className='text-black font-bold'>Olivia Rhye</h6>
              <span className='block text-gray '>20 Jan 2022</span>
            </div>
          </div>
        </Section>

        {/* Cover */}
        <section className=' space-y-4 my-10'>
          <Image src={coverImg} className='w-full h-full' alt='' />
          <Paragraph className='max-w-3xl mx-auto'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
            massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
            purus. Non massa enim vitae duis mattis. Vel in ultricies vel
            fringilla.
          </Paragraph>
          <Divider />
        </section>

        {/* Section */}
        <Section>
          <Title className=''>Introduction</Title>
          <Paragraph>
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
            suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum
            quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris
            posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At
            feugiat sapien varius id.
          </Paragraph>
          <Paragraph>
            Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat
            mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu
            quis fusce augue enim. Quis at habitant diam at. Suscipit tristique
            risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie
            aliquet sodales id est ac volutpat.
          </Paragraph>
          <Image src={introduction} alt='' />
          <Paragraph>
            Image courtesy of Laura Davidson via{' '}
            <a className=' underline' href='https://unsplash.com/'>
              Unsplash
            </a>
          </Paragraph>

          {/* Quote */}
          <div className='border py-2 border-primary  border-l-2 border-r-0 border-t-0 border-b-0 pl-5'>
            <p className=' font-bold italic max-w-lg md:text-lg'>
              " In a world older and more complete than ours they move finished
              and complete, gifted with extensions of the senses we have lost or
              never attained,living by voices we shall never hear. "
            </p>
            <p className='mt-5 text-gray'> - Olivia Rhye, Product Designer</p>
          </div>

          <Paragraph>
            Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla
            odio nisl vitae. In aliquet pellentesque aenean hac vestibulum
            turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada
            fringilla.
          </Paragraph>
          <Paragraph>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet
            commodo consectetur convallis risus. Sed condimentum enim dignissim
            adipiscing faucibus consequat, urna. Viverra purus et erat auctor
            aliquam. Risus, volutpat vulputate posuere purus sit congue
            convallis aliquet. Arcu id augue ut feugiat donec porttitor neque.
            Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor
            lacus, eget nunc lectus in tellus, pharetra, porttitor.
          </Paragraph>
          <Paragraph>
            Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris
            id. Non pellentesque congue eget consectetur turpis. Sapien, dictum
            molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis
            velit eget ut tortor tellus. Sed vel, congue felis elit erat nam
            nibh orci.
          </Paragraph>
        </Section>

        {/* Software and tools */}
        <Section>
          <Title>Software and tools</Title>
          <Paragraph>
            Pharetra morbi libero id aliquam elit massa integer tellus. Quis
            felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit
            dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in ac
            pellentesque ac.
          </Paragraph>
        </Section>

        {/* Other Resources */}
        <Section>
          <Title>Other resources</Title>
          <Paragraph>
            Sagittis et eu at elementum, quis in. Proin praesent volutpat
            egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac.
            Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur
            ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim
            massa erat cursus vulputate gravida id. Sed quis auctor vulputate
            hac elementum gravida cursus dis.
          </Paragraph>
          <div className='pb-4 md:text-lg'>
            <p className='text-gray'>
              {' '}
              1. Lectus id duis vitae porttitor enim gravida morbi.
            </p>
            <p className='text-gray'>
              {' '}
              2. Eu turpis posuere semper feugiat volutpat elit, ultrices
              suspendisse. Auctor vel in vitae placerat.
            </p>
            <p className='text-gray'>
              {' '}
              3. Suspendisse maecenas ac donec scelerisque diam sed est duis
              purus.
            </p>
          </div>

          <Image src={otherResource} alt='' />
          <Paragraph>
            Image courtesy of Alex Loup via{' '}
            <a className=' underline' href='https://unsplash.com/'>
              Unsplash
            </a>
          </Paragraph>

          <Paragraph>
            Lectus leo massa amet posuere. Malesuada mattis non convallis
            quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum
            in non. Pretium ultricies tempor non est diam. Enim ut enim amet
            amet integer cursus. Sit ac commodo pretium sed etiam turpis
            suspendisse at.
          </Paragraph>

          <Paragraph>
            Tristique odio senectus nam posuere ornare leo metus, ultricies.
            Blandit duis ultricies vulputate morbi feugiat cras placerat elit.
            Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque
            suscipit accumsan. Cursus viverra aenean magna risus elementum
            faucibus molestie pellentesque. Arcu ultricies sed mauris
            vestibulum.
          </Paragraph>
        </Section>

        {/* Conclution */}

        <Section>
          <Title>Conclution</Title>
          <Paragraph>
            Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id
            scelerisque est ultricies ultricies. Duis est sit sed leo nisl,
            blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at
            scelerisque amet nulla purus habitasse.
          </Paragraph>
          <Paragraph>
            Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas
            condimentum mi massa. In tincidunt pharetra consectetur sed duis
            facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit
            dictum eget nibh tortor commodo cursus.
          </Paragraph>
          <Paragraph>
            {' '}
            Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce
            aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id
            morbi eget ipsum. Aliquam senectus neque ut id eget consectetur
            dictum. Donec posuere pharetra odio consequat scelerisque et, nunc
            tortor.
          </Paragraph>
          <Paragraph>
            Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim
            posuere cursus diam.
          </Paragraph>
        </Section>
        <Divider className={'mt-10 -mb-6'} />
        <Section
          className={
            'flex flex-col md:flex-row space-y-6 md:justify-between md:space-y-0'
          }
        >
          <div className=' space-x-2'>
            <Tag type={'blue'}>Product</Tag>
            <Tag type={'red'}>Tools</Tag>
            <Tag type={'red'}>SaaS</Tag>
          </div>

          <div className='flex space-x-2'>
            <Link prefetch={false}Button
              onClick={() => {
                copyToClipboard(location.href)
                toast.success('Link coppied !')
              }}
            >
              <div className='flex items-center  space-x-2 px-2'>
                <img src={copyIcon.src} className='w-5 h-5' alt='' />
                <p className='text-gray'>Copy link</p>
              </div>
            </LinkButton>
            <Link prefetch={false}Button>
              <img src={twitter.src} className='w-5 h-5' alt='' />
            </LinkButton>
            <Link prefetch={false}Button>
              <img src={facebook.src} className='w-5 h-5' alt='' />
            </LinkButton>
            <Link prefetch={false}Button>
              <img src={linkedin.src} className='w-5 h-5' alt='' />
            </LinkButton>
          </div>
        </Section>
      </main>
      <OstelloSubscribe />
      <Footer />
    </>
  )
}
