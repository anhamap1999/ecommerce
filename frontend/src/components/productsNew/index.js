import React, { useState } from 'react';
import { Col, Row } from 'antd';
import Img from './giay.png';
import {
  ProductBox,
  ProductBoxImg,
  ProductNewEleImg,
  ProductBoxText,
  ProductNewContainer,
  ProductNewButton,
  ProductNew,
  ProductNewPrice,
  ProductNewText,
  ProductNewTitle,
  ProductsNewEle,
} from './productNewele';

import { useDispatch, useSelector } from 'react-redux';
import { listNewProducts } from '../../actions/productActions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import utils from '../../modules/utils';

const ProductsNew = (props) => {
  const productList = useSelector((state) => state.listNewProduct);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listNewProducts({ page: 1, limit: 5 }));
    return () => {};
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="text-center">Giày mới về</h1>
        <ProductNew>
          {!loading ? (
            <Row>
              <Col md={{ span: 8 }}>
                {products[0] && (
                  <ProductsNewEle>
                    <ProductNewEleImg>
                      <img
                        src={products[0].thumbnail}
                        alt={products[0].name}
                      ></img>
                    </ProductNewEleImg>
                    <ProductNewText>
                      <ProductNewTitle>{products[0].name}</ProductNewTitle>
                      <ProductNewPrice>
                        {utils.vndFormat(products[0].price)}
                      </ProductNewPrice>
                      <Link to={`/product/${products[0]._id}`}>
                        <ProductNewButton>
                          Xem <i className="bx bx-right-arrow-alt"></i>
                        </ProductNewButton>
                      </Link>
                    </ProductNewText>
                  </ProductsNewEle>
                )}
              </Col>
              <Col md={{ span: 16 }}>
                <ProductNewContainer>
                  {products.length > 2 &&
                    products.map((item, index) => {
                      if (index > 0 && index < 5) {
                        return (
                          <ProductBox key={item._id}>
                            <ProductBoxImg>
                              <img src={item.images[0]} alt={item.name}></img>
                            </ProductBoxImg>
                            <ProductBoxText>
                              <h3>{item.name}</h3>
                              <p>{utils.vndFormat(item.price)}</p>
                              <Link to={`/product/${item._id}`}>
                                <button>Xem</button>
                              </Link>
                            </ProductBoxText>
                          </ProductBox>
                        );
                      }
                    })}
                </ProductNewContainer>
              </Col>
            </Row>
          ) : (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </ProductNew>
      </div>
    </>
  );
};

export default ProductsNew;
