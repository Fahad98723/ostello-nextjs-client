import React, { useRef } from 'react'
import Carousel from 'react-elastic-carousel'
import Data from './data'
import { Container } from './index.styled'
import BannerCard from './card'

const CourseBanner = () => {
  const ref = useRef({})
  return (
    <Container className='custom-carousel overflow-x-hidden'>
      <Carousel
        ref={ref}
        enableAutoPlay
        autoPlaySpeed={1500}
        itemsToShow={1}
        onChange={(e, index) => {
          if (ref?.current?.props.children.length === index + 1) {
            ref.current.goTo(0)
          }
        }}
        showArrows={false}
        renderPagination={({ pages, activePage, onClick }) => {
          return (
            <div className='flex items-center space-x-2 '>
              {pages?.map((page) => {
                const isActivePage = activePage === page
                return (
                  <div
                    className={`cursor-pointer  h-2 rounded-lg my-5 transition-all duration-500 ease-in-out ${
                      isActivePage ? 'bg-primary w-28 ' : 'bg-primary/20 w-6'
                    }`}
                    key={page.id}
                    onClick={() => onClick(page)}
                    // active={isActivePage}
                  />
                )
              })}
            </div>
          )
        }}
      >
        {Data.map((d) => (
          <BannerCard currentValue={d} key={d.id} />
          // <p key={d.id}>albi</p>
        ))}
      </Carousel>
    </Container>
  )
}

export default CourseBanner
