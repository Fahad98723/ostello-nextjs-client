import React from 'react'
import { NormalCategory } from '../index.styled'
import CategoryCard from './card'
import Data from './data'

const NormalCategories = () => {
  return (
    <div className='overflow-x-hidden'>
      <h2 className='font-medium font-dm-sans text-center text-lg md:text-5xl mb-4'>
        Categories
      </h2>

      <div className='flex flex-wrap container mx-auto my-5  justify-center '>
        {Data.map((d) => (
          <CategoryCard currentValue={d} key={d.id} />
        ))}
      </div>
    </div>
  )
}

export default NormalCategories
