import React from 'react';

function CheckoutSteps(props) {
  return (
    <div className="checkoutsteps">
      <div className={props.step1 ? 'active' : ''}>Đăng nhập</div>
      <div className={props.step2 ? 'active' : ''}>Địa chỉ</div>
      <div className={props.step3 ? 'active' : ''}>Thanh toán</div>
      <div className={props.step4 ? 'active' : ''}>Đặt hàng</div>
    </div>
  );
}

export default CheckoutSteps;
