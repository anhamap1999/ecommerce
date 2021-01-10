import axios from '../modules/axios';
import {
  REMOVE_CATEGORY_ADMIN_REQUEST,
  REMOVE_CATEGORY_ADMIN_SUCCESS,
  REMOVE_CATEGORY_ADMIN_FAIL,
  CATEGORY_SAVE_FAIL,
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  GET_CATEGORY_ALL_FAIL,
  GET_CATEGORY_ALL_REQUEST,
  GET_CATEGORY_ALL_SUCCESS,
} from '../constants/categoryConstants';
import axiosClient from '../modules/axios';

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

const saveCategoryNew = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!category._id) {
      const { data } = await axios.post('/api/categories/admin', category);
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        '/api/categories/admin/' + category._id,
        category
      );
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
  }
};
const deleteCategoryAdmin = (categoryID) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_CATEGORY_ADMIN_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.delete('/api/categories/' + categoryID);
    dispatch({ type: REMOVE_CATEGORY_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_CATEGORY_ADMIN_FAIL, payload: error.message });
  }
};
export { saveCategoryNew, getCatogoryAll, deleteCategoryAdmin };
