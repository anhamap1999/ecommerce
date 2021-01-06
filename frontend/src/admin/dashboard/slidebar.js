import React  from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
const SlideBarAdmin = () => {
    
    return  <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">
                        <h3>Quản trị Website</h3>
                    </div>
                    <div class="list-group list-group-flush">
                        <Link to='/admin/customer' class="list-group-item list-group-item-action bg-light" >Khách hàng </Link>
                        <Link to='/admin/products' class="list-group-item list-group-item-action bg-light" >Sản phẩm </Link>
                        <Link to='/admin/orders' class="list-group-item list-group-item-action bg-light" >Đơn hàng </Link>
                        
                    </div>
                </div>

}

export default SlideBarAdmin ;