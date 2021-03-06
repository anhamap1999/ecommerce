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

function orderSaveReducer(state = { order: [] }, action) {
  switch (action.type) {
    case ORDER_SAVE_REQUEST:
      return { ...state, loading: true, error: null };
    case ORDER_SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_SAVE_FAIL:
      return { ...state, loading: false, error: action.payload };

      case ORDER_UPDATE_STATUS_REQUEST:
        return { ...state, loadingUpdating: true, error: null };
      case ORDER_UPDATE_STATUS_SUCCESS:
        return {
          ...state,
          loadingUpdating: false,
          success: true,
          order: action.payload,
        };
      case ORDER_UPDATE_STATUS_FAIL:
        return { ...state, loadingUpdating: false, error: action.payload };
    default:
      return state;
  }
}

function orderListAdminReducer(state = { orders: [], query: {} }, action) {
  switch (action.type) {
    case ORDER_LIST_ADMIN_REQUEST:
      return { ...state, loading: true, orders: [], error: null };
    case ORDER_LIST_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.data,
        totalPage: action.payload.total_page,
        total: action.payload.total,
      };
    case ORDER_LIST_ADMIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
function ordersListReducer(state = { orders: [] }, action) {
  switch (action.type) {

    case ORDER_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export { orderSaveReducer, ordersListReducer, orderListAdminReducer };
