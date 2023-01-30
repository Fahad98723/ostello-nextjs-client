import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Container from '../../layout/Container'
import { isEmpty } from '../../../utils/utils'
import { selectCourse } from '../../../redux/slices/courseSlice'

export default function FAQ({ faqs }) {
  const activeTab = useRef({})
  const [activeKey, setActiveKey] = useState(null)
  if (!isEmpty(faqs)) return null

  return (
    <div name='FAQ' className=''>
      <Container>
        <div className=' lg:py-20 py-10 cursor-pointer px-5'>
          <h1 className=' hidden md:block text-5xl text-center py-10 pb-20 font-bold '>
            Frequently Asked Questions
          </h1>
          <h1 className='lg:text-5xl text-4xl md:hidden text-center py-10 font-medium   '>
            FAQs
          </h1>
          <div className=' md:w-[70%] mx-auto py-5 max-w-[1080px]'>
            {faqs?.map((item, idx) => (
              <div
                key={idx}
                ref={activeTab}
                className='flex flex-col space-y-2 my-2'
                onClick={() => {
                  setActiveKey(idx === activeKey ? null : idx)
                  // executeScroll()
                }}
              >
                <div className='md:p-10 p-5  flex items-center justify-between bg-[#6E3DA5] rounded-xl text-xl text-white  select-none '>
                  <p className='md:text-2xl text-lg'>{item.section}</p>

                  {
                    <PlusOutlined
                      className={`mr-5 font-bold transition-all duration-100 ${
                        activeKey === idx && 'rotate-45 '
                      }`}
                    />
                  }
                </div>
                <div className={activeKey === idx ? 'block mb-5 ' : 'hidden '}>
                  {item.faqs.map((item, i) => (
                    <div
                      key={i}
                      className='border border-[#7A81DC] rounded-xl mb-4 py-4 px-5 text-[#616161]  text-xl '
                    >
                      <p className='font-bold md:pl-10 mb-5'>{item.question}</p>
                      <p className=' md:pl-10'> {item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className=' flex items-center md:space-x-4 md:justify-end justify-center flex-col md:flex-row md:text-xl text-md '>
              <p className=''>Or visit our help center to know more</p>
              <Link prefetch={false} href='/' className='font-bold text-[#0026AE] underline '>
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

// const faqs = JSON.parse(currentCourse.faqs)

// const faqs = [
//   {
//     section: 'Payment',
//     faqs: [
//       {
//         question: 'What card options do I have for the payment?',
//         answer:
//           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown pr',
//       },
//       {
//         question: 'What are the EMI options available?',
//         answer:
//           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown pr',
//       },
//       {
//         question:
//           'I have another payment issue,where will I get the information?',
//         answer: 'Please visit the help center to confirm all your queries',
//       },
//     ],
//   },
//   {
//     section: 'Completion',
//     faqs: [
//       {
//         question: 'What card options do I have for the payment?',
//         answer:
//           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown pr',
//       },
//       {
//         question: 'What are the EMI options available?',
//         answer:
//           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown pr',
//       },
//       {
//         question:
//           'I have another payment issue,where will I get the information?',
//         answer: 'Please visit the help center to confirm all your queries',
//       },
//     ],
//   },
//   {
//     section: 'Projects',
//     faqs: [
//       {
//         question: 'What card options do I have for the payment?',
//         answer:
//           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown pr',
//       },
//       {
//         question: 'What are the EMI options available?',
//         answer:
//           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown pr',
//       },
//       {
//         question:
//           'I have another payment issue,where will I get the information?',
//         answer: 'Please visit the help center to confirm all your queries',
//       },
//     ],
//   },
//   {
//     section: 'Mentorship',
//     faqs: [
//       {
//         question: 'What card options do I have for the payment?',
//         answer:
//           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown pr',
//       },
//       {
//         question: 'What are the EMI options available?',
//         answer:
//           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown pr',
//       },
//       {
//         question:
//           'I have another payment issue,where will I get the information?',
//         answer: 'Please visit the help center to confirm all your queries',
//       },
//     ],
//   },
// ]
// const executeScroll = () => activeTab.current.scrollIntoView()
// Scrolling to the node should be added
