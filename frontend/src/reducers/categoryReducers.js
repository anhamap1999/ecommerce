const {
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_FAIL,
  GET_CATEGORY_ALL_REQUEST,
  GET_CATEGORY_ALL_SUCCESS,
  GET_CATEGORY_ALL_FAIL,
  GET_CATEGORY_ADMIN_REQUEST,
  GET_CATEGORY_ADMIN_SUCCESS,
  GET_CATEGORY_ADMIN_FAIL,
} = require('../constants/categoryConstants');

function getListCategoriesReducer(
  state = { categories: [], isGotten: false },
  action
) {
  switch (action.type) {
    case GET_CATEGORY_ALL_REQUEST:
      return { loading: true, categories: [], isGotten: false };
    case GET_CATEGORY_ALL_SUCCESS:
      return { loading: false, categories: action.payload, isGotten: true };
    case GET_CATEGORY_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function getCategoriesAdminReducer(
  state = { categories: [] },
  action
) {
  switch (action.type) {
    case GET_CATEGORY_ADMIN_REQUEST:
      return { ...state, loading: true, categories: [] };
    case GET_CATEGORY_ADMIN_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case GET_CATEGORY_ADMIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
}
function categorySaveReducer(state = { category: {} }, action) {
  switch (action.type) {
    case CATEGORY_SAVE_REQUEST:
      return { loadingCat: true };
    case CATEGORY_SAVE_SUCCESS:
      return { loadingCat: false, success: true, category: action.payload };
    case CATEGORY_SAVE_FAIL:
      return { loadingCat: false, errorCat: action.payload };
    default:
      return state;
  }
}
export { categorySaveReducer, getListCategoriesReducer, getCategoriesAdminReducer };
