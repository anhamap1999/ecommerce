import React, { useState } from 'react';
import { Col , Row } from 'antd';
import Img from './giay.png';
import { ProductContainer,ProductWrapper,ProductSaleSpan,ProductSaleButton,ProductSale,ProductImg,ProductText,ProductPrice ,ProductTitle,Productbutton, ProductSaleOff, ProductSaleH2, ProductSaledes} from './productele';



const ProductsNike = () => {
    
    return <>
       
        <div className="container">
                <h1 className="text-center">Nike Men</h1>
                <ProductContainer id="product">
                    <Row>
                        <Col md={{span:8}}>
                            <ProductWrapper >
                                <ProductImg>
                                    <img src={Img}></img>
                                </ProductImg>
                                <ProductText>
                                    <ProductTitle>Nike Jordan</ProductTitle>
                                    <ProductPrice>$ 199</ProductPrice>
                                    <Productbutton>Add to Cart <i className="bx bx-right-arrow-alt"></i></Productbutton>
                                </ProductText>
                                <ProductSale>Sale</ProductSale>
                            </ProductWrapper>

                        </Col>  
                        <Col md={{span:8}}>
                            <ProductWrapper>
                                <ProductImg>
                                    <img src={Img}></img>
                                </ProductImg>
                                <ProductText>
                                    <ProductTitle>Nike Jordan</ProductTitle>
                                    <ProductPrice>$ 199</ProductPrice>
                                    <Productbutton>Add to Cart <i className="bx bx-right-arrow-alt"></i></Productbutton>
                                </ProductText>
                                <ProductSale>Sale</ProductSale>
                            </ProductWrapper>

                        </Col>  
                        <Col md={{span:8}}>
                            <ProductWrapper>
                                <ProductImg>
                                    <img src={Img}></img>
                                </ProductImg>
                                <ProductText>
                                    <ProductTitle>Nike Jordan</ProductTitle>
                                    <ProductPrice>$ 199</ProductPrice>
                                    <Productbutton>Add to Cart <i className="bx bx-right-arrow-alt"></i></Productbutton>
                                </ProductText>
                                <ProductSale>Sale</ProductSale>
                            </ProductWrapper>

                        </Col>         
                    </Row>
                </ProductContainer>
                <div className="container">
                    <ProductSaleOff>
                        <ProductSaleH2>50% OFF</ProductSaleH2>
                        <ProductSaledes>In Adidas </ProductSaledes>
                        <ProductSaleButton>
                            <ProductSaleSpan>
                             Shop Now
                            </ProductSaleSpan>
                        </ProductSaleButton>
                    </ProductSaleOff>
                </div>
        </div>
       
    </>
}

export default ProductsNike ;