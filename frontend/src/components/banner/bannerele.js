import styled from 'styled-components';

export const BannerContainer = styled.div`
    width:100%;
    height:430px;
    margin-top: 70px;
    margin-bottom: 10px;
    background-color: #f2f2f2;
  
`;
export const BannerText = styled.div`
    display: flex;
    flex-direction:column;
    padding-top: 40px;
    position: absolute;
    left: 22%;
`;
export const BannerTitle = styled.div`
    font-size:16px;
    color:#8a8a8a;
    padding: 10px 0;
`;
export const BannerName = styled.div`
    padding: 10px 0;
    font-size: 28px;
    font-weight: 700;
`;
export const BannerDetails = styled.div`
    padding: 10px 0;
    font-size: 13px;
    font-weight: 600;
`;
export const BannerButton = styled.div`
    margin-top:20px;
    width: 115px;
    height: 41px;
    background-color: #141414;
    color: #fff;
    border-radius: 9px;
    text-align: center;
    padding-top: 8px;
    &:hover{
        background-color: #14141480;
    }
`;
export const BannerImg = styled.div`
    display:flex;
   
    align-items:center;
    height:140%;
    width :100%;
    & span {
        width:300px;
        height: 300px;
        border-radius:50%;
        background-color:black;
    }
    & img{
        width: 449px;
        height: 300px;
        transform: rotate(27deg);
    }
`;