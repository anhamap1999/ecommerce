import { GET_PRODUCT_CART_FAIL, GET_PRODUCT_CART_REQUEST, GET_PRODUCT_CART_SUCCESS } from "../constants/cartConstants";


function getProductCartReducer(state = { cartItems: [] }, action) {
    switch (action.type) {
      case GET_PRODUCT_CART_REQUEST:
        return { loading: true, cartItems : [] };
      case GET_PRODUCT_CART_SUCCESS:
        return { loading: false, cartItems: action.payload };
      case GET_PRODUCT_CART_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }
  export {getProductCartReducer};