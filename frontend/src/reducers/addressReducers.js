import constants from '../constants/addressConstant';

function addressReducer(state = { provinces: [], districts: [], wards: [] , isGotten: false }, action) {
  switch (action.type) {
    case constants.GET_PROVINCE_REQUEST: 
      return { ...state, loading: true, provinces: [], error: null };
    case constants.GET_PROVINCE_SUCCESS: {

        return { ...state, loading: false, provinces: action.payload };
    }
    case constants.GET_PROVINCE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case constants.GET_DISTRICT_REQUEST:
      return { ...state, loadingDistrict: true, districts: [], error: null, isGotten: false };
    case constants.GET_DISTRICT_SUCCESS:
      return { ...state, loadingDistrict: false, districts: action.payload, isGotten: true };
    case constants.GET_DISTRICT_FAIL:
      return { ...state, loadingDistrict: false, error: action.payload };

    case constants.GET_WARD_REQUEST:
      return { ...state, loadingWard: true, wards: [], error: null };
    case constants.GET_WARD_SUCCESS:
      return { ...state, loadingWard: false, wards: action.payload };
    case constants.GET_WARD_FAIL:
      return { ...state, loadingWard: false, error: action.payload };
    default:
      return state;
  }
}
export { addressReducer };
