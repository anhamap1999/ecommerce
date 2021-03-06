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
  PRODUCT_NEW_LIST_FAIL,
  PRODUCT_NEW_LIST_REQUEST,
  PRODUCT_NEW_LIST_SUCCESS,
  PRODUCT_LIKE_FAIL,
  PRODUCT_LIKE_REQUEST,
  PRODUCT_LIKE_SUCCESS,
  CHANGE_FIELDS,
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_ADMIN_LIST_FAIL,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  CHANGE_SEARCH_FIELDS,
  CHANGE_ADD_PRODUCT_FIELDS,
  CHANGE_ADMIN_PRODUCT_FIELDS,
  PRODUCT_UPDATE_STATES_REQUEST,
  PRODUCT_UPDATE_STATES_SUCCESS,
  PRODUCT_UPDATE_STATES_FAIL,
} from '../constants/productConstants';
import _ from 'lodash';

function productListReducer(state = { products: [], query: {} }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [], error: null };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        totalPage: action.payload.total_page,
        total: action.payload.total,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
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
// function productListAdminReducer(
//   state = { products: [], query: { limit: 30, page: 1, status: '' } },
//   action
// ) {
//   switch (action.type) {
//     case PRODUCT_ADMIN_LIST_REQUEST:
//       return { ...state, loading: true, products: [], error: null };
//     case PRODUCT_ADMIN_LIST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         products: action.payload.data,
//         totalPage: action.payload.total_page,
//         total: action.payload.total,
//       };
//     case PRODUCT_ADMIN_LIST_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     case CHANGE_ADMIN_GET_PRODUCT_FIELDS: {
//       for (const key in action.payload) {
//         _.set(state, key, action.payload[key]);
//       }
//       return { ...state };
//     }
//     default:
//       return state;
//   }
// }
function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, error: null };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIKE_REQUEST:
      return { ...state, updateLoading: true, error: null };
    case PRODUCT_LIKE_SUCCESS:
      return { ...state, updateLoading: false, product: action.payload };
    case PRODUCT_LIKE_FAIL:
      return { ...state, updateLoading: false, error: action.payload };
    default:
      return state;
  }
}
// function productAddReducer(
//   state = { product: {}, modalVisible: false, loading: false },
//   action
// ) {
//   switch (action.type) {
//     case PRODUCT_ADD_REQUEST:
//       return { ...state, loading: true, error: null };
//     case PRODUCT_ADD_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         success: true,
//         product: action.payload,
//       };
//     case PRODUCT_ADD_FAIL:
//       return { ...state, loading: false, error: action.payload };

//     case CHANGE_ADD_PRODUCT_FIELDS: {
//       for (const key in action.payload) {
//         _.set(state, key, action.payload[key]);
//       }
//       return { ...state };
//     }
//     default:
//       return state;
//   }
// }
function productRemoveReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_REMOVE_REQUEST:
      return { loading: true, error: null };
    case PRODUCT_REMOVE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productNewListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_NEW_LIST_REQUEST:
      return { loading: true, products: [], error: null };
    case PRODUCT_NEW_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.data,
        totalPage: action.payload.total_page,
        total: action.payload.total,
      };
    case PRODUCT_NEW_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function searchProductReducer(
  state = { query: { limit: 30, page: 1 }, products: [] },
  action
) {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return { ...state, loading: true, products: [], error: null };
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        totalPage: action.payload.total_page,
        total: action.payload.total,
      };
    case SEARCH_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CHANGE_SEARCH_FIELDS: {
      for (const key in action.payload) {
        _.set(state, key, action.payload[key]);
      }
      return { ...state };
    }
    default:
      return state;
  }
}

function productReducer(
  state = {
    query: { limit: 30, page: 1 },
    products: [],
    product: {},
    loading: false,
    modalVisible: false,
    updatingIndex: -1,
    total: 0,
    newProducts: [],
  },
  action
) {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
      return { ...state, loading: true, error: null };
    case PRODUCT_ADD_SUCCESS: {
      const index = state.products.length
        ? state.products.findIndex((i) => i._id === action.payload.data._id)
        : -1;
      let list = state.products;
      if (index >= 0) {
        list[index] = [...list[index], ...action.payload];
      } else if (state.products.length > state.limit) {
        list = state.products.pop();
        list = [action.payload, ...list]
      } else {
        list = state.products;
      }
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
        products: [...list],
      };
    }
    case PRODUCT_ADD_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CHANGE_ADMIN_PRODUCT_FIELDS: {
      for (const key in action.payload) {
        _.set(state, key, action.payload[key]);
      }
      return { ...state };
    }
    // case PRODUCT_REMOVE_REQUEST:
    //   return { ...state, loading: true, error: null };
    // case PRODUCT_REMOVE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     success: true,
    //     product: action.payload,
    //   };
    // case PRODUCT_REMOVE_FAIL:
    //   return { ...state, loading: false, error: action.payload };

    case PRODUCT_ADMIN_LIST_REQUEST:
      return { ...state, loading: true, products: [], error: null };
    case PRODUCT_ADMIN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        total: action.payload.total,
      };
    case PRODUCT_ADMIN_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_UPDATE_STATES_REQUEST:
      return { ...state, loading: true, error: null };
    case PRODUCT_UPDATE_STATES_SUCCESS: {
      const index = state.products.length
        ? state.products.findIndex((i) => i._id === action.payload.data._id)
        : -1;
      let list = state.products;
      if (index >= 0) {
        list[index] = [...list[index], ...action.payload];
      }
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
        products: [...list],
      };
    }
    case PRODUCT_UPDATE_STATES_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export {
  productListReducer,
  productDetailsReducer,
  // productAddReducer,
  productRemoveReducer,
  productNewListReducer,
  // productListAdminReducer,
  searchProductReducer,
  productReducer,
};
