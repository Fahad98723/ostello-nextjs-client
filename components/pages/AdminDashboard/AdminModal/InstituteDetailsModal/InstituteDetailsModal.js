import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { instituteApprove } from '../../../redux/slices/adminInstitutesSlice'

const InstituteDetailsModal = ({ institute, setShowModal }) => {
  const {
    name,
    description,
    locations,
    phonenumber,
    approval,
    owner,
    id,
    services,
    classmode,
    establishedyear,
    achievements,
  } = institute

  const { city, line1, line2, area, country, pincode, state } = locations[0]

  const { skills, instituteDomain } = services
  const dispatch = useDispatch()

  const handleAccept = (value) => {
    const updatedData = {
      id,
      approve: approval - Number(value),
    }
    dispatch(instituteApprove(updatedData))
  }

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative lg:w-[50%] md:w-[70%] w-[90%] w mb-6 mx-auto max-w-6xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between py-3 px-5 rounded-t'>
              <div className='text-[26px] leading-[47px] font-medium'>
                Institute Details
              </div>
              <button
                className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => setShowModal(false)}
              >
                <span className=' bg-white border border-[#7D23E0] rounded-full p-4 flex justify-center items-center h-6 w-6 text-2xl text-[#7D23E0] outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className='relative px-6 h-[60vh] overflow-y-auto scrollbar-hide flex-auto'>
              <div className='mb-4'>
                <p className='text-[#767676] text-[14px] font-medium uppercase'>
                  Institute name
                </p>
                <p className='text-[#414141] capitalize text-[18px] font-medium'>
                  {name}
                </p>
              </div>
              <div className='mb-4'>
                <p className='text-[#767676] text-[14px] font-medium uppercase'>
                  Description
                </p>
                <p className='text-[#414141] text-[18px] font-medium'>
                  {description}
                </p>
              </div>
              <div className='mb-4'>
                <p className='text-[#767676] text-[14px] font-medium uppercase'>
                  institute Start date
                </p>
                <p className='text-[#414141] text-[18px] font-medium'>
                  {establishedyear}
                </p>
              </div>
              <div className='mb-4'>
                <p className='text-[#767676] text-[14px] font-medium uppercase'>
                  Institute type
                </p>
                <p className='text-[#414141] text-[18px] font-medium'>
                  {classmode === 1
                    ? 'Hybrid'
                    : classmode === 2
                    ? 'Online'
                    : 'Offline'}
                </p>
              </div>
              <div className='mb-4'>
                <p className='text-[#767676] text-[14px] font-medium uppercase'>
                  Address
                </p>
                <p className='text-[#414141] text-[18px] font-medium'>
                  {line1}, {line2} <br />
                  {area} <br />
                  {state} <span>{pincode}</span> <br />
                  {city} <br /> {country}
                </p>
              </div>
              <div className='mb-4'>
                <p className='text-[#767676] text-[14px] font-medium uppercase'>
                  Contact details
                </p>
                <p className='text-[#414141] text-[18px] font-medium'>
                  {phonenumber}
                </p>
              </div>
              <div className='mb-4'>
                <p className='text-[#767676] text-[14px] font-medium uppercase'>
                  Owner details
                </p>
                <p className='text-[#414141] text-[18px] font-medium'>
                  {owner?.name} <br />
                  {owner?.email} <br />
                  {owner?.phonenumber}
                </p>
              </div>
              <div className='mb-4'>
                <p className='text-[#414141] text-[14px] font-medium uppercase'>
                  Services offered
                </p>
                <div className='text-[#414141] flex flex-wrap gap-x-4 gap-y-2 mt-2 text-[17px]'>
                  {instituteDomain?.map((serviceOffered, index) => (
                    <button
                      key={index}
                      className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'
                    >
                      {serviceOffered}
                    </button>
                  ))}
                </div>
              </div>
              {skills?.length ? (
                <div className='mb-4'>
                  <p className='text-[#414141] text-[14px] font-medium uppercase'>
                    skill based
                  </p>
                  <div className='text-[#414141] flex gap-x-4 mt-2 text-[17px]'>
                    {skills?.map((skill, index) => (
                      <button
                        key={index}
                        className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              {instituteDomain?.map((domain) =>
                domain === 'Senior Secondary School (Class 11-12th)' ? (
                  <div className='mb-4'>
                    <p className='text-[#414141] text-[14px] font-medium uppercase'>
                      Senior Secondary
                    </p>
                    <p className='text-[#767676] mt-1 text-[14px] uppercase'>
                      Board
                    </p>
                    <div className='text-[#414141] flex gap-x-4 mt-1 text-[17px]'>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        CBSE
                      </button>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        ICSE
                      </button>
                    </div>
                    <p className='text-[#767676] mt-3 text-[14px] uppercase'>
                      Stream
                    </p>
                    <div className='text-[#414141] flex gap-x-4 mt-1 text-[17px]'>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        Science
                      </button>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        Humanities
                      </button>
                    </div>
                  </div>
                ) : domain === 'Competitive Exams' ? (
                  <div className='mb-4'>
                    <p className='text-[#414141] text-[14px] font-medium uppercase'>
                      Senior Secondary
                    </p>
                    <p className='text-[#767676] mt-1 text-[14px] uppercase'>
                      Board
                    </p>
                    <div className='text-[#414141] flex gap-x-4 mt-1 text-[17px]'>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        CBSE
                      </button>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        ICSE
                      </button>
                    </div>
                    <p className='text-[#767676] mt-3 text-[14px] uppercase'>
                      Stream
                    </p>
                    <div className='text-[#414141] flex gap-x-4 mt-1 text-[17px]'>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        Science
                      </button>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        Humanities
                      </button>
                    </div>
                  </div>
                ) : domain === 'Junior Secondary School (Class 6-10th)' ? (
                  <div className='mb-4'>
                    <p className='text-[#414141] text-[14px] font-medium uppercase'>
                      Senior Secondary
                    </p>
                    <p className='text-[#767676] mt-1 text-[14px] uppercase'>
                      Board
                    </p>
                    <div className='text-[#414141] flex gap-x-4 mt-1 text-[17px]'>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        CBSE
                      </button>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        ICSE
                      </button>
                    </div>
                    <p className='text-[#767676] mt-3 text-[14px] uppercase'>
                      Stream
                    </p>
                    <div className='text-[#414141] flex gap-x-4 mt-1 text-[17px]'>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        Science
                      </button>
                      <button className='py-2 px-3 rounded-lg border-2 border-[#A4A4A4]'>
                        Humanities
                      </button>
                    </div>
                  </div>
                ) : null
              )}
              <div className='mb-4'>
                <p className='text-[#414141] text-[14px] font-medium uppercase'>
                  Documents uploaded
                </p>
                <div className='text-[#414141] flex justify-between items-center px-4 py-2 mt-3 rounded-lg border-dashed border border-[#2A2A2A] text-[18px]'>
                  <p>Aadhar card</p>
                  <button className='px-2 py-1 rounded-lg font-medium border-2 border-[#7D23E0] text-[#7D23E0]'>
                    Download
                  </button>
                </div>
                <div className='text-[#414141] flex justify-between items-center px-4 py-2 mt-3 rounded-lg border-dashed border border-[#2A2A2A] text-[18px]'>
                  <p>Address Proof</p>
                  <button className='px-2 py-1 rounded-lg font-medium border-2 border-[#7D23E0] text-[#7D23E0]'>
                    Download
                  </button>
                </div>
                <div className='text-[#414141] flex justify-between items-center px-4 py-2 mt-3 rounded-lg border-dashed border border-[#2A2A2A] text-[18px]'>
                  <p>Registration document</p>
                  <button className='px-2 py-1 rounded-lg font-medium border-2 border-[#7D23E0] text-[#7D23E0]'>
                    Download
                  </button>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-around p-6 border-solid border-slate-200 rounded-b'>
              <button
                onClick={() => {
                  handleAccept(3)
                  setShowModal(false)
                }}
                className='border bg-[#7D23E0] md:px-12 py-2 px-4 md:py-3 font-bold rounded-lg text-white'
              >
                Accept
              </button>
              <button
                onClick={() => {
                  handleAccept(2)
                  setShowModal(false)
                }}
                className='border bg-[#E46060] md:px-12 py-2 px-4 md:py-3 font-bold rounded-lg text-white'
              >
                Decline
              </button>
              <Link prefetch={false}
                to={`/editInstitute/${id}/request`}
                className="border bg-[#F0F0F0]  md:px-16 py-2 px-4 md:py-3 font-bold rounded-lg text-[#525252]"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed !mt-0 inset-0 z-40 bg-black'></div>
    </>
  )
}

export default InstituteDetailsModal
