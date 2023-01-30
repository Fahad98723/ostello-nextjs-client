import React, { useEffect, useState } from 'react'
import { BsFillCircleFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAdminInstitutes } from '../../../../redux/slices/adminInstitutesSlice'
import Loader from '../../../Loader'
import { HybridIcon } from '../../../SVGIcons'
import Link from 'next/link'
import { isJsonParsable } from '../../../../utils/utils'
import toast from 'react-hot-toast'
import axios from 'axios'
import { host } from '../../../../utils/constant'

const MentorRequests = () => {
  const dispatch = useDispatch()
  

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const run = async() => {
      setLoading(true)
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        const { data } = await axios.get(`${host}/mentor?approval=4&limit=50`, config )
        setData(data?.mentors)
        console.log(data);
      } catch (err) {
        toast.error(err.message)
      }
      finally{
        setLoading(false)
      }
    }
    run()
  },[])

  console.log(data)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='grid pb-[40px] md:grid-cols-2 gap-8 lg:gap-x-8'>
          {data?.length ===
          0 ? (
            <div className='py-8 font-medium bg-white flex justify-center'>
              No institute requests are available now
            </div>
          ) : (
            <div>
              {data
                ?.map((d, index) => (
                  <div key={index}>
                    <div className='bg-white px-[18px] border border-light-gray rounded-lg py-3.5'>
                      <div className='flex justify-between items-start'>
                        <div>
                          <h3 className='text-[21px] text-[#414141] font-bold '>
                          {d?.name}
                          </h3>
                            <p className='mr-1'>{d?.phonenumber} </p>
                            <p className='mr-1'>{d?.qualification} </p>
                          <div className='text-[#767676] flex'>
                            <p className='mr-1'>{d?.field} </p>
                          </div>
                        </div>
                        <Link prefetch={false}
                          href={`/admin-dashboard/mentors-zone/mentor-details/${d.id}`}
                        >
                          <a
                            href=''
                            className='font-medium text-[#ffffff] text-[20px] px-4 rounded-md py-1 bg-[#7D23E0]'
                          >
                            Check
                          </a>
                        </Link>
                      </div>
                      <div className='text-[18px] text-[#747474]'>
                            <p className='mt-5'>
                              {d?.description}
                            </p>

                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default MentorRequests
