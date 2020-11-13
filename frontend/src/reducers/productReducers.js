import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_REMOVE_REQUEST,
  PRODUCT_REMOVE_SUCCESS,
  PRODUCT_REMOVE_FAIL,
} from '../constants/productConstants';
function productListReducer(state = { products: [] }, action) {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, products : [] };
      case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
function productDetailsReducer(state = { product : {} }, action) {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { loading: true };
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  function productAddReducer(state = { product : {} }, action) {
    switch (action.type) {
      case PRODUCT_ADD_REQUEST:
        return { loading: true };
      case PRODUCT_ADD_SUCCESS:
        return { loading : false, success: true , product: action.payload };
      case PRODUCT_ADD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  function productRemoveReducer(state = { product : {} }, action) {
    switch (action.type) {
      case PRODUCT_REMOVE_REQUEST:
        return { loading: true };
      case PRODUCT_REMOVE_SUCCESS:
        return { loading : false, success: true , product: action.payload };
      case PRODUCT_REMOVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  export { productListReducer,productDetailsReducer,productAddReducer,productRemoveReducer};