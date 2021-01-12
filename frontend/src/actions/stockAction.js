import Axios from '../modules/axios';
import constants from '../constants/stockConstant';
import utils from '../modules/utils';
const changeFields = (object) => async (dispatch) => {
  dispatch({
    type: constants.CHANGE_FIELDS,
    payload: object,
  });
};
const createStock = ({ key, value, name }) => async (dispatch, getState) => {
  // dispatch({ type: constants.CREATE_STOCK_REQUEST });
  // try {
  //   const { data } = await Axios.post(
  //     '/api/stock/admin',
  //     JSON.stringify({
  //       key,
  //       value,
  //       name,
  //     })
  //   );
  //   const { stocks } = getState().stock;
  //   dispatch({
  //     type: constants.CREATE_STOCK_SUCCESS,
  //     payload: stocks.push(data),
  //   });
  // } catch (error) {
  //   const message = utils.getMessageError(error.messages);
  //   dispatch({ type: constants.CREATE_STOCK_FAIL, payload: message });
  // }
};
const getStocks = (query) => async (dispatch, getState) => {
  dispatch({ type: constants.GET_STOCK_REQUEST });
  try {
    const queryString = utils.formatQuery(query);
    const { data, total, total_page } = await Axios.get(
      '/api/stock' + queryString
    );
    dispatch({
      type: constants.GET_STOCK_SUCCESS,
      payload: { data, total, total_page },
    });
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: constants.GET_STOCK_FAIL, payload: message });
  }
};

const importStock = ({ index, id, key, value, name }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: constants.IMPORT_STOCK_REQUEST, payload: index });
  try {
    const { data } = await Axios.put(
      '/api/stock/admin/' + id,
      JSON.stringify({
        key,
        value,
        name,
      })
    );
    const { stocks } = getState().stock;
    const index = stocks.findIndex((item) => item._id === id);
    if (stocks[index]) {
      stocks[index] = { ...stocks[index], ...data };
    }
    dispatch({ type: constants.IMPORT_STOCK_SUCCESS, payload: stocks });
  } catch (error) {
    const message = utils.getMessageError(error.messages);
    dispatch({ type: constants.IMPORT_STOCK_FAIL, payload: message });
  }
};
export { createStock, getStocks, importStock, changeFields };
