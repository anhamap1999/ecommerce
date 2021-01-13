import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import ProfileScreen from './profile';
import { getListOrders, updateStatusOrder } from '../../actions/orderAction';
import { Spin, Avatar, Row, Col } from 'antd';
import utils from '../../modules/utils';
import { BsDot } from 'react-icons/bs';
import moment from 'moment';

const statusDefined = {
  handling: 'Đang xử lý',
  picking: 'Đang lấy hàng',
  delivering: 'Đang giao',
  delivered: 'Đã giao',
  completed: 'Đã hoàn tất',
  lost_damage: 'Mất hoặc hư hỏng',
  user_cancel: 'Người dùng hủy',
  company_cancel: 'Shop hủy',
};

export default function OrderUserScreen(props) {
  const { orders, loading = false, error } = useSelector(
    (state) => state.ordersList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListOrders());
    return () => {};
  }, []);

  const onUpdateStatus = async(order, status) => {
    await dispatch(updateStatusOrder(order, { status }));
    await dispatch(getListOrders());
  }
  return (
    <ProfileScreen >
      <div style={{ marginTop: '100px' }}>
        <div className="col-sm-8">
          <h4>Đơn hàng của tôi</h4>
        </div>
        <hr></hr>
        {loading ? (
          <div className='spinner-border text-primary' role='status'>
            <span className='sr-only'></span>
          </div>
        ) : error ? (
          <div> {error} </div>
        ) : (
          orders &&
          orders.map((order) => (
            <div
              className='container'
              style={{ height: 'min-content' }}
              key={order._id}
            >
              <div className='row'>
                <div className='col-sm-3'>
                  <div className='text-muted' style={{ height: '35px' }}>
                    Thành tiền
                  </div>
                  <div className='text-muted' style={{ height: '35px' }}>
                    Trạng thái
                  </div>
                  <div className='text-muted' style={{ height: '35px' }}>
                    Thông tin vận chuyển
                  </div>
                  {order.status === 'handling' ? (<div className='text-muted' style={{ height: '35px' }}>
                    <button className='btn btn-success' onClick={() => onUpdateStatus(order, 'completed')}>Hủy đơn hàng</button>
                  </div>) : null}
                  {order.status === 'delivered' ? (<div className='text-muted' style={{ height: '35px' }}>
                    <button className='btn btn-success' onClick={() => onUpdateStatus(order, 'completed')}>Hoàn tất</button>
                  </div>) : null}
                </div>
                <div className='col-sm-3'>
                  <div className='text-dark' style={{ height: '35px' }}>
                    {utils.vndFormat(order.total_price)}
                  </div>
                  <div className='text-dark' style={{ height: '35px' }}>
                    <div className={'label-custom label-' + order.status}>
                      {statusDefined[order.status]}
                    </div>
                  </div>
                  <div className='text-dark'>
                    {order.progress && order.progress.length ? order.progress.reverse().map(item => (
                      <>
                      <div><BsDot /><span style={{ color: '#339658'}}>{statusDefined[item.status] ? statusDefined[item.status] : ''}</span></div>
                      <div>{moment(item.updated_at).format('HH:mm:ss DD/MM/YYYY')}</div>
                      </>
                    )) : ''}
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='text-dark'>
                    {order.order_items && order.order_items.length
                      ? order.order_items.map((item) => (
                          <div className='row' style={{ height: 80 }}>
                            <div className='col-sm-3'>
                              <Avatar
                                size={80}
                                src={
                                  item.product_id
                                    ? item.product_id.thumbnail
                                    : ''
                                }
                                shape='square'
                                alt={'product-image'}
                              />
                            </div>
                            <div className='col-sm-7'>
                              <div className='font-weight-bold'>
                                {item.product_id ? item.product_id.name : ''}
                              </div>
                              <div>x{item.quantity}</div>
                              <div>{utils.vndFormat(item.price)}</div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                {/* <div className='col-sm-2'></div> */}
              </div>
              <hr></hr>
            </div>
          ))
        )}
      </div>
    </ProfileScreen>
  );
}
