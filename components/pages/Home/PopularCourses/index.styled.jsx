import styled from 'styled-components';


export const Container = styled.div`
    width:80%;
    margin:0 auto;

    &.custom .rec-pagination {
        margin-top:40px
    }
    
    &.custom .rec.rec-dot_active {
        width: 130px ;
        height:1px;
        border-radius: 5px;
        background-color: rgba(125, 35, 224, 1);
        border:none;
        box-shadow:0 0 1px 3px rgb(125 35 224 / 100%);
    }
    
    &.custom .rec-dot {
        height: 2px;
        width:30px;
        background-color: rgba(125, 35, 224, 0.3);
        border-radius: 5px;
        box-shadow:0 0 1px 3px rgb(125 35 224 / 30%);

    }

    .single-card {
        margin:0 25px 30px;
        width:400px;
        img {
            width:100%
        }
    }

    @media screen and (max-width:768px) {
        width:95%;

        &.custom .rec-pagination {
            display: none;
        }
    }

    @media screen and (max-width:500px) {
        &.custom .rec .rec-item-wrapper {
            width:260px !important;
        }
        .single-card {
            margin:0 10px 20px;
        }
    }
`