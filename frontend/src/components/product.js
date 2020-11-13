import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import axios from 'axios';
import HomePage from '../pages/homepage';


function ProductScreen(props) {

  const productList = useSelector( state => state.productList);
  const  { products,loading,error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {
    };
  }, []);

  return <HomePage>
      {
        loading ? <div>loading..</div> :
        error ? <div>{error}</div>:
        <ul className="container">
          <div className="row">
          {
            products.map(product =>
              <div className="col-md-4">
                <li>
                  <div className="productmain">
                    <div className="product">
                      <div className="product-img"> 
                        <img src={product.image} alt="giay"></img>
                      </div>
                      <div className="product-text">
                        <h3> { product.name } </h3>
                        <Link to = { "/product/" + product._id } > <button> Buy now </button></Link>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            )
          }
          </div>
        </ul>
      }
  
  </HomePage> 
}


export default ProductScreen;
