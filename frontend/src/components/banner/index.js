import React from 'react';
import { Col , Row } from 'antd';
import { BannerContainer, BannerText ,BannerTitle,BannerName,BannerDetails,BannerButton, BannerImg } from './bannerele';
import Img from './giay.png';


window.onscroll = () =>{
    const nav =document.getElementById('banner')
    console.log(nav);
    if(window.pageYOffset >= 10)
    {
        nav.classList.add('bg-menu');
    }
    else{
        nav.classList.remove('bg-menu');
    }
}
const BannerTop = () => {
    
    return <>
       <BannerContainer>
        <div className="container"id="banner">
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
                                <span>
                                    Explore now
                                </span>
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