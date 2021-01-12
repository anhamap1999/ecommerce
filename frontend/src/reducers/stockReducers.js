import constants from '../constants/stockConstant';
import _ from 'lodash';

function stockReducer(
  state = { stocks: [], updatingIndex: -1, query: {} },
  action
) {
  switch (action.type) {
    case constants.CHANGE_FIELDS: {
      for (const key in action.payload) {
        _.set(state, key, action.payload[key]);
      }
      return state;
    }
    case constants.CREATE_STOCK_REQUEST:
      return { ...state, loading: true, error: null };
    case constants.CREATE_STOCK_SUCCESS: {
      return { ...state, loading: false, stocks: action.payload };
    }
    case constants.CREATE_STOCK_FAIL:
      return { ...state, loading: false, error: action.payload };

    case constants.GET_STOCK_REQUEST:
      return { ...state, loading: true, stocks: [], error: null };
    case constants.GET_STOCK_SUCCESS:
      return {
        loading: false,
        stocks: action.payload.data,
        total: action.payload.total,
        totalPage: action.payload.total_page,
      };
    case constants.GET_STOCK_FAIL:
      return { ...state, loading: false, error: action.payload };

    case constants.IMPORT_STOCK_REQUEST:
      return {
        ...state, 
        updatingLoading: true,
        error: null,
        updatingIndex: action.payload,
      };
    case constants.IMPORT_STOCK_SUCCESS:
      return {
        ...state, 
        updatingLoading: false,
        stocks: action.payload,
        updatingIndex: -1,
      };
    case constants.IMPORT_STOCK_FAIL:
      return { ...state, updatingLoading: false, error: action.payload };
    default:
      return state;
  }
}
export { stockReducer };
