import React, { useState } from 'react';
import { Col , Row } from 'antd';
import Img from './giay.png';
import { ProductBox, ProductBoxImg,ProductNewEleImg,ProductBoxText,ProductNewContainer,ProductNewButton, ProductNew, ProductNewPrice, ProductNewText, ProductNewTitle, ProductsNewEle } from './productNewele';



const ProductsNew = () => {
    
    return <>
       
        <div className="container">
            <h1 className="text-center">New Shoes</h1>
            <ProductNew>
                <Row>
                    <Col md={{span:8}}>
                        <ProductsNewEle>
                            
                                <ProductNewEleImg>
                                        <img src={Img}></img>
                                </ProductNewEleImg>
                                <ProductNewText>
                                    <ProductNewTitle>
                                        Mens Shoes
                                    </ProductNewTitle>
                                    <ProductNewPrice>
                                        From $199
                                    </ProductNewPrice>
                                    <ProductNewButton>
                                        View collection <i className="bx bx-right-arrow-alt"></i>
                                    </ProductNewButton>
                                </ProductNewText>
                            
                        </ProductsNewEle>
                    </Col>
                    <Col md={{span:16}}>
                            <ProductNewContainer>
                                <ProductBox>
                                    <ProductBoxImg>
                                            <img src={Img}></img>
                                    </ProductBoxImg>
                                    <ProductBoxText>
                                        <h3>Nike</h3>
                                        <p>$100</p>
                                        <button>view</button>
                                    </ProductBoxText>
                                </ProductBox>
                                <ProductBox>
                                    <ProductBoxImg>
                                            <img src={Img}></img>
                                    </ProductBoxImg>
                                    <ProductBoxText>
                                        <h3>Nike</h3>
                                        <p>$100</p>
                                        <button>view</button>
                                    </ProductBoxText>
                                </ProductBox>
                                <ProductBox>
                                    <ProductBoxImg>
                                            <img src={Img}></img>
                                    </ProductBoxImg>
                                    <ProductBoxText>
                                        <h3>Nike</h3>
                                        <p>$100</p>
                                        <button>view</button>
                                    </ProductBoxText>
                                </ProductBox>
                                <ProductBox>
                                    <ProductBoxImg>
                                            <img src={Img}></img>
                                    </ProductBoxImg>
                                    <ProductBoxText>
                                        <h3>Nike</h3>
                                        <p>$100</p>
                                        <button>view</button>
                                    </ProductBoxText>
                                </ProductBox>
                               
                            </ProductNewContainer>
                    </Col>
                   
                </Row>
            </ProductNew>
        </div>       
       
    </>
}

export default ProductsNew ;