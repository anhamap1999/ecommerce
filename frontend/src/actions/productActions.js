import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_REMOVE_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_REMOVE_SUCCESS,
  PRODUCT_REMOVE_FAIL,
  PRODUCT_NEW_LIST_REQUEST,
  PRODUCT_NEW_LIST_SUCCESS,
  PRODUCT_NEW_LIST_FAIL,
} from '../constants/productConstants';
import axios from '../modules/axios';
import utils from '../modules/utils';

const listProducts = ({page, limit, ...query}) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const queryString = utils.formatQuery({ page, limit, ...query });
    const { data, total_page, total } = await axios.get(
      `/api/products${queryString}`
    );
    if (data) {
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: { data, page, total_page, total },
      });
    }
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: PRODUCT_LIST_FAIL, payload: message });
  }
};
const listNewProducts = ({page, limit, ...query}) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_NEW_LIST_REQUEST });
    const queryString = utils.formatQuery({ page, limit, ...query, sort: '-created_at' });
    const { data, total_page, total } = await axios.get(
      `/api/products${queryString}`
    );
    if (data) {
      dispatch({
        type: PRODUCT_NEW_LIST_SUCCESS,
        payload: { data, page, total_page, total },
      });
    }
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: PRODUCT_NEW_LIST_FAIL, payload: message });
  }
};
const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: message });
  }
};
const addProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADD_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();

    if (!product._id) {
      console.log('k id', userInfo);
      const { data } = await axios.post('/api/products/admin', product);
      dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
    } else {
      console.log('co id:', product._id);
      const { data } = await axios.put(
        '/api/products/' + product._id,
        product,
        {
          headers: {
            authorization: 'Bearer ' + userInfo.token,
          },
        }
      );

      dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_ADD_FAIL, payload: error.message });
  }
};
const removeProductID = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_REMOVE_REQUEST, payload: productId });
    const { data } = await axios.delete('/api/products/' + productId, {
      headers: {
        authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: PRODUCT_REMOVE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_REMOVE_FAIL, payload: error.message });
  }
};
export { listProducts, detailsProduct, addProduct, removeProductID, listNewProducts };
