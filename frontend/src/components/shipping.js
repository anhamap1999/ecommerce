import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { register, saveShipping } from '../actions/cartActions';
import HomePage from '../pages/homepage';
import CheckoutSteps from './checkout';
function ShippingScreen(props) {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
   

    const dispatch =useDispatch();

    useEffect(() => {
        
        return () => {
        };
    }, []);
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShipping( {address , city ,country } ));
        props.history.push('/payment');
    }
  return <HomePage>
      <div>
          <CheckoutSteps step1 step2></CheckoutSteps>
          <form onSubmit={submitHandler} className="border rounded">
              <h3>Shipping</h3>
            <label htmlFor="address">
                            address
            </label>
            <input class="form-control" type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} ></input>
            <label htmlFor="city">
                            city
            </label>
            <input class="form-control" type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} ></input>
            <label htmlFor="country">
                            country
            </label>
            <input class="form-control" type="text" name="country" id="country" value={country} onChange={(e) => setCountry (e.target.value)} ></input>
            <button className="btn btn-outline-dark">
                Continue
            </button>
          </form>
      </div>
  </HomePage>
}

export default ShippingScreen;
