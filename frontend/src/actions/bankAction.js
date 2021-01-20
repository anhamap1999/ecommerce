import Axios from '../modules/axios';
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
import axiosClient from '../modules/axios';

const createBankNew = ({
  account_name,
  account_number,
  bank,
  branch,
  province_number,
}) => async (dispatch, getState) => {
  dispatch({ type: CREATE_BANK_NEW_REQUEST });
  try {
    const { banks } = getState().bank;
    const { data } = await axiosClient.post(
      '/api/bank-account',
      JSON.stringify({
        account_name,
        account_number,
        bank_number: bank,
        branch_number: branch,
        province_number,
      })
    );
    dispatch({ type: CREATE_BANK_NEW_SUCCESS, payload: { ...banks, data } });
  } catch (error) {
    dispatch({ type: CREATE_BANK_NEW_FAIL, payload: error.message });
  }
};

const getBankAccounts = () => async (dispatch, getState) => {
  dispatch({ type: GET_BANK_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/bank-account');
    dispatch({ type: GET_BANK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_BANK_FAIL, payload: error.message });
  }
};
const getBanks = () => async (dispatch, getState) => {
  dispatch({ type: GET_BANKS_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/banks');
    dispatch({ type: GET_BANKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_BANKS_FAIL, payload: error.message });
  }
};

const getBranches = (province_number, bank) => async (dispatch, getState) => {
  dispatch({ type: GET_BRANCH_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(
      '/api/banks/branch?province_number=' +
        province_number +
        '&bank_number=' +
        bank
    );
    dispatch({ type: GET_BRANCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_BRANCH_FAIL, payload: error.message });
  }
};
export { createBankNew, getBankAccounts, getBanks, getBranches };
