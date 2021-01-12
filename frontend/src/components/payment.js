import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  register,
  savePayment,
  saveShipping,
  changeFields,
} from '../actions/cartActions';
import HomePage from '../pages/homepage';
import CheckoutSteps from './checkout';
import {
  getBanks,
  getBranches,
  createBankNew,
  getBankAccounts,
} from '../actions/bankAction';
import { Radio } from 'antd';
function PaymentSreen(props) {
  //   const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state.cartUser);
  const { banks, bankAccounts, branches } = useSelector((state) => state.bank);
  const { provinces } = useSelector((state) => state.address);

  const {
    paymentMethod,
    bank_account,
    account_name,
    account_number,
    bank,
    branch,
    province_number,
  } = payment;
  useEffect(() => {
    dispatch(getBankAccounts());
    onChange('paymentMethod', 'cash');
    // setPaymentMethod('cash');
    return () => {};
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    // dispatch(savePayment( {paymentMethod} ));
    if (!bank_account && paymentMethod === 'online') {
      await dispatch(createBankNew(payment));
      onChange(
        'bank_account',
        bankAccounts[bankAccounts.length - 1]
          ? bankAccounts[bankAccounts.length - 1]._id
          : ''
      );
      onChange('paymentMethod', paymentMethod);
    } else {
      onChange('paymentMethod', paymentMethod);
    }
    props.history.push('/place-order');
  };
  const onChange = (key, value) => {
    dispatch(changeFields({ ['payment.' + key]: value }));
  };
  const onChangeBankAccount = async (index) => {
    if (bankAccounts[index]) {
      await dispatch(getBanks());
      await dispatch(
        getBranches(
          bankAccounts[index].province_number,
          bankAccounts[index].bank ? bankAccounts[index].bank.number : ''
        )
      );
      dispatch(
        changeFields({
          payment: {
            paymentMethod: 'online',
            province_number: bankAccounts[index].province_number,
            bank: bankAccounts[index].bank
              ? bankAccounts[index].bank.number
              : '',
            branch: bankAccounts[index].branch
              ? bankAccounts[index].branch.number
              : '',
            account_name: bankAccounts[index].account_name,
            account_number: bankAccounts[index].account_number,
            bank_account: bankAccounts[index]._id,
          },
        })
      );
    } else {
      await dispatch(
        changeFields({
          payment: {
            paymentMethod: 'online',
            // province_number: '',
            // bank: '',
            // branch: '',
            // account_name: '',
            // account_number: '',
            // bank_account: '',
          },
        })
      );
    }
  };
  const onChangeProvince = (e) => {
    dispatch(getBanks());
    onChange('province_number', e.target.value);
  };

  const onChangeBank = (e) => {
    dispatch(getBranches(province_number, e.target.value));
    onChange('bank', e.target.value);
  };
  console.log('PAYMENT', payment);
  return (
    <HomePage>
      <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <form onSubmit={submitHandler} className='border rounded'>
          <h3>Thanh toán</h3>
          <div>
            <h5>Phương thức thanh toán</h5>
            <div>
              <input
                type='radio'
                name='paymentMethod'
                id='paymentMethod'
                value='cash'
                checked={paymentMethod === 'cash'}
                onChange={(e) => onChange('paymentMethod', e.target.value)}
              ></input>
              <label for='paymentMethod'>Tiền mặt</label>
            </div>
            <div>
              <input
                type='radio'
                name='paymentMethod'
                id='paymentMethod'
                value='online'
                checked={paymentMethod === 'online'}
                onChange={(e) => onChange('paymentMethod', e.target.value)}
              ></input>
              <label for='paymentMethod'>Qua chuyển khoản ngân hàng</label>
            </div>

            {paymentMethod === 'online' &&
            bankAccounts &&
            bankAccounts.length ? (
              <div>
                <label>Chọn tài khoản</label>
                <select
                  class='custom-select'
                  id='inputGroupSelect01'
                  onChange={(e) => onChangeBankAccount(e.target.value)}
                >
                  <option value={-1}>{'Chọn tài khoản'}</option>
                  {bankAccounts &&
                    bankAccounts.length &&
                    bankAccounts.map((item, index) => (
                      <option value={index}>{item.account_number}</option>
                    ))}
                </select>
              </div>
            ) : null}
            {paymentMethod === 'online' && bankAccounts && bankAccounts.length
              ? 'Hoặc nhập tài khoản mới'
              : ''}
            {paymentMethod === 'online' ? (
              <>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    value={account_number}
                    onChange={(e) => {
                      onChange('account_number', e.target.value);
                    }}
                    placeholder='Tên chủ thẻ'
                    disabled={bank_account}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    value={account_name}
                    onChange={(e) => {
                      onChange('account_name', e.target.value);
                    }}
                    placeholder='Số tài khoản'
                    disabled={bank_account}
                  />
                </div>
                <div className='form-group'>
                  <select
                    className='custom-select'
                    value={province_number}
                    onChange={onChangeProvince}
                    disabled={bank_account}
                  >
                    <option selected>Tỉnh/Thành phố</option>
                    {provinces &&
                      provinces.map((option) => (
                        <option key={option.province_id} value={option.number}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='form-group'>
                  <select
                    className='custom-select'
                    value={bank}
                    onChange={onChangeBank}
                    disabled={bank_account}
                  >
                    <option selected>Chọn Ngân hàng</option>
                    {banks &&
                      banks.map((option) => (
                        <option value={option.number}>{option.name}</option>
                      ))}
                  </select>
                </div>
                <div className='form-group'>
                  <select
                    className='custom-select'
                    value={branch}
                    onChange={(e) => onChange('branch', e.target.value)}
                    disabled={bank_account}
                  >
                    <option selected>Chọn chi nhánh ...</option>
                    {branches &&
                      branches.map((option) => (
                        <option key={option.district_id} value={option.number}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                </div>
              </>
            ) : null}
            <div className='form-group form-check'></div>
          </div>
          <button type='submit' className='btn btn-outline-dark'>
            Tiếp tục
          </button>
        </form>
      </div>
    </HomePage>
  );
}

export default PaymentSreen;
