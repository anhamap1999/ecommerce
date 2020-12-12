import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import HomePage from '../../pages/homepage';
const style = {
    width: '100%',
    marginTop :'20px'
}
const styleA ={
    background : '#eee',
    color: 'black',
    display: 'block',
    padding: '12px',
    textDecoration: 'none'
}
export default function SlideBarProfile({userInfo}) {
 
  return <div style={style}>
    
    <Link  to='/profile/user' style={styleA}>Thông Tin Tài Khoản</Link>
    <Link  to='/profile/order' style={styleA}>Đơn hàng</Link>
    <Link to='/profile/payment' style={styleA}>Tài khoản thanh toán</Link>
</div>
}



