import Axios from "../modules/axios";
import { CREATE_BANK_NEW_FAIL,GET_LIST_BANK_REQUEST, GET_LIST_BANK_FAIL,GET_LIST_BANK_SUCCESS, CREATE_BANK_NEW_REQUEST, CREATE_BANK_NEW_SUCCESS } from "../constants/bankConstant";
import axiosClient from "../modules/axios";

const createBankNew = ({ account_name,account_number,branch_number,bank_number}) => async (dispatch,getState) => {

    dispatch({ type: CREATE_BANK_NEW_REQUEST } ); 
    try {
      const { userSignin : { userInfo } } = getState();
      const { data } = await Axios.post("/api/bank-account",{ account_name,account_number,branch_number,bank_number});
      dispatch({ type: CREATE_BANK_NEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_BANK_NEW_FAIL, payload: error.message });
    }
  }
  
const getListBank = (  ) => async ( dispatch,getState  ) =>{

  try {
    
      dispatch( { type : GET_LIST_BANK_REQUEST } );
      const { userSignin : { userInfo } } = getState();
      const {data } = await axiosClient.get(`/api/bank-account`)
      dispatch( { type : GET_LIST_BANK_SUCCESS , payload : data} );

  } catch (error) {

      dispatch( { type : GET_LIST_BANK_FAIL ,payload : error.message} );
  }
}
export {
    createBankNew,getListBank
}