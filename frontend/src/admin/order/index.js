import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListOrdersAdmin } from '../../actions/orderAction';
import DashboardScreen from '../dashboard';
const OrderAdminScreen = (props) => {
  const listOrderAdmin = useSelector((state) => state.listOrderAdmin);
  const { orders, loading, error } = listOrderAdmin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListOrdersAdmin());
    return () => {};
  }, []);
  return (
    <DashboardScreen>
      <h3>Danh sách đặt hàng</h3>
      <div className="">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        ) : error ? (
          <div className="">{error}</div>
        ) : (
          orders && <div>a</div>
        )}
      </div>
    </DashboardScreen>
  );
};

export default OrderAdminScreen;
