import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserInfoAdmin } from '../../actions/userActions';
import DashboardScreen from '../dashboard';
import CustomerAdminInfo from './customer';
const CustomerAdminScreen = (props) => {
   const getUserAdmin = useSelector(state => state.getUserAdmin)
   const { users ,loading , error } = getUserAdmin;
   const dispatch = useDispatch()
   useEffect(() => {
       dispatch(getUserInfoAdmin())
       return () => {
          
       }
   }, []);
    return <DashboardScreen > 
            <div className="maine">
            <h3>
            Khách hàng
            </h3>
        
        </div>
            { 
            loading ?   <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                         </div> :
            error ? <div className="">{error}</div> :
            <CustomerAdminInfo usersData ={ users } />
            }
        </DashboardScreen>     
}

export default CustomerAdminScreen ;