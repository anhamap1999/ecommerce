import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles.css';
const SlideBarAdmin = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const location = useLocation();
  const isAdmin = userInfo && userInfo.user ? userInfo.user.isAdmin : false;
  return (
    <div
      className=' border-right'
      style={{ width: '250px' }}
      id='sidebar-wrapper'
    >
      <div className='list-group list-group-flush'>
        <Link
          to='/admin/products'
          className={`list-group-item list-group-item-action bg-light ${
            location.pathname.includes('products') ? 'bg-light-focus' : ''
          }`}
        >
          Sản phẩm{' '}
        </Link>
        <Link
          to='/admin/customer'
          className={`list-group-item list-group-item-action bg-light ${
            location.pathname.includes('customer') ? 'bg-light-focus' : ''
          }`}
        >
          Khách hàng{' '}
        </Link>
        {isAdmin ? (
        <Link
          to='/admin/staff'
          className={`list-group-item list-group-item-action bg-light ${
            location.pathname.includes('staff') ? 'bg-light-focus' : ''
          }`}
        >
          Nhân viên{' '}
        </Link>
        ) : null}
        {isAdmin ? (
        <Link
          to='/admin/category'
          className={`list-group-item list-group-item-action bg-light ${
            location.pathname.includes('category') ? 'bg-light-focus' : ''
          }`}
        >
          Danh Mục{' '}
        </Link>
        ) : null}
        <Link
          to='/admin/orders'
          className={`list-group-item list-group-item-action bg-light ${
            location.pathname.includes('orders') ? 'bg-light-focus' : ''
          }`}
        >
          Đơn hàng{' '}
        </Link>
        {isAdmin ? (
        <Link
          to='/admin/rule'
          className={`list-group-item list-group-item-action bg-light ${
            location.pathname.includes('rule') ? 'bg-light-focus' : ''
          }`}
        >
          Quy Định
        </Link>
        ) : null}
        <Link
          to='/admin/storage'
          className={`list-group-item list-group-item-action bg-light ${
            location.pathname.includes('storage') ? 'bg-light-focus' : ''
          }`}
        >
          Quản lí kho
        </Link>
      </div>
    </div>
  );
};

export default SlideBarAdmin;
