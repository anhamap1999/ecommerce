import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {detailsProduct} from '../actions/productActions';
import {Link} from 'react-router-dom'
import HomePage from '../pages/homepage';
import Img from './giay.png';
import Demo from './comment';
import CommentEle from './comment/commentEle';
import CommentedProduct from './comment';

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
    loading ? <div class="container">
    <div class="spinner-border text-primary" role="status">
    <span class="sr-only"></span>
 </div>
    </div> :
      error ? <div> {error} </div>:  
      product && product.data &&  <div className=" details" style={{marginTop:"100px"}}>
           <div className="details-product container">
              <div className="row">
                <div className="col-md-6">
                  <div className="details-img"> 
                  <img src={ Img }></img> 
                  </div>
                </div>
                <div className="col-md-6">
                    <div className="details-text">
                      <h3 className="text-secondary" style={{textTransform:'uppercase'}}>{ product.data.name }</h3>
                      <p className="text-secondary">{ product.data.numReviews } Reviews</p>
                      <h4>GIÁ: <span className="text-warning">{ product.data.price } VNĐ</span></h4>
                      <div>
                      Số lượng: 
                            <select
                              value={qty}
                              onChange={(e) => {
                                setQty(e.target.value);
                              }}
                            >
                              {[...Array(product.data.stock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                      </div>
                      {product && product.data && <Link to={`/cart/${product.data._id}?qty=${qty}`}><button type="button" style={{padding:'15px'}} className="btn btn-danger"><span><i class='bx bxs-cart'></i></span> THÊM VÀO GIỎ HÀNG</button></Link>}
                      {/* comment */}
                      <button type="button" style={{padding:'15px'}} class="btn btn-primary"><i className='bx bxs-heart' style={{fontSize:'20px'}}></i></button>         
                    </div>
                </div>
              </div>
              <hr></hr>
              <div className="detail-product-des container">
                <h4> Thông tin chi tiết sản phẩm</h4>
                <p>
                { product.data.description} 
                </p>
              </div>
           </div>
          
            <div className="container" style={{marginTop:'20px'}}>
              <h3 className="text-primary"><i class='bx bx-comment-detail' style={{marginRight:'5px'}} ></i> Bình luận </h3>                     
            </div>
           
          
      </div>}
                                
       <div class="details-product container">
                                
       {product && product.data && <CommentEle productID={product.data._id} />}
       </div>
  </HomePage>
}


export default DetailsScreen;
