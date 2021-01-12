import React  from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
const SlideBarAdmin = () => {
    
    return  <div className=" border-right" style={{width :'250px'}} id="sidebar-wrapper">            
                    <div className="list-group list-group-flush">
                    <Link to='/admin/products' className="list-group-item list-group-item-action bg-light" >Sản phẩm </Link>
                        <Link to='/admin/customer' className="list-group-item list-group-item-action bg-light" >Khách hàng </Link>
                        <Link to='/admin/staff' className="list-group-item list-group-item-action bg-light" >Nhân viên </Link>
                        <Link to='/admin/category' className="list-group-item list-group-item-action bg-light" >Danh Mục </Link>
                        <Link to='/admin/orders' className="list-group-item list-group-item-action bg-light" >Đơn hàng </Link>
                        <Link to='/admin/rule' className="list-group-item list-group-item-action bg-light" >Quy Định</Link>
                        <Link to='/admin/storage' className="list-group-item list-group-item-action bg-light" >Quản lí kho</Link>
                 </div>
        </div>

}

export default SlideBarAdmin ;