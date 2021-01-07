import React  from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
const SlideBarAdmin = () => {
    
    return  <div className="bg-light border-right" style={{width :'250px'}} id="sidebar-wrapper">            
                    <div class="list-group list-group-flush">
                    <Link to='/admin/products' class="list-group-item list-group-item-action bg-light" >Sản phẩm </Link>
                        <Link to='/admin/customer' class="list-group-item list-group-item-action bg-light" >Khách hàng </Link>
                        <Link to='/admin/staff' class="list-group-item list-group-item-action bg-light" >Nhân viên </Link>
                        <Link to='/admin/category' class="list-group-item list-group-item-action bg-light" >Danh Mục </Link>
                        <Link to='/admin/orders' class="list-group-item list-group-item-action bg-light" >Đơn hàng </Link>
                        <Link to='/admin/rule' class="list-group-item list-group-item-action bg-light" >Quy Định</Link>
                    </div>
                </div>

}

export default SlideBarAdmin ;