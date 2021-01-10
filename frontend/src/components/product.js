import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import axios from 'axios';
import HomePage from '../pages/homepage';
import { Pagination } from 'antd';

function ProductScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  const { page } = {};
  const onPaginationChange = (page, limit) => {
    dispatch(listProducts({ page, limit }));
  };
  useEffect(() => {
    dispatch(listProducts({ page: 1, limit: 30 }));
    return () => {};
  }, []);
  console.log('products', products);
  return (
    <HomePage>
      {loading ? (
        <div className='container'>
          <div className='spinner-border text-primary' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className='container'>
          <div className='row'>
            {products &&
              products &&
              products.map((product) => (
                <div className='col-md-4'>
                  <li>
                    <div className='productmain'>
                      <div className='product'>
                        <div className='product-img'>
                          <img src='' alt='giay'></img>
                        </div>
                        <div className='product-text'>
                          <h3> {product.name} </h3>
                          <Link to={'/product/' + product._id}>
                            {' '}
                            <button> Buy now </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            {products && products && (
              <div className='container'>
                <Pagination
                  current={page}
                  total={products.total}
                  pageSize={2}
                  pageSizeOptions={[10, 20, 30]}
                  onChange={onPaginationChange}
                />
              </div>
            )}
          </div>
        </ul>
      )}
    </HomePage>
  );
}

export default ProductScreen;
