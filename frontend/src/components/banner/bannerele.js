import styled from 'styled-components';

export const BannerContainer = styled.div`
  width: 100%;
  height: 430px;
  
  margin-bottom: 10px;
  background-color: #f2f2f2;
  position: relative;
  animation: move 3s;

  @keyframes move {
    0% {
      top: 0px;
      opacity: 0;
    }
    50% {
      top: 100px;
      opacity: 0.5;
    }
    100% {
      top: 0px;
      opacity: 1;
    }
  }
`;
export const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  position: absolute;
  left: 22%;
`;
export const BannerTitle = styled.div`
  font-size: 16px;
  color: #8a8a8a;
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
  transition: all 0.5s;
  position: relative;
  color: #141414;
  line-height: 50px;
  height: 50px;
  text-align: center;
  width: 140px;
  background: none;
  border: none;
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
    -webkit-transform: scale(1.2, 1.2);
    transform: scale(1.2, 1.2);
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
    border: 1px solid black;
  }
  &:hover::before {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  &:hover::after {
    opacity: 1;
    transform: scale(1, 1);
  }
  &span {
    color: #141414;
  }
`;
export const BannerImg = styled.div`
  display: flex;

  align-items: center;
  height: 140%;
  width: 100%;
  & span {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: black;
  }
  & img {
    width: 449px;
    height: 300px;
    transform: rotate(27deg);
  }
`;
