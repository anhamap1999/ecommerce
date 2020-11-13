import styled from 'styled-components';

export const ProductContainer = styled.div`
    
  
`;
export const ProductWrapper = styled.div`
   background-color:#f2f2f2;
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
`;
export const ProductImg = styled.div`
    & img{
        width: 290px;
        height: 190px;
        transform: rotate(25deg);
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