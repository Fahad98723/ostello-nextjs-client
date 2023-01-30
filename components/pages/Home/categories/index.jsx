import React from 'react'
import CategoriesSlider from './sliderCategories/CategoriesSlider'
import NormalCategory from './normalCategories/normalCategory'

const Categories = () => {
  return (
    <>
      <div className='sm:hidden'>
        <CategoriesSlider />
      </div>
      <div className='hidden sm:block'>
        <NormalCategory />
      </div>
    </>
  )
}

export default Categories
