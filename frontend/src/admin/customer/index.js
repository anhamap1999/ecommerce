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
            <div className="maine">Khách hàng</div>
            { loading ?<div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div> :
                           error ? <div className="">loading</div> :
            <CustomerAdminInfo usersData ={ users.data } />
            }
        </DashboardScreen>     
}

export default CustomerAdminScreen ;