import React from 'react';
const CustomerAdminInfo = ( {usersData})  => {
    
    return  <div className="">
             <div className="list-product-add  " >
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Tên Khách hàng</th>
                        <th scope="col">Chức năng</th>
                        <th scope="col">Điện thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Tùy chỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           usersData &&  usersData.map(
                               user => <tr>
                                <th scope="col">{user.full_name ? user.full_name : 
                                    <p className="text-primary">
                                    chưa cập nhật   
                                    </p>}
                                </th>
                                <th scope="col">{user.role}</th>
                                <th scope="col">{user.phone_number}</th>
                                <th scope="col">{user.email}</th>
                                <th scope="col">{user.status}</th>
                                <th scope="col">
                                    <button className="btn btn-danger" >Sửa</button>
                                </th>
                               </tr>
                            )
                       }
                    </tbody>
                    </table>
      </div> 
    </div>
}

export default CustomerAdminInfo ;