import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {detailsProduct} from '../actions/productActions';
import {Link} from 'react-router-dom'
import HomePage from '../pages/homepage';
function DetailsScreen(props) {
  const [qty,setQty] =useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading , error} = productDetails;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
     
    };
  }, []);
  
  return <HomePage>{
    loading ? <div> loading...</div> :
      error ? <div> {error} </div>:  
      <div className="container details">
          <div className="row">
          {
           <div className="details-product col-md-7 ">
              <div className="details-img"> 
                <img src={ product.image }></img> 
              </div>
              <div className="details-text">
               
              </div>
           </div>
          }
            <div className="col-md-1">
              
            </div>
            <div className="col-md-4 cart-details-product">
              <h1>Details Product</h1>
              <h3>brand :{ product.name }</h3>
              <p>price :{ product.price }</p>
              <div>
              Qty:
                    <select
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                    >
                      {[...Array(product.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
              </div>
              
              <Link to={'/cart/'+product._id +'?qty='+qty}><button>Add To Cart</button></Link>
            </div>
          </div>
      </div>}
        
  </HomePage>
}


export default DetailsScreen;
