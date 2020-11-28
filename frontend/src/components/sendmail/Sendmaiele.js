import styled from 'styled-components';

export const SendMailContainer = styled.div`
    margin-top:50px;
    width:100%;
    height:250px;
    background:#141414;
    border-radius:5px;
    position: relative;
    animation: lo 3s ;
    @keyframes lo {
        0%   {top: 0px; opacity: 0;}
        50%  {top: 100px;  opacity: 0.5;}
        100% {top: 0px;  opacity: 1;}   
    }  
  
`;
export const SendMailText = styled.div`
   display:flex;
   flex-direction:column;
   align-items:center;
   text-align:center;
   width:100%;
    height:200%;
    
    justify-content:center;
    & h3{
        font-size:32px;
        font-weight:700;
        color:#fff;
    }
    & p{font-size:16px;
        font-weight:400;
        color:#fff;
    }
`;
export const SendMailInput = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    padding-top:100px;
    position: relative;
    & input{
        width:300px;
        height:60px;
        border-radius:5px;
        outline:none;
        border:none;
    }
    & button{
        height:40px;
        width:100px;
        border-radius:10px;
        position: absolute;
        top: 68%;
        left: 34%;
        border:none;
        background:#141414;
        color:#fff;
        font-size:12px;
        outline:none;
    }
`;