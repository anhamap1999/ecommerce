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
  PRODUCT_LIKE_REQUEST,
  PRODUCT_LIKE_SUCCESS,
  PRODUCT_LIKE_FAIL,
  CHANGE_FIELDS,
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_ADMIN_LIST_FAIL,
  PRODUCT_UPDATE_STATES_REQUEST,
  PRODUCT_UPDATE_STATES_SUCCESS,
  PRODUCT_UPDATE_STATES_FAIL,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  CHANGE_SEARCH_FIELDS,
  CHANGE_ADD_PRODUCT_FIELDS,
  CHANGE_ADMIN_PRODUCT_FIELDS
} from '../constants/productConstants';
import axiosClient from '../modules/axios';
import axios from '../modules/axios';
import utils from '../modules/utils';

const changeFields = (object) => async (dispatch) => {
  dispatch({
    type: CHANGE_FIELDS,
    payload: object,
  });
};
const listProducts = ({ page, limit, ...query }) => async (dispatch) => {
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
const listProductsAdmin = ({ page, limit, ...query }) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ADMIN_LIST_REQUEST });
    const queryString = utils.formatQuery({ page, limit, ...query });
    const { data, total_page, total } = await axios.get(`/api/products/admin`);
    if (data) {
      dispatch({
        type: PRODUCT_ADMIN_LIST_SUCCESS,
        payload: { data, page, total_page, total },
      });
    }
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: PRODUCT_ADMIN_LIST_FAIL, payload: message });
  }
};
const listNewProducts = ({ page, limit, ...query }) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_NEW_LIST_REQUEST });
    const queryString = utils.formatQuery({
      page,
      limit,
      ...query,
      sort: '-created_at',
    });
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
const updateStateProduct = (productId, { status }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_STATES_REQUEST });
    const {
      data,
    } = await axiosClient.put(
      '/api/products/admin/update-status/' + productId,
      { status }
    );
    dispatch({ type: PRODUCT_UPDATE_STATES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_STATES_FAIL, payload: error.message });
  }
};
const addProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADD_REQUEST, payload: product });

    if (!product._id) {
      const { data } = await axiosClient.post(
        '/api/products/admin',
        JSON.stringify(product)
      );
      dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put('/api/products/' + product._id,
      JSON.stringify(product));

      dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_ADD_FAIL, payload: error.message });
  }
};

const changeAddProductFields = (object) => async (dispatch) => {
  dispatch({
    type: CHANGE_ADD_PRODUCT_FIELDS,
    payload: object,
  });
};
const removeProductID = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REMOVE_REQUEST, payload: productId });
    const { data } = await axios.delete('/api/products/' + productId);
    dispatch({ type: PRODUCT_REMOVE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_REMOVE_FAIL, payload: error.message });
  }
};

const likeProduct = (product_id, state) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIKE_REQUEST, error: null });
    const { data } = await axios.put(
      '/api/products/like-product',
      JSON.stringify({ id: product_id, state })
    );
    dispatch({ type: PRODUCT_LIKE_SUCCESS, payload: data });
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: PRODUCT_LIKE_FAIL, payload: message });
  }
};
const searchProducts = ({ page, limit, ...query }) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PRODUCT_REQUEST });
    const queryString = utils.formatQuery({ page, limit, ...query });
    const { data, total_page, total } = await axios.get(
      `/api/search${queryString}`
    );
    if (data) {
      dispatch({
        type: SEARCH_PRODUCT_SUCCESS,
        payload: { data, page, total_page, total },
      });
    }
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: SEARCH_PRODUCT_FAIL, payload: message });
  }
};
const changeSearchFields = (object) => async (dispatch) => {
  dispatch({
    type: CHANGE_SEARCH_FIELDS,
    payload: object,
  });
};
const changeAdminProductFields = (object) => async (dispatch) => {
  dispatch({
    type: CHANGE_ADMIN_PRODUCT_FIELDS,
    payload: object,
  });
};
export {
  listProducts,
  detailsProduct,
  addProduct,
  removeProductID,
  listNewProducts,
  changeFields,
  likeProduct,
  listProductsAdmin,
  updateStateProduct,
  searchProducts,
  changeSearchFields,
  changeAddProductFields,
  changeAdminProductFields
};
