import styled from 'styled-components';


export const Container = styled.footer`
    display:none;
    width:100%;
    background-color:rgba(28, 28, 28, 1);
    padding:10px 0;

    h4 {
        color:#fff;
    }

    h4 {
        font-weight:600;
        font-size:20px;
    }

    @media screen and (max-width:768px) {
        display:block
    }
`
export const FooterDivider = styled.div`
    border: 0.3px solid rgba(155, 155, 155, 0.3)
`