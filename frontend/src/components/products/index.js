import React, { useState } from 'react';
import { Col , Row } from 'antd';
import Img from './giay.png';
import { ProductContainer,ProductWrapper,ProductSaleSpan,ProductSaleButton,ProductSale,ProductImg,ProductText,ProductPrice ,ProductTitle,Productbutton, ProductSaleOff, ProductSaleH2, ProductSaledes} from './productele';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



const ProductsNike = () => {
    const productList = useSelector( state => state.productList);
    const { products, loading ,error } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts(0));
        return () => {
        };
      }, []);
    return <>
       
        <div className="container">
                <h1 className="text-center">Giày Nam</h1>
                <ProductContainer id="product">
                    <Row>
                    {   
                        loading ?<div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div> :
                           error ? <div className="">loading</div> :
                           products && products.data && products.data.map((product) =>
                                (
                                    <Col md={{span:8}}>
                                        <ProductWrapper >
                                            <ProductImg>
                                                <img src={Img}></img>
                                            </ProductImg>
                                            <ProductText>
                                                <ProductTitle>{product.name}</ProductTitle>
                                                <ProductPrice>${product.price}</ProductPrice>
                                                <Productbutton ><Link to = { "/product/" + product._id }>Add to Cart</Link> <i className="bx bx-right-arrow-alt"></i></Productbutton>
                                            </ProductText>
                                            <ProductSale>Sale</ProductSale>
                                        </ProductWrapper>
                                    </Col>  
                                )
                            )
                        }     
                    </Row>
                </ProductContainer>
                <div className="">
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