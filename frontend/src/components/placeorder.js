import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomePage from '../pages/homepage';

import CheckoutSteps from './checkout';
function PlaceOrderScreen(props) {
    
    const dispatch =useDispatch();
    const cart = useSelector(state => state.cart);
    const { shipping , payment , cartItems} = cart;
   
    if(!shipping){
        props.history.push("/shipping");
    }
    else if(!payment.paymentMethod){
        props.history.push("/payment");
    }
    
    useEffect(() => {
        
        return () => {
        };
    }, []);
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch();
    }
  return <HomePage>
      <div className="container placeorder">
          <CheckoutSteps step1 step2 step3 step4>
          </CheckoutSteps>
          <div className="row">
              <div className="col-md-7">
                    <div className="general">
                        <h3>Shipping</h3>
                        { cart.shipping.address },
                        {cart.shipping.city },
                        {cart.shipping.country }
                    </div>
                    <div className="general">
                        <h3>PaymentMethod</h3>
                        {cart.payment.paymentMethod}
                    </div>
                    <div className="general cart-place">
                        <h3>Cart</h3>
                        <div>
                            {
                                cartItems.map(item =>
                                    <>
                                        <div>name: {item.name}</div>
                                        <div className="img">
                                            <img src={item.image} />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
              </div>
              <div className="col-md-5">
                        <div className="order">
                            <button>
                                Order
                            </button>
                            <h3>
                                Order Sum
                            </h3>
                            <p>Items : </p>
                            <p>Shipping : </p>
                            <h1 className=" rounded badge-dark"> Order Total :</h1>
                        </div>
              </div>
          </div>
    </div>
  </HomePage>
}

export default PlaceOrderScreen;
