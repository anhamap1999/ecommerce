import styled from 'styled-components';

export const ProductNew = styled.div`
    width:100%;
    height:auto;
    margin-top:50px;
`;
export const ProductsNewEle = styled.div`
    width: 100%;
    height: 460px;
    background: rgba(138,138,138,.5);
    border-radius: 5px;
    padding: 25px;
`;

export const ProductNewEleImg = styled.div`
    width:100%;
    height:50%;
    &img{
        width:100%;
        height:100%;
    }
  
`;
export const ProductNewText = styled.div`
    
  
`;
export const ProductNewTitle = styled.h3`
    font-size:26px;
    font-weight:700;
  
`;
export const ProductNewPrice = styled.p`
      font-size:16px;
    font-weight:500;
  
`;
export const ProductNewButton = styled.button`
    font-size:18px;
    font-weight:700;
    border:none;
    background:none;
  
`;

export const ProductNewContainer = styled.div`
    width:100%;
    height:460px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-flow: wrap;
`;
export const ProductBox = styled.div`
     width: 45%;
     height: 220px;
     background: rgba(138,138,138,.5);
    border-radius: 5px;
    padding: 25px;
    margin-bottom:20px;
    margin-left:20px;
    position: relative;
    transition:.3s;
    overflow:hidden;
   
    &:hover{
        background: rgba(138,138,138);
        transition:.3s;
    }
`;

export const ProductBoxText =styled.div`
    position: absolute;
    padding:20px;
    bottom:-100%;
    width:100%;
    height:100%;
    transition:0.2s ease-in-out;
     ${ProductBox}:hover &{
       bottom:0;
        transition:0.2s ease-in-out;
    }
    & h3{
        font-size:20px;
        font-weight:800;
    }
    & p{
        font-size:16px;
        font-weight:500;
    }
    & button{
       width:140px;
       height:40px;
       border:none;
       &:hover{
           border:3px solid white;
           background:none;
           color:white;
       }
    }
`;
export const ProductBoxImg = styled.div`
    width:100%;
    height:100%;
    img{
        width:100%;
        height:100%;
    }
  
`;