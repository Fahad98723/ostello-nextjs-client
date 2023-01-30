import React from 'react'
import Carousel from 'react-elastic-carousel'
import SliderCard from './sliderCard'
import Data from './data'

const CategoriesSlider = () => {
  return (
    <section className='slider overflow-x-hidden'>
      <h2 className='font-dm-sans font-medium ml-5 mb-6 text-2xl text-center text-light-black'>
        Categories
      </h2>

      <div className='mb-10'>
        {Data.map((d, index) => (
          <div className='' key={index}>
            <Carousel pagination={false} showArrows={false} itemsToShow={2}>
              {d.firstrow.map((dd, idx) => (
                <div className='my-5' key={idx}>
                  <SliderCard currentValue={dd} />
                </div>
              ))}
            </Carousel>

            <Carousel pagination={false} showArrows={false} itemsToShow={2}>
              {d.secondrow.map((dd, idx) => (
                <div className='my-5' key={idx}>
                  <SliderCard currentValue={dd} />
                </div>
              ))}
            </Carousel>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategoriesSlider
