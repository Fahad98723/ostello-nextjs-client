import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../../components/layout/Footer'
import LoadingSpinner from '../../../components/layout/LoadingSpinner'
import MetaHelmet from '../../../components/MetaHelmet'
import BlogPage from '../../../components/pages/Blogs/Blog/BlogPage'
import BlogPostCard from '../../../components/pages/Blogs/BlogPostCard'
import {
  fetchAdminBlogs,
  getCurrentBlogSuccess,
  selectBlogs
} from '../../../redux/slices/adminBlogSlice'
import { setUserLocation } from '../../../redux/slices/UserAnalytics'
import AuthorPhoto from '../../../utils/assets/images/logo.png'
import { host } from '../../../utils/constant'
import {Adsense} from '@ctrl/react-adsense';
import BlogCard from '../../../components/pages/Blogs/Blog/BlogCard'
// const Comments = () => {
//   const [commentValue, setCommentValue] = useState('')
//   const [like, setLike] = useState('Upvote')
//   const [isDelete, setIsDelete] = useState(false)
//   const [comment, setComment] = useState(false)

//   return (
//     <>
//       <div className='bg-white border rounded-2xl border-[#CBCBCB]  p-4 w-max lg:w-8/12  m-auto lg:p-10 my-14 lg:my-32'>
//         <div className='flex items-center space-x-5  '>
//           <img
//             src={AuthorPhoto.src}
//             alt=''
//             className='w-10 h-10 lg:w-14 lg:h-14 rounded-full'
//           />
//           <div className='border-2 border-[#A4A4A4] lg:w-full rounded-lg'>
//             <input
//               type='text'
//               className='w-full focus:outline-none text-sm lg:text-lg py-1 lg:py-2 px-5'
//               placeholder='Write your comment here'
//               onChange={(e) => {
//                 setCommentValue(e.target.value)
//               }}
//             />
//           </div>
//         </div>
//         <div className='w-full flex justify-end mr-5 py-2'>
//           <button className='bg-[#F2F2F2] p-2 lg:p-3 rounded-lg text-sm lg:text-lg  '>
//             Post a comment
//           </button>
//         </div>

//         <div className='lg:w-full flex '>
//           <div className='flex lg:w-full  space-x-5 mb-10 lg:mb-0 relative  '>
//             <img
//               src={AuthorPhoto.src}
//               alt=''
//               className='w-10 h-10 lg:w-14 lg:h-14 rounded-full '
//             />
//             <div className='flex flex-col '>
//               <div className='flex space-x-5'>
//                 <p className='text-sm lg:text-lg'>Preetham Nayak</p>
//                 <p className='text-xs lg:text-base'>6min ago</p>
//               </div>
//               {/* <p className="lg:text-lg font-medium">{commentValue}</p> */}
//               <p className='text-sm lg:text-xl font-medium'>Very Good BLog </p>

