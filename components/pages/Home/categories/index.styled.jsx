import styled from 'styled-components'

export const SliderCategorty = styled.div`
  display: none;

  .slider-card {
    margin: 16px 8px;
  }

  @media screen and (max-width: 768px) {
    display: block;
    width: 100%;
    margin: 5px 5px 15px;
  }

  @media screen and (max-width: 500px) {
    &.slider .rec .rec-item-wrapper {
      width: 180px !important;
    }
  }
`

export const NormalCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .normal-card {
    width: 15%;
    margin: 2%;

    img {
      width: 100%;
    }
  }

  @media screen and (max-width: 992px) {
    .normal-card {
      width: 22%;
      margin: 2%;
    }
  }
`
