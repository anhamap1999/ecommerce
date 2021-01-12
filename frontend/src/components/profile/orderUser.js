
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Link} from 'react-router-dom';
import ProfileScreen from './profile';

export default function OrderUserScreen(props) {
   
  return <ProfileScreen>
     
     <div style={{marginTop : '20px'}}>
          <div className="col-sm-8">
            <h4>Đơn hàng của tôi</h4>
          </div>
          <hr></hr>
     </div>
  </ProfileScreen>
  
}



