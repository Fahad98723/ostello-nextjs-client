import styled from 'styled-components'
import BgDesktop from '../../../../assets/courses_institutions/course-banner/xyz.png'
import BgMobile from '../../../../assets/courses_institutions/course-banner/course_banner_mobile.svg'

export const Container = styled.div`
  width: 97%;
  margin: 0 auto;

  .course-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    width: 100%;
    margin: 20px;
    height: 45vh;
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    border-radius: 16px;
    width: 100%;
  }

  &.custom-carousel .rec-pagination {
    margin-top: 40px;
  }

  &.custom-carousel .rec.rec-dot_active {
    width: 130px;
    height: 2px;
    border-radius: 5px;
    background-color: rgba(125, 35, 224, 1);
    border: none;
    outline: none !important;
    box-shadow: 0 0 1px 3px rgb(125 35 224 / 100%);
  }

  &.custom-carousel .rec-dot {
    height: 2px;
    width: 30px;
    background-color: rgba(125, 35, 224, 0.3);
    border-radius: 5px;
    outline: none !important;
    box-shadow: 0 0 1px 3px rgb(125 35 224 / 30%);
  }

  @media screen and (max-width: 768px) {
    width: 100%;

    .course-bg {
      width: 100%;
      margin: 0;
      border-radius: 0;
    }

    &.custom-carousel .rec-pagination {
      display: block;
    }

    &.custom-carousel .rec.rec-dot_active {
      width: 50px;
      height: 4px !important;
    }
    &.custom-carousel .rec-dot {
      width: 15px;
      height: 4px;
    }
  }

  @media screen and (max-width: 500px) {
    .rec .rec-carousel {
      width: 110% !important;
    }
    .course-bg {
      height: 46vh;
    }
  }
`
