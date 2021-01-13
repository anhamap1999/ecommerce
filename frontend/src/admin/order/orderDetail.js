import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Avatar, Modal, Spin } from 'antd';
import moment from 'moment';
import utils from '../../modules/utils';

import { BsDot } from 'react-icons/bs';

const statusDefined = {
  handling: 'Đang xử lý',
  picking: 'Đang lấy hàng',
  delivering: 'Đang giao',
  delivered: 'Đã giao',
  completed: 'Đã hoàn tất',
  lost_damage: 'Mất hoặc hư hỏng',
  user_cancel: 'Người dùng hủy',
  shop_cancel: 'Shop hủy',
};

const OrderDetail = (props) => {
  const { order } = props;

  return (
    <Modal
      visible={props.modalVisible}
      onCancel={props.onCancel}
      width={'50%'}
      footer={null}
      title={'Chi tiết đơn hàng'}
    >
      <div
        className='container'
        style={{ height: 'min-content' }}
        key={order._id}
      >
        <div className='row'>
          <div className='col-sm-3'>
            <div className='text-muted' style={{ height: '35px' }}>
              Tên khách hàng
            </div>
            <div className='text-muted' style={{ height: '35px' }}>
              Số điện thoại
            </div>
            <div className='text-muted' style={{ height: '35px' }}>
              Địa chỉ giao hàng
            </div>
            <div className='text-muted' style={{ height: '35px' }}>
              Thanh toán
            </div>
            <div className='text-muted' style={{ height: '35px' }}>
              Tổng tiền hàng
            </div>
            <div className='text-muted' style={{ height: '35px' }}>
              Thuế
            </div>
            <div className='text-muted' style={{ height: '35px' }}>
              Phí vận chuyển
            </div>
            <div className='text-muted' style={{ height: '35px' }}>
              Thành tiền
            </div>
            <div className='text-muted' style={{ height: '35px' }}>
              Trạng thái
            </div>
            <div className='text-muted' style={{ height: '35px' }}>
              Thông tin vận chuyển
            </div>
          </div>
          <div className='col-sm-3'>
            <div className='text-dark' style={{ height: '35px' }}>
              {order.created_by ? order.created_by.full_name : ''}
            </div>
            <div className='text-dark' style={{ height: '35px' }}>
              {order.shipping ? order.shipping.phone_number : ''}
            </div>
            <div className='text-dark'>
              {order.shipping ? order.shipping.normalizedAddress : ''}
            </div>
            <div className='text-dark' style={{ height: '35px' }}>
              {order.shipping
                ? order.shipping.paymentMethod === 'cash'
                  ? 'Tiền mặt'
                  : 'Qua chuyển khoản'
                : ''}
            </div>
            <div className='text-dark' style={{ height: '35px' }}>
              {utils.vndFormat(order.items_price ? order.items_price : 0)}
            </div>
            <div className='text-dark' style={{ height: '35px' }}>
              {utils.vndFormat(order.tax_price ? order.tax_price : 0)}
            </div>
            <div className='text-dark' style={{ height: '35px' }}>
              {utils.vndFormat(order.shipping_price ? order.shipping_price : 0)}
            </div>
            <div className='text-dark' style={{ height: '35px' }}>
              {utils.vndFormat(order.total_price ? order.total_price : 0)}
            </div>
            <div className='text-dark' style={{ height: '35px' }}>
              <div className={'label-custom label-' + order.status}>
                {statusDefined[order.status]}
              </div>
            </div>
            <div className='text-dark'>
              {order.progress && order.progress.length
                ? order.progress.reverse().map((item) => (
                    <>
                      <div>
                        <BsDot />
                        <span style={{ color: '#339658' }}>
                          {statusDefined[item.status]
                            ? statusDefined[item.status]
                            : ''}
                        </span>
                      </div>
                      <div>
                        {moment(item.updated_at).format('HH:mm:ss DD/MM/YYYY')}
                      </div>
                    </>
                  ))
                : ''}
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='text-dark'>Thông tin sản phẩm</div>
            <div className='text-dark'>
              {order.order_items && order.order_items.length
                ? order.order_items.map((item) => (
                    <div className='row' style={{ height: 80 }}>
                      <div className='col-sm-3'>
                        <Avatar
                          size={80}
                          src={item.product_id ? item.product_id.thumbnail : ''}
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
    </Modal>
  );
};

export default OrderDetail;
