import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserInfoAdmin } from '../../actions/userActions';
import DashboardScreen from '../dashboard';
const StaffAdminScreen= (props) => {
   const getUserAdmin = useSelector(state => state.getUserAdmin)
   const { users ,loading , error } = getUserAdmin;
   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo} = userSignin;

   const dispatch = useDispatch()
   useEffect(() => {
       dispatch(getUserInfoAdmin())
       return () => {
          
       }
   }, []);
    return <DashboardScreen > 
               
                
               <div className="maine">
                    <h3>
                   Nhân viên
                    </h3>
             
                </div>
                { 
                loading ?   <div className="spinner-border text-primary" role="status">
                                <span className="sr-only"></span>
                             </div> :
                error ? <div className="">{error}</div> :
                userInfo && userInfo.user && userInfo.user.role == 'admin' ? <div className="list-product-add  " >
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Tên Nhân Viên</th>
                        <th scope="col">Chức năng</th>
                        <th scope="col">Điện thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Tùy chỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                          users &&   users.map(
                              ( user) =>user.role =='staff' &&
                               
                                <tr>
                                <td>{user.full_name ? user.full_name : 
                                    <p className="text-primary">
                                    chưa cập nhật   
                                    </p>}
                                </td>
                                <td>{user.role}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.email}</td>
                                <td>{user.status}</td>
                                <td>
                                    <button className="btn btn-danger" >Sửa</button>
                                </td>
                               </tr>
                            )
                              
                       }
                    </tbody>
                    </table>
      </div> 
        :
        <div> bạn không có quyền truy cập vào trang này</div>
               
                }
           
        </DashboardScreen>     
}

export default StaffAdminScreen;