import React from 'react';
import { Col , Row } from 'antd';
import { BannerContainer, BannerText ,BannerTitle,BannerName,BannerDetails,BannerButton, BannerImg } from './bannerele';
import Img from './giay.png';
const BannerTop = () => {
    
    return <>
       <BannerContainer>
        <div className="container">
                <Row>
                    <Col md={{span:12}}>
                        <BannerText>
                            <BannerTitle>New in</BannerTitle>
                            <BannerName>YEEZY BOOST<br></br>
                                        SPLY - 350
                            </BannerName>
                            <BannerDetails>
                                Explore the new collections of  sneakers
                            </BannerDetails>
                            <BannerButton>
                                Explore now
                            </BannerButton>
                        </BannerText>
                    </Col>
                    <Col md={{span:12}}>    
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
}

export default BannerTop ;