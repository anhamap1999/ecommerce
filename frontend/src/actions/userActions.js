import axios from '../modules/axios';
import Cookies from 'js-cookie';
import Cookie from 'js-cookie';
import {CHANGE_PWD_FAIL, CHANGE_PWD_REQUEST, CHANGE_PWD_SUCCESS, GET_FULL_INFO_FAIL, GET_FULL_INFO_REQUEST, GET_FULL_INFO_SUCCESS, GET_USER_INFO_ADMIN_FAIL, GET_USER_INFO_ADMIN_REQUEST, GET_USER_INFO_ADMIN_SUCCESS, UPDATE_INFO_FAIL, UPDATE_INFO_REQUEST, UPDATE_INFO_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from '../constants/userConstants';

const signin = (userName, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { userName, password } });
    
    try {
      if(isNaN(userName))
        {
          const email = userName;
          const { data } = await axios.post("/api/auth/login-by-email", { email, password });
          dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
          localStorage.setItem('userInfo', JSON.stringify(data)  );
        }
        else
        {
          const phone_number = userName;         
       
          const { data } = await axios.post("/api/auth/login-by-phone", { phone_number, password });
          dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
          localStorage.setItem('userInfo', JSON.stringify(data)  );
          
        
        };                          
      
        
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
  }
  const getFullInfoUser = () => async (dispatch,getState) => {

    dispatch({ type: GET_FULL_INFO_REQUEST } ); 
    try {
      const { userSignin : { userInfo } } = getState();
      const { data } = await axios.get("/api/users");
      dispatch({ type: GET_FULL_INFO_SUCCESS, payload: data });
      Cookie.set('userFullInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: GET_FULL_INFO_FAIL, payload: error.message });
    }
  }
  
  const getUserInfoAdmin = () => async (dispatch,getState) => {

    
    try {
      dispatch({ type: GET_USER_INFO_ADMIN_REQUEST } ); 
      const { userSignin : { userInfo } } = getState();
      const { data } = await axios.get("/api/users/admin");
      dispatch({ type: GET_USER_INFO_ADMIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USER_INFO_ADMIN_FAIL, payload: error.message });
    }
  }
  const register = (phone_number, email, password,confirm_password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { phone_number, email, password } });
    try {
      const { data } = await axios.post("/api/users/register", { phone_number ,email, password ,confirm_password});
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      // Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  }
  const updateInfoUser = (full_name,gender,birthday) => async (dispatch,getState) => {
    dispatch({ type: UPDATE_INFO_REQUEST, payload: { updateInfoUser } });
    try {
      const { userSignin : { userInfo } } = getState();
 
      const { data } = await axios.put("/api/users/update", { full_name, gender, birthday });
      dispatch({ type: UPDATE_INFO_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: UPDATE_INFO_FAIL, payload: error.message });
    }
  }

const changePwd = (new_password,confirm_new_password) => async( dispatch, getState )=>{
  dispatch({ type: CHANGE_PWD_REQUEST, payload: { updateInfoUser } });
  try {
    const { userSignin : { userInfo } } = getState();

    const { data } = await axios.post("/api/users/change-password"  , { new_password, confirm_new_password });
    dispatch({ type: CHANGE_PWD_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: CHANGE_PWD_FAIL, payload: error.message });
  }
} ;
export { signin ,getUserInfoAdmin, register, updateInfoUser, getFullInfoUser, changePwd  };