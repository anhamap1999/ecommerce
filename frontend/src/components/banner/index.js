import React from 'react';
import { Col, Row } from 'antd';
import {
  BannerContainer,
  BannerText,
  BannerTitle,
  BannerName,
  BannerDetails,
  BannerButton,
  BannerImg,
} from './bannerele';
import Img from './giay.png';
import { Link } from 'react-router-dom';

const BannerTop = () => {
  return (
    <>
      <BannerContainer>
        <div className="container" id="banner">
          <Row>
            <Col md={{ span: 12 }}>
              <BannerText>
                <BannerTitle>Giày chính hãng</BannerTitle>
                <BannerName>
                  SHOES<br></br>
                  {/* SPLY - 350 */}
                </BannerName>
                <BannerDetails>Khám phá các dòng sản phẩm</BannerDetails>
                <Link to={'/products'}>
                  <BannerButton>
                    <span>Xem ngay</span>
                  </BannerButton>
                </Link>
              </BannerText>
            </Col>
            <Col md={{ span: 12 }}>
              <BannerImg>
                <span>
                  <img src={Img}></img>
                </span>
              </BannerImg>
            </Col>
          </Row>
        </div>
      </BannerContainer>
    </>
  );
};

export default BannerTop;
