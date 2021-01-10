import Axios from '../modules/axios';
import constants from '../constants/configConstant';
import utils from '../modules/utils';

const createConfig = ({ key, value, name }) => async (dispatch, getState) => {
  dispatch({ type: constants.CREATE_CONFIG_REQUEST });
  try {
    const { data } = await Axios.post(
      '/api/config/admin',
      JSON.stringify({
        key,
        value,
        name,
      })
    );
    const { configs } = getState().config;
    dispatch({
      type: constants.CREATE_CONFIG_SUCCESS,
      payload: configs.push(data),
    });
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: constants.CREATE_CONFIG_FAIL, payload: message });
  }
};

const getConfig = () => async (dispatch, getState) => {
  const { configs, isGotten } = getState().config;
  if (isGotten) {
    return configs;
  }
  dispatch({ type: constants.GET_CONFIG_REQUEST });
  try {
    const { data } = await Axios.get('/api/config?limit=50');
    dispatch({ type: constants.GET_CONFIG_SUCCESS, payload: data });
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: constants.GET_CONFIG_FAIL, payload: message });
  }
};

const updateConfig = ({ index, id, key, value, name }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: constants.UPDATE_CONFIG_REQUEST, payload: index });
  try {
    const { data } = await Axios.put(
      '/api/config/admin/' + id,
      JSON.stringify({
        key,
        value,
        name,
      })
    );
    const { configs } = getState().config;
    const index = configs.findIndex((item) => item._id === id);
    if (configs[index]) {
      configs[index] = { ...configs[index], ...data };
    }
    dispatch({ type: constants.UPDATE_CONFIG_SUCCESS, payload: configs });
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: constants.UPDATE_CONFIG_FAIL, payload: message });
  }
};
export { createConfig, getConfig, updateConfig };
