import { GET_LIST_ADDRESS_FAIL, GET_LIST_ADDRESS_REQUEST, GET_LIST_ADDRESS_SUCCESS } from "../constants/delivery_addressConstant";

function addRessListReducer(state = { addressList: [] }, action) {
    switch (action.type) {
      case GET_LIST_ADDRESS_REQUEST:
        return { loading: true, addressList : [] };
      case GET_LIST_ADDRESS_SUCCESS:
        return { loading: false, addressList: action.payload };
      case GET_LIST_ADDRESS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  export { addRessListReducer }