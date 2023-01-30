import { useRouter } from 'next/router';
import React from 'react'
import { AiFillSetting, AiOutlineDatabase } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdDashboard, MdOutlineInsertChart } from 'react-icons/md';
import { RiFileMarkLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg'
import  Link  from 'next/link';
import logo from '../../../../assets/merchantDashboard/Accountancy/logo.png';
import { FaUsers } from 'react-icons/fa';
export default function DashboardSidebar() {
  const router = useRouter()
  function logout() {
    router.push('/merchant/login');
    localStorage.clear();
    typeof window !== 'undefined' && window.location.reload();
}
  return (
    <>
    <div className=" hidden  lg:block">
                        <div>
                            <div onClick={() =>{router.push('/')}} className="logo flex items-center ml-4 mt-5 mb-12">
                                <img src={logo.src} alt="" />
                            </div>

                            <div className="menu dashboard justify-start">
                                <Link prefetch={false}
                                    href="/merchant/dashboard/"
                                    activeClassName="active"
                                >
                                  <a href="" className={`${router.asPath === '/merchant/dashboard' ? 'active' : ''} menu-item flex items-center gap-3`}>
                                  {' '}
                                    <MdDashboard></MdDashboard> Dashboard{' '}
                                  </a>
                                </Link>
                                <Link prefetch={false}
                                    href="/merchant/dashboard/courses"
                                    activeClassName="active"
                                    
                                >
                                   <a href="" className={`${router.asPath === '/merchant/dashboard/courses' ? 'active' : ''} menu-item flex items-center gap-3`}>
                                   {' '}
                                    <RiFileMarkLine></RiFileMarkLine> Courses{' '}
                                   </a>
                                </Link>
                                <Link prefetch={false}
                                    href="/merchant/dashboard/accountancy"
                                    activeClassName="active"
                                >
                                    <a href="" className={`${router.asPath === '/merchant/dashboard/accountancy' ? 'active' : ''} menu-item flex items-center gap-3`}>
                                    <MdOutlineInsertChart></MdOutlineInsertChart>{' '}
                                    Accountancy{' '}
                                    </a>
                                </Link>
                                <Link prefetch={false}
                                    href="/merchant/dashboard/profile"
                                    activeClassName="active"
                                   
                                >
                                    <a href=""  className={`${router.asPath === '/merchant/dashboard/profile' ? 'active' : ''} menu-item flex items-center gap-3`}>
                                    <CgProfile/> My Profile{' '}
                                    </a>

                                </Link>
                                <Link prefetch={false}
                                    href="/merchant/dashboard/students"
                                    activeClassName="active"
                                   
                                >
                                    
                                    <a href=""  className={`${router.asPath === '/merchant/dashboard/students' ? 'active' : ''} menu-item flex items-center gap-3`}>
                                    <FaUsers/> Our Students{' '}
                                    </a>

                                </Link>

                                <Link prefetch={false}
                                    href="/merchant/dashboard/leadenquiries"
                                    activeClassName="active"
                                   
                                >
                                    
                                    <a href=""  className={`${router.asPath === '/merchant/dashboard/leadenquiries' ? 'active' : ''} menu-item flex items-center gap-3`}>
                                    <AiOutlineDatabase/> Leads & Enquiries{' '}
                                    </a>

                                </Link>

                             
                                <Link prefetch={false}
                                    href="/merchant/dashboard/notifications"
                                    activeClassName="active"
                                    
                                >
                                    <a href="" className={`${router.asPath === '/merchant/dashboard/notifications' ? 'active' : ''} menu-item flex items-center gap-3`}>
                                    <IoIosNotificationsOutline></IoIosNotificationsOutline>
                                    Notification{' '}
                                    <span className="bg-[#E8ACC1] text-[#DC6563] p-1 rounded-full text-xs">
                                        0
                                    </span>
                                    </a>
                                </Link>
                                <Link prefetch={false}
                                    href="/merchant/dashboard/settings"
                                    activeClassName="active"
                                    
                                >
                                    <a href="" className={`${router.asPath === '/merchant/dashboard/settings' ? 'active' : ''} menu-item flex items-center gap-3`}>
                                    <AiFillSetting></AiFillSetting> Settings{' '}
                                    </a>
                                </Link>
                                <h3
                                    onClick={() => {
                                        logout();
                                    }}
                                    className="menu-item flex items-center gap-3"
                                >
                                    {' '}
                                    <FiLogOut></FiLogOut> Log Out{' '}
                                </h3>
                            </div>
                        </div>
                    </div>
    </>
  )
}
