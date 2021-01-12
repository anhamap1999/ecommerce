const {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  GET_FULL_INFO_REQUEST,
  GET_FULL_INFO_SUCCESS,
  GET_FULL_INFO_FAIL,
  GET_USER_INFO_ADMIN_REQUEST,
  GET_USER_INFO_ADMIN_SUCCESS,
  GET_USER_INFO_ADMIN_FAIL,
<<<<<<< HEAD
  UPDATE_INFO_REQUEST,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAIL,
  CHANGE_PWD_REQUEST,
  CHANGE_PWD_SUCCESS,
  CHANGE_PWD_FAIL,
=======
  CHANGE_USER_INFO_FIELDS,
  UPDATE_INFO_REQUEST,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAIL,
>>>>>>> 27b97d330f2021028a9c159cc7c165d1796dca35
} = require('../constants/userConstants');
const _ = require('lodash');
function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, error: null };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function getFullInfoReducer(state = {}, action) {
  switch (action.type) {
    case GET_FULL_INFO_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_FULL_INFO_SUCCESS:
      return { ...state, loading: false, userFullInfo: action.payload };
    case GET_FULL_INFO_FAIL:
<<<<<<< HEAD
      return { loading: false, error: action.payload };
      
    case UPDATE_INFO_REQUEST :
      return { loading: true, users: [] };
    case UPDATE_INFO_SUCCESS :
      return { ...state, loading: false, users:  action.payload }
    case UPDATE_INFO_FAIL :
      return { loading: false, error: action.payload };
    
    case CHANGE_PWD_REQUEST :
      return { loading: true, users: [] };
    case CHANGE_PWD_SUCCESS :
      return { ...state, loading: false, users:  action.payload }
    case CHANGE_PWD_FAIL :
      return { loading: false, error: action.payload };
=======
      return { ...state, loading: false, error: action.payload };
    case CHANGE_USER_INFO_FIELDS: {
      for (const key in action.payload) {
        _.set(state, key, action.payload[key]);
      }

      return { ...state };
    }
    case UPDATE_INFO_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userFullInfo: { ...action.payload },
      };
    case UPDATE_INFO_FAIL:
      return { ...state, loading: false, error: action.payload };
>>>>>>> 27b97d330f2021028a9c159cc7c165d1796dca35
    default:
      return state;
  }
}
function getUserInfoAdminReducer(state = { users: [] }, action) {
  switch (action.type) {
    case GET_USER_INFO_ADMIN_REQUEST:
      return { loading: true, users: [] };
    case GET_USER_INFO_ADMIN_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_USER_INFO_ADMIN_FAIL:
      return { loading: true, users: [] };
      
    default:
      return state;
  }
}

export {
  userSigninReducer,
  userRegisterReducer,
  getFullInfoReducer,
  getUserInfoAdminReducer,
};
