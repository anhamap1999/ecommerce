import styled from 'styled-components';
import Img from './nike.png';
export const ProductContainer = styled.div`
    
  
`;
export const ProductWrapper = styled.div`
    background: rgb(242,242,242);
    background: linear-gradient(90deg, rgba(242,242,242,1) 0%, rgba(223,216,216,0.4682247899159664) 100%);  
    width: 300px;
    margin: 0 30px;
    height: 370px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-radius:5px;
    justify-content:center;
    text-align:center;
    transition:.3s;
    &:hover{
        transition:.3s;
        transform:scale(1.1);
    }
`;
export const ProductImg = styled.div`
        width: 210px;
        height: 190px;
    & img{
        width: 100%;
        height: 100%;
        
    }
  
`;
export const ProductText= styled.div`
    
  
`;
export const ProductTitle = styled.h3`
    font-weight:600;
  
`;
export const ProductPrice = styled.p`
    
    font-size: 20px;
    font-weight: 600;
`;
export const Productbutton = styled.button`
    border:none;
    background:none;
    font-weight: 500;
  
`;
export const ProductSale = styled.div`
    width: 62px;
    height: 30px;
    background: black;
    transform: rotate(-90deg);
    color: #fff;
    border-radius: 4px;
    padding-top: 2px;
    font-size: 18px;
    position: absolute;
    top: 36px;
    left: 0;
`;
export const ProductSaleOff = styled.div`
    width:100%;
    height:60vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background: rgb(138,138,138);
background: linear-gradient(0deg, rgba(138,138,138,1) 0%, rgba(138,138,138,0.5550595238095238) 60%);
    margin-top:50px;
    border-radius:5px;
    position: relative;
    margin-bottom:30px;
    &::before{
        content:'';
        background:url(${Img});
        background-repeat:no-repeat;
        background-size:560px 400px;
        width:100%;
        height:100%;
        z-index:1;
        position: absolute;
    }
`;
export const ProductSaleH2 = styled.h2`
    font-size:32px;
    font-weight:bold;
    
`;
export const ProductSaledes = styled.p`
    font-size:16px;
    font-weight:500;
    
`;
export const ProductSaleButton = styled.button`
    transition: all 0.5s;
    position: relative;
    color: rgba(255,255,255,1);
    line-height: 50px;
    height: 50px;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
    width: 17%;
    background:none;
    border:none;
    cursor: pointer;
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                opacity: 0;
                transition: all 0.3s;
                border: 2px solid #14141450;
                -webkit-transform: scale(1.2,1.2);
                transform: scale(1.2,1.2);
            }
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                background-color: #14141425;
                transition: all 0.3s;
                border:1px solid black;
            }
            &:hover::before {
                opacity: 0;
               
                transform: scale(0.5,0.5);
            }
            &:hover::after {
                opacity: 1;
                transform: scale(1,1);
            }       
`;
export const ProductSaleSpan = styled.span`
   
    font-size:18px;
    font-weight:500;
    color:#141414 ;
     
    
`;