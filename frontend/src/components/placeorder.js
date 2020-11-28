import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveOrder } from '../actions/orderAction';

import HomePage from '../pages/homepage';

import CheckoutSteps from './checkout';
function PlaceOrderScreen(props) {
    
    const cart = useSelector(state => state.cart);
    const { shipping , payment , cartItems} = cart;
   
    const orderSave = useSelector(state => state.orderSave);
    const { loading, success, error, order } = orderSave;
  


    if(!shipping.address){
        props.history.push("/shipping");
    }
    else if(!payment.paymentMethod){
        props.history.push("/payment");
    }
    
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const totalPrice = itemsPrice + shippingPrice ;

    const dispatch = useDispatch();
   
    useEffect(() => {
        if (success) {
            props.history.push("/order/" + order._id);
        }
    
      }, [success]);
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveOrder({
            orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
            totalPrice
          }))
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
                        <form className="order" onSubmit={submitHandler}> 
                            <button type="submit">
                                Order
                            </button>
                            <h3>
                                Order Sum
                            </h3>
                            <p>Items Price : {itemsPrice} $ </p>
                            <p>Shipping : {shippingPrice} $</p>
                            <h1 className=" rounded badge-dark"> Order Total : {totalPrice } $</h1>
                        </form>
              </div>
          </div>
    </div>
    
  </HomePage>
}

export default PlaceOrderScreen;