//               <div className='absolute lg:relative left-0 top-10 lg:top-0 flex  space-x-5 lg:space-x-14  mt-5 cursor-pointer'>
//                 <div className={`  flex items-center space-x-2 lg:text-lg `}>
//                   <FiThumbsUp
//                     className={`${
//                       like !== 'Upvote' ? 'text-primary' : 'text-[#989898]'
//                     } `}
//                   />
//                   <p
//                     className={`${
//                       like !== 'Upvote' ? 'text-primary' : 'text-[#AAAAAA]'
//                     }  text-sm lg:text-lg`}
//                     onClick={() => {
//                       setLike(1)
//                     }}
//                   >
//                     {like}
//                   </p>
//                 </div>
//                 <div className='flex  items-center space-x-2'>
//                   <BiComment
//                     className='text-[#989898]'
//                     onClick={() => {
//                       setComment(!comment)
//                     }}
//                   />
//                   {comment && (
//                     <div className='w-full'>
//                       <div className='border border-[#A4A4A4] py-1 px-3 rounded-lg w-full'>
//                         <input
//                           type='text'
//                           className='w-full focus:outline-none'
//                           placeholder='Reply here'
//                         />
//                       </div>
//                     </div>
//                   )}
//                   <p
//                     className={`text-[#AAAAAA] text-sm lg:text-lg ${
//                       comment ? 'hidden' : ''
//                     }`}
//                     onClick={() => {
//                       setComment(!comment)
//                     }}
//                   >
//                     Comment
//                   </p>
//                 </div>
//                 <div
//                   className={` ${
//                     comment ? 'hidden' : ''
//                   } flex items-center space-x-2`}
//                 >
//                   <AiOutlineEye className='text-[#989898] text-lg' />
//                   <p className='text-[#AAAAAA] text-sm lg:text-lg w-max'>
//                     View Replies
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {isDelete && (
//             <div className='lg:float-left  absolute lg:relative right-0 lg:mt-2'>
//               <div
//                 className='bg-white px-5 py-5 rounded-xl cursor-pointer '
//                 style={{ boxShadow: '0px 6px 23px rgba(125, 35, 224, 0.12)' }}
//               >
//                 <div
//                   className='flex items-center space-x-2 py-3 '
//                   onClick={() => {
//                     setIsDelete(!isDelete)
//                   }}
//                 >
//                   <AiOutlineEdit />
//                   <button className=''>Edit</button>
//                 </div>
//                 <div
//                   className='flex items-center space-x-2'
//                   onClick={() => {
//                     setIsDelete(!isDelete)
//                   }}
//                 >
//                   <AiOutlineDelete />
//                   <button className=''>Delete</button>
//                 </div>
//               </div>
//             </div>
//           )}
//           <BiDotsVerticalRounded
//             className='flex justify-end ml-auto '
//             onClick={() => {
//               setIsDelete(!isDelete)
//             }}
//           />
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

export default function BlogDetails() {
  const { adminBlogs , currentBlog} = useSelector(selectBlogs)
  const dispatch = useDispatch()
  const [relatedBlog, setRelatedBlog] = useState([])

  const router = useRouter()

  useEffect(()=> {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function(position) {
      dispatch(setUserLocation({latitude:position.coords.latitude,longitude: position.coords.longitude}))
    });
  })
  useEffect(() => {
    if (adminBlogs.length < 1) {
      dispatch(fetchAdminBlogs())
    }
    if (currentBlog) {
      const related = adminBlogs.filter(
        (f) => f?.category === currentBlog?.category
      )
      setRelatedBlog(related?.filter((r) => r.id !== currentBlog.id))
    }
  }, [currentBlog, adminBlogs])



  
  console.log(router.query);
  useEffect(() => {
    if(router.query.blogId){
      dispatch(getCurrentBlogSuccess(adminBlogs.find(a => a?.slugurl?.toLowerCase()?.replaceAll('?','') === router?.query?.blogId?.toLowerCase())));
    }
  },[router.query.blogId, adminBlogs, dispatch])

  console.log(currentBlog);

  if (router.isFallback) {
    return <LoadingSpinner />
  }

  return (
    <div className='md:max-w-[1350px] mx-auto'>
      <MetaHelmet
        title={currentBlog?.metatitle}
        description={currentBlog?.metadesc}
        link={currentBlog?.slugurl}
      />
      
      <BlogPage
        id={currentBlog?.id}
        category={currentBlog?.category}
        title={currentBlog?.title}
        image={currentBlog?.image}
        alt='Blog Pic'
        description={currentBlog?.description}
        metaDesc={currentBlog?.metadesc}
        slugUrl={currentBlog?.slugurl}
        authorSrc={AuthorPhoto}
        authorAlt='author Pic'
        authorName='Ostello Admin '
        postDate={currentBlog?.timestamp?.split('T')[0]}
        read={currentBlog?.readtime}
        views={currentBlog?.views || '0'}
      />

      {/* <Comments /> */}

      {relatedBlog.length > 0 && (
        <>
          <hr className='mx-20 text-light-slate mt-10 lg:mt-0 ' />
          <div className='py-10'>
            <h1 className='text-primary text-xl lg:text-4xl font-bold px-8 lg:px-28'>
              Related blogs{' '}
              <span className='text-slate'> for you to read </span>
            </h1>
          </div>
          <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-20   lg:px-20 mb-20   '>
            {relatedBlog?.map((item, idx) => (
              // <BlogPostCard
              //   id={item.id}
              //   src={item.image}
              //   alt={item.alt}
              //   blogLink={`/blogs/${item?.title?.replace(/ /g, '-')}`}
              //   postDate={item.timestamp}
              //   read={item.readtime}
              //   title={item.title}
              //   authorSrc={item.authorSrc}
              //   authorAlt={item.authorAlt}
              //   authorName={item.authorName}
              //   key={idx}
              // />
              <BlogCard key={idx} {...item} />
            ))}
          </div>
          <Adsense
            client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
            slot="6397614396"
            style={{ display: "block", textAlign: "center", marginTop:"10px"  }}
            layout="in-article"
            format="fluid"
          />
        </>
      )}

      <Footer />
    </div>
  )
}



export async function getServerSideProps({ params }) {
  const blog = params.blogId.replace(/-/g, ' ')
  const res = await axios.get(`${host}/blog?title=${blog}`)
  const currentBlog = res.data.message
  if (!blog) {
    return {
      notFound: true,
    }
  }
  // Pass post data to the page via props
  return { props: { currentBlog } }
}
