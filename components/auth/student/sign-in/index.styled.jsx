import styled from 'styled-components';


export const Container = styled.div`
    background-color:transparent;
    height:85vh;
    margin-bottom:20px;
    
    img {
        width:40vw;
    }
    .shadow-reverse {
        box-shadow:none;
    }


    .shadow {
        box-shadow: 0px 4px 50px 3px rgba(156, 77, 244, 0.1);
    }
    
    .OTP-input input {
        border: 2px solid rgba(255, 0, 0, 1);
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
        border-radius: 8px;
        margin:0 10px 0 !important;
        width:50px !important;
        height:50px !important;
    }
    .OTP-input-2 input {
        border:2px solid rgba(141, 141, 141, 1);
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
        border-radius: 8px;
        margin:0 10px 0 !important;
        width:50px !important;
        height:50px !important;
    }

    @media screen and (max-width:600px) {
        .shadow {
            box-shadow:none;
        }
        .shadow-reverse {
            0px 4px 20px -10px rgba(0, 0, 0, 0.2);
        }
    }
`

