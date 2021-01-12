import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveOrder } from '../actions/orderAction';
import utils from '../modules/utils';
import { Row, Col, Avatar } from 'antd';
import HomePage from '../pages/homepage';

import CheckoutSteps from './checkout';
function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cartUser);
  const { shipping, payment, cartItems } = cart;

  const { loading, success, error, orders } = useSelector(
    (state) => state.ordersList
  );
  //   const { loading, success, error, order } = orderSave;
  const { provinces, districts, wards } = useSelector((state) => state.address);
  const { configs } = useSelector((state) => state.config);
  const configIndex =
    configs &&
    configs.length &&
    configs.findIndex((i) => i.key === 'shipping_fee');
  const shippingFee =
    configs && configs[configIndex] ? configs[configIndex].value : {};
  const { banks, branches } = useSelector((state) => state.bank);

  if (!shipping || !shipping.addressId) {
    props.history.push('/shipping');
  } else if (
    !payment ||
    !payment.paymentMethod ||
    (payment.paymentMethod === 'online' && !payment.bank_account)
  ) {
    props.history.push('/payment');
  }

  const provinceIndex =
    provinces &&
    provinces.length &&
    provinces.findIndex((i) => i.number === shipping.province_number);
  const districtIndex =
    districts &&
    districts.length &&
    districts.findIndex((i) => i.number === shipping.district_number);
  const wardIndex =
    wards &&
    wards.length &&
    wards.findIndex((i) => i.number === shipping.ward_number);
  const bankIndex =
    banks && banks.length && banks.findIndex((i) => i.number === payment.bank);
  const branchIndex =
    branches &&
    branches.length &&
    branches.findIndex((i) => i.number === payment.branch);

  const itemsPrice = cartItems.reduce(
    (t, i) => t + (i.product_id ? i.product_id.price : 0) * i.quantity,
    0
  );
  const shippingPrice =
    itemsPrice >= shippingFee.free_threshold
      ? 0
      : shippingFee.fee[shipping.district_number]
      ? shippingFee.fee[shipping.district_number]
      : shippingFee.fee['other'];
  const taxPrice = 0;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      props.history.push('/profile/order');
    }
  }, [success]);
  const submitHandler = (e) => {
    e.preventDefault();
    const paymentData = {
      paymentMethod: payment.paymentMethod,
    };
    if (payment.paymentMethod === 'online') {
      paymentData.bank_account = payment.bank_account;
    }
    dispatch(
      saveOrder({
        order_items: cartItems.map((i) => ({
          quantity: i.quantity,
          price: i.product_id.price,
          product_id: i.product_id._id,
          size: i.size,
        })),
        shipping: shipping.addressId,
        payment: paymentData,
        items_price: itemsPrice,
        shipping_price: shippingPrice,
        total_price: totalPrice,
        tax_price: taxPrice,
      })
    );
  };

  return (
    <HomePage>
      <div className="container placeorder">
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="row">
          <div className="col-md-7">
            <div className="general">
              <h3>Địa chỉ nhận hàng</h3>
              <h5 className="font-weight-bold">{shipping.full_name}</h5>
              <div>(+84) {String(shipping.phone_number).slice(1)}</div>
              <div>{shipping.text}</div>
              <div>{wards[wardIndex].name}</div>
              <div>{districts[districtIndex].name}</div>
              <div>{provinces[provinceIndex].name}</div>
            </div>
            <div className="general">
              <h3>Phương thức thanh toán</h3>
              <h5 className="font-weight-bold">
                {payment.paymentMethod === 'cash'
                  ? 'Tiền mặt'
                  : 'Chuyển khoản ngân hàng'}
              </h5>
              {payment.paymentMethod === 'online' ? (
                <>
                  <div className="font-weight-bold">
                    Tên tài khoản : {payment.account_name}
                  </div>
                  <div>Ngân hàng : {banks[bankIndex].name}</div>
                  <div>Chi nhánh : {branches[branchIndex].name}</div>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="general cart-place">
              <h3>Sản phẩm</h3>
              <div>
                <Row>
                  {cartItems.map((item) => (
                    <>
                      <Col span={6}>
                        <Avatar
                          size={80}
                          src={item.product_id.thumbnail}
                          shape="square"
                        />
                        {/* <img
                          src={item.product_id.thumbnail}
                          alt={item.product_id ? item.product_id.pure_name : ''}
                          width={150}
                        /> */}
                      </Col>
                      <Col style={{ margin: '10px 0' }} span={18}>
                        <div>
                          Tên sản phẩm:{' '}
                          <span className="font-weight-bold">
                            {item.product_id.name}
                          </span>
                        </div>
                        {/* <div className='img'>
                      <img
                        src={item.product_id.thumbnail}
                        alt={item.product_id ? item.product_id.pure_name : ''}
                      />
                    </div> */}
                        <div>
                          Số lượng:{' '}
                          <span className="font-weight-bold">
                            {item.quantity}
                          </span>
                        </div>
                        <div>
                          Size:{' '}
                          <span className="font-weight-bold">{item.size}</span>
                        </div>
                        <div>
                          Đơn giá:{' '}
                          <span className="font-weight-bold">
                            {utils.vndFormat(item.product_id.price)}
                          </span>
                        </div>
                      </Col>
                    </>
                  ))}
                </Row>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <form className="order" onSubmit={submitHandler}>
              <button type="submit">Đặt hàng</button>
              {/* <h3>Tổng tiền</h3> */}
              <p>Tổng tiền hàng : {utils.vndFormat(itemsPrice)}</p>
              <p>Phí vận chuyển : {utils.vndFormat(shippingPrice)}</p>
              <p>Tiền thuế : {utils.vndFormat(taxPrice)}</p>
              {/* <h1 className=' rounded badge-dark'> */}
              <h1> Thành tiền : {utils.vndFormat(totalPrice)}</h1>
            </form>
          </div>
        </div>
      </div>
    </HomePage>
  );
}

export default PlaceOrderScreen;
