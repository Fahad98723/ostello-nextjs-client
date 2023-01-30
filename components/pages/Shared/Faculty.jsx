import React from 'react'
import Container from '../../layout/Container'
import mahima from '../../../assets/images/mahima.jpg'
import vishal from '../../../assets/images/nitiya.jpg'
import nitiya from '../../../assets/images/vishal.jpg'
import Carousel from 'react-elastic-carousel'
import { isEmpty } from '../../../utils/utils'

export default function Faculty({ faculties }) {
  const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 1200, itemsToShow: 3 },
  ];
  if (!isEmpty(faculties)) <></>;
  return (
      <section name="Faculty">
          <Container className={''}>
              <h1 className="text-4xl font-bold text-center">Faculty</h1>
              <div className="md:max-w-[1400px] mx-auto py-10">
                    <Carousel
                        renderPagination={({ pages, activePage, onClick }) => {
                            return (
                                <div className="flex items-center space-x-2 mt-2">
                                    {pages?.map((page, i) => {
                                        return (
                                            <div
                                                className={`cursor-pointer  h-2 rounded-lg transition-all duration-500 ease-in-out  ${
                                                    activePage === page
                                                        ? 'bg-primary w-28 '
                                                        : 'bg-gray/20 w-6'
                                                }`}
                                                key={i}
                                                onClick={() => onClick(page)}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        }}
                        breakPoints={breakPoints}
                        showArrows={true}
                        enableAutoPlay
                        autoPlaySpeed={1500}
                        pagination={false}
                    >
                        {faculties?.map((item, i) => (
                            <div className=" mx-2 ">
                                <div
                                    key={item.id}
                                    className=" p-5 md:py-8 w-[380px]  lg:w-[350px] lg:h-[420px] lg:mx-5 my-5  md:shadow-[#7ab1dc]/20 md:shadow-3xl shrink-0 rounded-2xl lg:min-h-[400px] "
                                >
                                    <div className="mb-2 md:mb-5 text-center ">
                                        <img
                                            className="  mx-auto 
                                            max-w-[300px] max-h-[200px] rounded-xl mb-2"
                                            src={item.avatar.url}
                                            alt=""
                                        />
                                        <p className="font-bold text-xl">
                                            {item.name}
                                        </p>
                                        <p className="text-md text-[#A4A4A4]">
                                            {item.qualification}
                                        </p>
                                    </div>
                                    <p className="text-lg text-center md:w-full  w-3/4 mx-auto">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
          </Container>
      </section>
  );
}
