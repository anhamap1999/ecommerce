const {
  GET_LIST_BANK_REQUEST,
  GET_LIST_BANK_SUCCESS,
  GET_LIST_BANK_FAIL,
} = require('../constants/bankConstant');

function getBankAccountReducer(state = { banks: [] }, action) {
  switch (action.type) {
    case GET_LIST_BANK_REQUEST:
      return { loading: true, banks: [] };
    case GET_LIST_BANK_SUCCESS:
      return { loading: false, banks: action.payload };
    case GET_LIST_BANK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
export { getBankAccountReducer };
