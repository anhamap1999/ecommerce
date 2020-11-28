import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Link} from 'react-router-dom';
import { getListOrders } from '../actions/orderAction';
import HomePage from '../pages/homepage';
function OrdersScreen(props) {
  const odersList = useSelector(state => state.odersList);
  const { loading, error, orders } = odersList ;
  const dispatch = useDispatch();
  console.log("data: " ,orders);
  useEffect(() => {
      dispatch(getListOrders())
      return () => {
          
      };
  }, [])
  return <HomePage>
      
      <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">name</th>
                        <th scope="col">adress</th>
                        <th scope="col">quanlity</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
        <tbody>
                       
        </tbody>
    </table>
  </HomePage>
}


export default OrdersScreen;