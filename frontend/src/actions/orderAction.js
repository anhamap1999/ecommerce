import axios from '../modules/axios';
import {
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_SAVE_FAIL,
  ORDER_SAVE_REQUEST,
  ORDER_SAVE_SUCCESS,
  ORDER_UPDATE_STATUS_FAIL,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
} from '../constants/orderConstants';
import axiosClient from '../modules/axios';
import utils from '../modules/utils';

const getListOrdersAdmin = (query) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_ADMIN_REQUEST });
    const queryString = utils.formatQuery(query);
    const { data, total } = await axiosClient.get('/api/order/admin' + queryString);

    dispatch({ type: ORDER_LIST_ADMIN_SUCCESS, payload: {data, total} });
  } catch (error) {
    dispatch({ type: ORDER_LIST_ADMIN_FAIL, payload: error.message });
  }
};
const getListOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get('/api/order');

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
};
const saveOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_SAVE_REQUEST, payload: order });
    // const { orders } = getState().ordersList;
    const { data } = await axios.post('/api/order', JSON.stringify(order));
    dispatch({ type: ORDER_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_SAVE_FAIL, payload: error.message });
  }
};

const updateStatusOrder = (order, { status }) => async (
  dispatch,
  getState
) => {
  const { _id: id } = order;
  try {
    dispatch({ type: ORDER_UPDATE_STATUS_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    let url = '';
    if (userInfo && userInfo.user && order && order.created_by && (userInfo.user._id ===  order.created_by._id)) {
      url = '/api/order/' + id;
    } else {
      url = '/api/order/admin/' + id;
    }
    const {
      data,
    } = await axiosClient.put(
      url,
      JSON.stringify({ status })
    );
    dispatch({ type: ORDER_UPDATE_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_UPDATE_STATUS_FAIL, payload: error.message });
  }
};
export { saveOrder, getListOrders, getListOrdersAdmin, updateStatusOrder };
