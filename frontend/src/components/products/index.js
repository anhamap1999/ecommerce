import React from 'react';
import { Col , Row } from 'antd';
import Img from './giay.png';
import { ProductContainer,ProductWrapper,ProductSale,ProductImg,ProductText,ProductPrice ,ProductTitle,Productbutton} from './productele';



const ProductsNike = () => {
    
    return <>
       
        <div className="container">
                <h1 className="text-center">Nike Men</h1>
                <ProductContainer>
                    <Row>
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
        </div>
       
    </>
}

export default ProductsNike ;