import axios from '../modules/axios';
import {
  UPDATE_STATUS_CATEGORY_REQUEST,
  UPDATE_STATUS_CATEGORY_SUCCESS,
  UPDATE_STATUS_CATEGORY_FAIL,
  CATEGORY_SAVE_FAIL,
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  GET_CATEGORY_ALL_FAIL,
  GET_CATEGORY_ALL_REQUEST,
  GET_CATEGORY_ALL_SUCCESS,
  GET_CATEGORY_ADMIN_FAIL,
  GET_CATEGORY_ADMIN_REQUEST,
  GET_CATEGORY_ADMIN_SUCCESS,
} from '../constants/categoryConstants';
import axiosClient from '../modules/axios';
import utils from '../modules/utils';

const getCatogoryAll = () => async (dispatch, getState) => {
  try {
    const { isGotten, categories } = getState().listCategories;
    if (isGotten) {
      return categories;
    }
    dispatch({ type: GET_CATEGORY_ALL_REQUEST });
    const { data } = await axiosClient.get('/api/categories');

    dispatch({ type: GET_CATEGORY_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CATEGORY_ALL_FAIL, payload: error.message });
  }
};

const getCatogoryAdmin = (query) => async (dispatch, getState) => {
  try {
    // const { categories } = getState().listCategories;
    dispatch({ type: GET_CATEGORY_ADMIN_REQUEST });
    const queryString = utils.formatQuery(query);
    const { data } = await axiosClient.get('/api/categories/admin' + queryString);

    dispatch({ type: GET_CATEGORY_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CATEGORY_ADMIN_FAIL, payload: error.message });
  }
};

const saveCategoryNew = ({id, ...category}) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!id) {
      const { data } = await axios.post('/api/categories/admin', JSON.stringify(category));
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        '/api/categories/admin/' + id,
        JSON.stringify(category)
      );
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
  }
};
const updateStatusCategory = (categoryID, status) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_STATUS_CATEGORY_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.put(
      '/api/categories/admin/update-status/' + categoryID,
      JSON.stringify({ status })
    );
    dispatch({ type: UPDATE_STATUS_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_STATUS_CATEGORY_FAIL, payload: error.message });
  }
};
export { saveCategoryNew, getCatogoryAll, updateStatusCategory, getCatogoryAdmin };
