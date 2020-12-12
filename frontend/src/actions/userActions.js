import axios from 'axios';
import Cookie from 'js-cookie';
import {GET_FULL_INFO_FAIL, GET_FULL_INFO_REQUEST, GET_FULL_INFO_SUCCESS, UPDATE_INFO_FAIL, UPDATE_INFO_REQUEST, UPDATE_INFO_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from '../constants/userConstants';

const signin = (userName, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { userName, password } });
    
    try {
      if(isNaN(userName))
        {
          const email = userName;
          const { data } = await axios.post("/api/auth/login-by-email", { email, password });
          dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
          Cookie.set('userInfo', JSON.stringify(data));
        }
        else
        {
          const phone_number = userName;         
          const { data } = await axios.post("/api/auth/login-by-phone", { phone_number, password });
          dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
          Cookie.set('userInfo', JSON.stringify(data));
        };                          
      
      
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
  }
  const register = (phone_number, email, password,confirm_password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { phone_number, email, password } });
    try {
      const { data } = await axios.post("/api/users/register", { phone_number ,email, password ,confirm_password});
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  }
  const updateInfoUser = (full_name,gender,birthday) => async (dispatch,getState) => {
    dispatch({ type: UPDATE_INFO_REQUEST, payload: { updateInfoUser } });
    try {
      const { userSignin : { userInfo } } = getState();
 
      const { data } = await axios.put("/api/users/update", { full_name, gender, birthday },{
        headers:{
            authorization : 'Bearer ' + userInfo.data.access_token
        },
    });
      dispatch({ type: UPDATE_INFO_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: UPDATE_INFO_FAIL, payload: error.message });
    }
  }
  const getFullInfoUser = () => async (dispatch,getState) => {

    dispatch({ type: GET_FULL_INFO_REQUEST } ); 
    try {
      const { userSignin : { userInfo } } = getState();
     
      const { data } = await axios.get("/api/users",{
        headers:{
            authorization : 'Bearer ' + userInfo.data.access_token
        },
    });
      dispatch({ type: GET_FULL_INFO_SUCCESS, payload: data });
      Cookie.set('userFulInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: GET_FULL_INFO_FAIL, payload: error.message });
    }
  }
export { signin ,register,updateInfoUser,getFullInfoUser  };