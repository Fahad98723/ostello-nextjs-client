import React from 'react'

const JobCard = ({ category, jobtype }) => {
  return (
    <>
      {/* <div className="relative  sm:w-9/12 h-52 z-1 border border-light-slate drop-shadow-2xl mb-20 sm:mb-32 sm:ml-10   rounded-3xl -rotate-6"> */}
      <a
        href='https://docs.google.com/forms/d/19hTepuqZqoNBO470OgMJvll6TLjEY2p81n6VSRqitRA/edit'
        target='_blank'
        rel='noreferrer'
      >
        <div
          className='font-dm-sans bg-white  drop-shadow-xl  rounded-3xl block m-auto w-3/3  xl:w-12/12 xl:h-56 sm:mx-2  p-6 xl:py-10 space-y-4 z-2 mb-10     '
          onClick={() => {}}
        >
          <h2 className='text-2xl '>{jobtype}</h2>
          <hr className='text-light-slate ' />
          <p className='text-sm lg:text-md text-medium-slate'>{category}</p>
          <button className='text-primary font-bold lg:text-xl '>
            See Jobs
          </button>
        </div>
      </a>
      {/* </div> */}
    </>
  )
}

export default JobCard
