import constants from '../constants/stockConstant';
import _ from 'lodash';

function stockReducer(
  state = {
    stocks: [],
    query: { page: 1, limit: 30 },
    updating: { modalVisible: false, updatingIndex: -1, updatingLoading: false, success: false },
  },
  action
) {
  switch (action.type) {
    case constants.CHANGE_FIELDS: {
      for (const key in action.payload) {
        _.set(state, key, action.payload[key]);
      }
      return { ...state };
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
        error: null,
        updating: {
          ...state.updating,
          updatingLoading: true,
        },
      };
    case constants.IMPORT_STOCK_SUCCESS:
      return {
        ...state,
        stocks: action.payload,
        updating: {
          ...state.updating,
          updatingLoading: false,
          updatingIndex: -1,
        },
        success: true
      };
    case constants.IMPORT_STOCK_FAIL:
      return {
        ...state,
        error: action.payload,
        updating: {
          ...state.updating,
          updatingLoading: false,
        },
        success: false
      };
    default:
      return state;
  }
}
export { stockReducer };
