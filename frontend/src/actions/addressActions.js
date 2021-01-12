import Axios from '../modules/axios';
import constants from '../constants/addressConstant';
import utils from '../modules/utils';

const getProvince = () => async (dispatch, getState) => {
  const { provinces, isGotten } = getState().address;
  if (isGotten) {
    return {
      provinces
    };
  }
  dispatch({ type: constants.GET_PROVINCE_REQUEST });
  try {
    const { data } = await Axios.get('/api/address/province');
    dispatch({ type: constants.GET_PROVINCE_SUCCESS, payload: data });
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: constants.GET_PROVINCE_FAIL, payload: message });
  }
};
const getDistrict = (province_number) => async (dispatch, getState) => {
  dispatch({ type: constants.GET_DISTRICT_REQUEST });
  try {
    const { data } = await Axios.get('/api/address/district?province_number=' + province_number);
    dispatch({ type: constants.GET_DISTRICT_SUCCESS, payload: data });
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: constants.GET_DISTRICT_FAIL, payload: message });
  }
};
const getWard = (province_number, district_number) => async (dispatch, getState) => {
  dispatch({ type: constants.GET_WARD_REQUEST });
  try {
    const { data } = await Axios.get('/api/address/ward?province_number=' + province_number + '&district_number='+district_number);
    dispatch({ type: constants.GET_WARD_SUCCESS, payload: data });
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: constants.GET_WARD_FAIL, payload: message });
  }
};
export { getWard, getDistrict, getProvince };
