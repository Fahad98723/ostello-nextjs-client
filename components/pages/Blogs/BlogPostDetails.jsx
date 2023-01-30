import React, { useState, useEffect } from "react";
import NavHeader from "../../NavHeader";
import BackgroundGradient from "../../../assets/background/landing_gradient.png";
import BlogAuthor from "./BlogAuthor";
import ShareCard from "../../UI/ShareCard";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import MetaHelmet from "../../MetaHelmet";
import useScreenWidth from "../../hooks/useScreenWidth";


const BlogsPostDetails = ({
  category,
  title,
  src,
  alt,
  description,
  authorSrc,
  authorAlt,
  authorName,
  postDate,
  read,
  metaDesc,
  slugUrl,
}) => {
  const { screenWidth } = useScreenWidth()
  const [share, setShare] = useState(false);

console.log(title)
  return (
    <>
      <MetaHelmet title={title} description={metaDesc} link={slugUrl} />
      <div
        className='font-dm-sans w-screen min-h-screen'
        style={
          screenWidth > 768
            ? {
                backgroundImage: `url(${BackgroundGradient.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100vw 80vh',
                backgroundPosition: '50% 0%',
              }
            : {}
        }
      >
        <NavHeader />
        <main>
          <section
            className='px-8 lg:px-28   flex flex-col-reverse lg:flex-row items-center justify-center lg:py-20'
            // style={{ height: `calc(100vh - 120px)` }}
          >
            <div className='flex flex-col items-start space-y-3 w-10/12 lg:space-y-6 relative left-0 '>
              <p className='text-md lg:text-xl font-bold'>
                {category?.charAt(0).toUpperCase() +
                  category?.slice(1).toLowerCase()}
              </p>
              <h1 className='text-slate font-bold text-3xl xl:text-6xl'>
                {title}
              </h1>
              <img className='mx-auto h-[600px] w-full' src={src} alt={alt} />
              <div className='md:flex md:px-20'>
                <BlogAuthor
                  authorSrc={authorSrc}
                  authorAlt={authorAlt}
                  authorName={authorName}
                  postDate={postDate}
                  read={read}
                />
                <div className="flex  md:absolute right-0 lg:right-20  text-primary ">
                  <AiOutlineEye className="m-auto " />{" "}
                  <span className="px-1 m-auto">456 views</span>
                  <div className="px-10 py-5">
                    <button
                      className="w-28 h-10 bg-primary text-white rounded-full flex align-center px-3 "
                      onClick={() => {
                        setShare(!share)
                      }}
                    >
                      <AiOutlineShareAlt className='text-xl m-auto  ' />
                      <p className='m-auto text-xl'>Share</p>
                    </button>
                    {share && (
                      <div className='relative '>
                        {' '}
                        <ShareCard />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default BlogsPostDetails
