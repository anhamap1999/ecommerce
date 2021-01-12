import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUserInfoAdmin } from '../../actions/userActions';
import DashboardScreen from '../dashboard';
const RuleAdminScreen= (props) => {
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
                        Quy định
                    </h3>
                </div>
           
           
        </DashboardScreen>     
}

export default RuleAdminScreen;