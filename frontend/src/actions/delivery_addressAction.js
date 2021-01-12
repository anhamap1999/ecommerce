import axios from '../modules/axios';
import { CREATE_ADDRESS_NEW_FAIL, CREATE_ADDRESS_NEW_REQUEST, CREATE_ADDRESS_NEW_SUCCESS, GET_LIST_ADDRESS_FAIL, GET_LIST_ADDRESS_REQUEST, GET_LIST_ADDRESS_SUCCESS } from '../constants/delivery_addressConstant';

const creareAddressNew = ({full_name,phone_number,province_number,district_number,ward_number,text}) => async (dispatch,getState) => {

    dispatch({ type: CREATE_ADDRESS_NEW_REQUEST } ); 
    try {
      const { addressList } = getState().listAddress;
      const { data } = await axios.post("/api/delivery-address",JSON.stringify({full_name,phone_number,province_number,district_number,ward_number,text}));
      dispatch({ type: CREATE_ADDRESS_NEW_SUCCESS, payload: [...addressList, data] });
    } catch (error) {
      dispatch({ type: CREATE_ADDRESS_NEW_FAIL, payload: error.message });
    }
  }
  const getListAddressNew = () => async (dispatch,getState) => {

    dispatch({ type: GET_LIST_ADDRESS_REQUEST } ); 
    try {
      const { userSignin : { userInfo } } = getState();
      const { data } = await axios.get("/api/delivery-address");
      dispatch({ type: GET_LIST_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_LIST_ADDRESS_FAIL, payload: error.message });
    }
  }
export {  creareAddressNew ,getListAddressNew };