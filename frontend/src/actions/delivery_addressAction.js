import axios from 'axios';
import { CREATE_ADDRESS_NEW_FAIL, CREATE_ADDRESS_NEW_REQUEST, CREATE_ADDRESS_NEW_SUCCESS } from '../constants/delivery_addressConstant';

const creareAddressNew = ({full_name,phone_number,province_number,district_number,ward_number,text}) => async (dispatch,getState) => {

    dispatch({ type: CREATE_ADDRESS_NEW_REQUEST } ); 
    try {
      const { userSignin : { userInfo } } = getState();
      const { data } = await axios.post("/api/delivery-address",{full_name,phone_number,province_number,district_number,ward_number,text},{
        headers:{
            authorization : 'Bearer ' + userInfo.data.access_token
        },
    });
      dispatch({ type: CREATE_ADDRESS_NEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_ADDRESS_NEW_FAIL, payload: error.message });
    }
  }
export {  creareAddressNew };