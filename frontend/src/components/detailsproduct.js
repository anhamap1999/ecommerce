import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {detailsProduct} from '../actions/productActions';
import {Link} from 'react-router-dom'
import HomePage from '../pages/homepage';
import Img from './giay.png';
import CommentEle from './comment/commentEle';
import {  InputNumber  } from  'antd';
import { saveProductCart } from '../actions/cartActions';
function DetailsScreen(props) {
  const [qty,setQty] =useState(1);
  const [size,setSize] =useState('');
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading , error} = productDetails;
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));

    return () => {
     
    };
  }, []);
  const sizeOnchange= (e) =>{
    setSize(e.target.value)
  }
  const addProductTocart = async() =>{
    await dispatch(saveProductCart({quantity :qty,size,product_id :product.data._id, price :product.data.price}))
  }
  return <HomePage>{
    loading ? <div className="container">
    <div className="spinner-border text-primary" role="status">
    <span className="sr-only"></span>
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
                      {product.data.stock == 0 ? <h1>HẾT HÀNG</h1> : <>
                      <div>
                      Số lượng: 
                      <InputNumber min={1} max={product.data.stock} 
                              value={qty} 
                              onChange={value =>setQty(value)} />
                            {console.log(qty)}
                      </div>
                      <div style={{marginBottom:'5px'}} > 
                        <h5>Size :</h5>
                        {product.data.size.map((item,index) =>     
                                    <button 
                                          type="button" key={index} 
                                          style={{padding:'8px',width:'80px',margin:'5px'}} 
                                          className={item == 37 ? 'btn btn-outline-danger' :'btn btn-outline-secondary'}
                                          value={item}
                                          onClick={sizeOnchange}
                                          >
                                      {item}
                                    {console.log("bds",size)}
                                    </button>
                                    ) }
                      </div></>
                      }
                      
                        <Link to={ `/cart/${product.data._id}?qty=${qty}&&size=${size}` } >
                          <button type="button" style={{padding:'15px'}}  
                                  className="btn btn-danger"
                                  onClick={addProductTocart}
                                  >
                                    <span><i class='bx bxs-cart'></i></span> THÊM VÀO GIỎ HÀNG
                          </button>
                        </Link>
                      {/* comment */}
                      <button type="button" style={{padding:'15px'}} className="btn btn-primary"><i className='bx bxs-heart' style={{fontSize:'20px'}}></i></button>         
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
              <h3 className="text-primary"><i className='bx bx-comment-detail' style={{marginRight:'5px'}} ></i> Bình luận </h3>                     
            </div>
           
          
      </div>}
                                
       <div className="details-product container">
                                
       {product && product.data && <CommentEle productID={product.data._id} />}
       </div>
  </HomePage>
}


export default DetailsScreen;
