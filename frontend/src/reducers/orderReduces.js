import { ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_SAVE_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS } from "../constants/orderConstants";

function orderSaveReducer(state = { order : [] }, action) {
    switch (action.type) {
      default:
        return state;
    }
  }
  
function ordersListReducer(state = { orders : [] }, action) {
  switch (action.type) {
    case ORDER_SAVE_REQUEST:
      return { ...state, loading: true, error: null };
    case ORDER_SAVE_SUCCESS:
      return { ...state, loading : false, success: true , orders: action.payload };
    case ORDER_SAVE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ORDER_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case ORDER_LIST_SUCCESS:
      return { ...state, loading : false, success: true , orders: action.payload };
    case ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
  export { orderSaveReducer , ordersListReducer };