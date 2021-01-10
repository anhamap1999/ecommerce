import React, { useState } from 'react';
import { Col, Row } from 'antd';
import Img from './giay.png';
import {
  ProductContainer,
  ProductWrapper,
  ProductSaleSpan,
  ProductSaleButton,
  ProductSale,
  ProductImg,
  ProductText,
  ProductPrice,
  ProductTitle,
  Productbutton,
  ProductSaleOff,
  ProductSaleH2,
  ProductSaledes,
} from './productele';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import utils from '../../modules/utils';

const ProductsNike = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const listCategories = useSelector((state) => state.listCategories);
  const { categories, loading: loadingCat, error: errorCat } = listCategories;
  useEffect(() => {
    dispatch(listProducts({ page: 1, limit: 30 }));
    return () => {};
  }, []);

  const addItemToCart = (product) => {
    addToCart(product, 1, product.size[0]);
  };
  return (
    <>
      <div className='container'>
        {categories && categories.length
          ? categories
              .filter((i) => i.type === 1)
              .map((category) => (
                <>
                  <h1 className='text-center' style={{ marginTop: '50px' }}>
                    {category.name}
                  </h1>
                  <div className=''>
                    <ProductSaleOff>
                      <ProductSaleH2>{category.name}</ProductSaleH2>
                      {/* <ProductSaledes>In Adidas </ProductSaledes> */}
                      <Link to={`/products/${category.pure_name}`}>
                        <ProductSaleButton>
                          <ProductSaleSpan>Xem tất cả</ProductSaleSpan>
                        </ProductSaleButton>
                      </Link>
                    </ProductSaleOff>
                  </div>
                  <ProductContainer id='product'>
                    <Row>
                      {loading ? (
                        <div
                          className='spinner-border text-primary'
                          role='status'
                        >
                          <span className='sr-only'>Loading...</span>
                        </div>
                      ) : error ? (
                        <div className=''>loading</div>
                      ) : (
                        products &&
                        products.length &&
                        products.map(
                          (product) =>
                            product.category_id &&
                            product.category_id._id === category._id && (
                              <Col md={{ span: 8 }}>
                                <Link to={`/product/${product._id}`}>
                                  <ProductWrapper>
                                    <ProductImg>
                                      <img
                                        src={product.thumbnail}
                                        alt={product.name}
                                      ></img>
                                    </ProductImg>
                                    <ProductText>
                                      <ProductTitle>
                                        {product.name}
                                      </ProductTitle>
                                      <ProductPrice>
                                        {utils.vndFormat(product.price)}
                                      </ProductPrice>
                                      <Productbutton>
                                        <Link
                                          to={'/cart'}
                                          onClick={() => addItemToCart(product)}
                                        >
                                          Thêm vào giỏ hàng
                                        </Link>{' '}
                                        <i className='bx bx-right-arrow-alt'></i>
                                      </Productbutton>
                                    </ProductText>
                                    {product.discount_rate > 0 && (
                                      <ProductSale>
                                        {product.discount_rate}
                                      </ProductSale>
                                    )}
                                  </ProductWrapper>
                                </Link>
                              </Col>
                            )
                        )
                      )}
                    </Row>
                  </ProductContainer>
                </>
              ))
          : loadingCat && (
              <div className='spinner-border text-primary' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            )}
        {/* <h1 className='text-center'>Giày Nam</h1>
        <ProductContainer id='product'>
          <Row>
            {loading ? (
              <div className='spinner-border text-primary' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            ) : error ? (
              <div className=''>loading</div>
            ) : (
              products &&
              products &&
              products.map((product) => (
                <Col md={{ span: 8 }}>
                  <ProductWrapper>
                    <ProductImg>
                      <img src={Img}></img>
                    </ProductImg>
                    <ProductText>
                      <ProductTitle>{product.name}</ProductTitle>
                      <ProductPrice>${product.price}</ProductPrice>
                      <Productbutton>
                        <Link to={'/product/' + product._id}>Add to Cart</Link>{' '}
                        <i className='bx bx-right-arrow-alt'></i>
                      </Productbutton>
                    </ProductText>
                    <ProductSale>Sale</ProductSale>
                  </ProductWrapper>
                </Col>
              ))
            )}
          </Row>
        </ProductContainer> */}
        {/* <div className=''>
          <ProductSaleOff>
            <ProductSaleH2>50% OFF</ProductSaleH2>
            <ProductSaledes>In Adidas </ProductSaledes>
            <ProductSaleButton>
              <ProductSaleSpan>Shop Now</ProductSaleSpan>
            </ProductSaleButton>
          </ProductSaleOff>
        </div> */}
      </div>
    </>
  );
};

export default ProductsNike;
