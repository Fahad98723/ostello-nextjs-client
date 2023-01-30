import React from 'react'
import calculation from '../../../assets/images/icons/calculation.svg'
import siteMap from '../../../assets/images/icons/sitemap.svg'
import searchFile from '../../../assets/images/icons/search file.svg'
import barGraph from '../../../assets/images/icons/bar graph.svg'
import Container from '../../layout/Container'

export default function Objectives({ objectives }) {
  const Objectives = [
    {
      title: objectives?.[0],
      icons: calculation.src,
    },
    {
      title: objectives?.[1],
      icons: siteMap.src,
    },
    {
      title: objectives?.[2],
      icons: searchFile.src,
    },
    {
      title: objectives?.[3],
      icons: barGraph.src,
    },
  ].filter((item) => item.title !== undefined)

  return (
    <div name='Objectives' className='py-20 '>
      <>
        <div className='  learning_objectives md:h-[300px]  h-[200px]  '>
          <h1 className='lg:text-5xl text-3xl pt-10 text-center lg:pt-20  font-medium text-white mx-5 lg:px-20'>
            Learning Objectives
          </h1>
        </div>
        <Container>
          <div className=' grid grid-cols-2 md:grid-cols-4    md:justify-center  mx-5  -mt-20 xl:gap-20 gap-10  sm:gap-10   '>
            {Objectives.map((item, i) => (
              <div
                key={i}
                className='bg-white py-4  p-2 w-full  md:p-5 rounded-xl  shadow-ostf shadow-[#7ab1dc]/20  flex flex-col items-center  lg:text-2xl  space-y-3  shadow-3xl '
              >
                <img className=' w-10 xl:w-20 ' src={item.icons} alt='' />
                <p className='text-center text-xs lg:text-lg  '>{item.title}</p>
              </div>
            ))}
          </div>
        </Container>
      </>
    </div>
  )
}
