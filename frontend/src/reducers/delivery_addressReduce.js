import {
  GET_LIST_ADDRESS_FAIL,
  GET_LIST_ADDRESS_REQUEST,
  GET_LIST_ADDRESS_SUCCESS,
  CREATE_ADDRESS_NEW_REQUEST,
  CREATE_ADDRESS_NEW_SUCCESS,
  CREATE_ADDRESS_NEW_FAIL,
} from '../constants/delivery_addressConstant';

function addRessListReducer(state = { addressList: [] }, action) {
  switch (action.type) {
    case GET_LIST_ADDRESS_REQUEST:
      return { ...state, loading: true, addressList: [], error: null };
    case GET_LIST_ADDRESS_SUCCESS:
      return { ...state, loading: false, addressList: action.payload };
    case GET_LIST_ADDRESS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_ADDRESS_NEW_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_ADDRESS_NEW_SUCCESS:
      return { ...state, loading: false, addressList: action.payload };
    case CREATE_ADDRESS_NEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export { addRessListReducer };
