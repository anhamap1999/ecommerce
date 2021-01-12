import {
  GET_PRODUCT_CART_FAIL,
  GET_PRODUCT_CART_REQUEST,
  GET_PRODUCT_CART_SUCCESS,
  UPDATE_PRODUCT_CART_FAIL,
  UPDATE_PRODUCT_CART_REQUEST,
  UPDATE_PRODUCT_CART_SUCCESS,
  DELETE_PRODUCT_CART_FAIL,
  DELETE_PRODUCT_CART_REQUEST,
  DELETE_PRODUCT_CART_SUCCESS,
  CHANGE_FIELDS
} from '../constants/cartConstants';
import _ from 'lodash';

function getProductCartReducer(state = { cartItems: [], shipping: {}, payment: {}, isGotten: false }, action) {
  switch (action.type) {
    case GET_PRODUCT_CART_REQUEST:
      return { ...state, loading: true, cartItems: [], error: null };
    case GET_PRODUCT_CART_SUCCESS:
      return { ...state, loading: false, cartItems: action.payload };
    case GET_PRODUCT_CART_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PRODUCT_CART_REQUEST:
      return { ...state, loadingUpdate: true, error: null, updatingId: action.payload };
    case UPDATE_PRODUCT_CART_SUCCESS:
      return { ...state, loadingUpdate: false, cartItems: action.payload, updatingId: -1 };
    case UPDATE_PRODUCT_CART_FAIL:
      return { ...state, loadingUpdate: false, error: action.payload, updatingId: -1 };

    case DELETE_PRODUCT_CART_REQUEST:
      return { ...state, loadingUpdate: true, error: null, updatingId: action.payload };
    case DELETE_PRODUCT_CART_SUCCESS:
      return { ...state, loadingUpdate: false, cartItems: action.payload, updatingId: -1 };
    case DELETE_PRODUCT_CART_FAIL:
      return { ...state, loadingUpdate: false, error: action.payload, updatingId: -1 };

    case CHANGE_FIELDS: {
      for (const key in action.payload) {
        _.set(state, key, action.payload[key]);
      }
      return { ...state };
    }
    default:
      return state;
  }
}
export { getProductCartReducer };
