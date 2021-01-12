import {
  CREATE_BANK_NEW_FAIL,
  CREATE_BANK_NEW_REQUEST,
  CREATE_BANK_NEW_SUCCESS,
  GET_BANK_FAIL,
  GET_BANK_REQUEST,
  GET_BANK_SUCCESS,
  GET_BANKS_FAIL,
  GET_BANKS_REQUEST,
  GET_BANKS_SUCCESS,
  GET_BRANCH_FAIL,
  GET_BRANCH_REQUEST,
  GET_BRANCH_SUCCESS,
} from '../constants/bankConstant';

function bankReducer(
  state = { bankAccounts: [], banks: [], branched: [] },
  action
) {
  switch (action.type) {
    case CREATE_BANK_NEW_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_BANK_NEW_SUCCESS: {
      return { ...state, loading: false, bankAccounts: action.payload };
    }
    case CREATE_BANK_NEW_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_BANK_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        bankAccounts: action.payload
      };
    case GET_BANK_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_BANKS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_BANKS_SUCCESS:
      return {
        ...state,
        loading: false,
        banks: action.payload
      };
    case GET_BANKS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_BRANCH_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_BRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        branches: action.payload
      };
    case GET_BRANCH_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
export { bankReducer };
