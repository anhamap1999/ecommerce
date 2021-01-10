import constants from '../constants/configConstant';

function configReducer(state = { configs: [], updatingIndex: -1, isGotten: false }, action) {
  switch (action.type) {
    case constants.CREATE_CONFIG_REQUEST: 
      return { loading: true, configs: [], error: null };
    case constants.CREATE_CONFIG_SUCCESS: {

        return { loading: false, configs: action.payload };
    }
    case constants.CREATE_CONFIG_FAIL:
      return { loading: false, error: action.payload };

    case constants.GET_CONFIG_REQUEST:
      return { loading: true, configs: [], error: null, isGotten: false };
    case constants.GET_CONFIG_SUCCESS:
      return { loading: false, configs: action.payload, isGotten: true };
    case constants.GET_CONFIG_FAIL:
      return { loading: false, error: action.payload };

    case constants.UPDATE_CONFIG_REQUEST:
      return { updatingLoading: true, configs: [], error: null, updatingIndex: action.payload };
    case constants.UPDATE_CONFIG_SUCCESS:
      return { updatingLoading: false, configs: action.payload, updatingIndex: -1 };
    case constants.UPDATE_CONFIG_FAIL:
      return { updatingLoading: false, error: action.payload };
    default:
      return state;
  }
}
export { configReducer };
