import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { register, savePayment, saveShipping } from '../actions/cartActions';
import HomePage from '../pages/homepage';
import CheckoutSteps from './checkout';
function PaymentSreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('');
  
    const dispatch =useDispatch();

    useEffect(() => {
        
        return () => {
        };
    }, []);
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePayment( {paymentMethod} ));
        props.history.push('/placeorder');
    }
  return <HomePage>
      <div>
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
          <form onSubmit={submitHandler} className="border rounded">
              <h3>Payment</h3>
           <div>
            <label for="paymentMethod">
                paypal
            </label>
            <input  type="radio" name="paymentMethod" id="paymentMethod" value="paypal"
                onChange={(e) => setPaymentMethod(e.target.value)} >   
            </input>
            
           </div>
            <button type="submit" className="btn btn-outline-dark">
                Continue
            </button>
          </form>
      </div>
  </HomePage>
}

export default PaymentSreen;
