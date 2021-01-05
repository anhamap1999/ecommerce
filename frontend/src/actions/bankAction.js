import Axios from "axios";
import { CREATE_BANK_NEW_FAIL, CREATE_BANK_NEW_REQUEST, CREATE_BANK_NEW_SUCCESS } from "../constants/bankConstant";

const createBankNew = ({ account_name,account_number,bank,branch,province_number}) => async (dispatch,getState) => {

    dispatch({ type: CREATE_BANK_NEW_REQUEST } ); 
    try {
      const { userSignin : { userInfo } } = getState();
      const { data } = await Axios.post("/api/bank-account",{ account_name,account_number,bank,branch,province_number},{
        headers:{
            authorization : 'Bearer ' + userInfo.data.access_token
        },
    });
      dispatch({ type: CREATE_BANK_NEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_BANK_NEW_FAIL, payload: error.message });
    }
  }
export {
    createBankNew
}