import {
  DELETE_PRODUCT_CART_FAIL,
  DELETE_PRODUCT_CART_REQUEST,
  DELETE_PRODUCT_CART_SUCCESS,
  GET_PRODUCT_CART_FAIL,
  GET_PRODUCT_CART_REQUEST,
  GET_PRODUCT_CART_SUCCESS,
  SAVE_PRODUCT_CART_FAIL,
  SAVE_PRODUCT_CART_REQUEST,
  SAVE_PRODUCT_CART_SUCCESS,
  UPDATE_PRODUCT_CART_FAIL,
  UPDATE_PRODUCT_CART_REQUEST,
  UPDATE_PRODUCT_CART_SUCCESS,
} from '../constants/cartConstants';
import Cookie from 'js-cookie';
import axiosClient from '../modules/axios';
const saveProductCart = ({ price, quantity, product_id, size }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: SAVE_PRODUCT_CART_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axiosClient.post(
      '/api/cart',
      JSON.stringify({ price, quantity, product_id, size })
    );
    dispatch({ type: SAVE_PRODUCT_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SAVE_PRODUCT_CART_FAIL, payload: error.message });
  }
};
const getProductCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PRODUCT_CART_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axiosClient.get(`/api/cart`);
    dispatch({ type: GET_PRODUCT_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_CART_FAIL, payload: error.message });
  }
};
const updateProductCart = (cartId) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_CART_REQUEST, payload: cartId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axiosClient.put(`/api/cart/${cartId}`);
    dispatch({ type: UPDATE_PRODUCT_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_CART_FAIL, payload: error.message });
  }
};
const deleteProductCart = (cartId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_CART_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axiosClient.delete(`/api/cart/${cartId}`);
    dispatch({ type: DELETE_PRODUCT_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_CART_FAIL, payload: error.message });
  }
};
export {
  saveProductCart,
  getProductCart,
  deleteProductCart,
  updateProductCart,
};
