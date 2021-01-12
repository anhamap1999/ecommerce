import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { register, changeFields } from '../actions/cartActions';
import {
  getListAddressNew,
  creareAddressNew,
} from '../actions/delivery_addressAction';
import { getWard, getDistrict } from '../actions/addressActions';
import HomePage from '../pages/homepage';
import CheckoutSteps from './checkout';
function ShippingScreen(props) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const { addressList } = useSelector((state) => state.listAddress);
  const { provinces, districts, wards } = useSelector((state) => state.address);
  const { shipping } = useSelector((state) => state.cartUser);
  const {
    full_name,
    phone_number,
    province_number,
    district_number,
    ward_number,
    text,
    addressId,
  } = shipping;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListAddressNew());
    return () => {};
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    // dispatch(saveShipping( {address , city ,country } ));
    if (!addressId) {
      await dispatch(creareAddressNew(shipping));
      onChange(
        'addressId',
        addressList[addressList.length - 1]
          ? addressList[addressList.length - 1]._id
          : ''
      );
    }
    props.history.push('/payment');
  };
  const onChangeAddress = async (index) => {
    if (addressList[index]) {
      await dispatch(getDistrict(addressList[index].province_number));
      await dispatch(
        getWard(
          addressList[index].province_number,
          addressList[index].district_number
        )
      );
      dispatch(
        changeFields({
          shipping: {
            province_number: addressList[index].province_number,
            district_number: addressList[index].district_number,
            ward_number: addressList[index].ward_number,
            text: addressList[index].text,
            phone_number: addressList[index].phone_number,
            full_name: addressList[index].full_name,
            addressId: addressList[index]._id,
          },
        })
      );
    } else {
      changeFields({
        shipping: {},
      });
    }
  };

  const onChange = (key, value) => {
    dispatch(
      changeFields({ ['shipping.' + key]: value, 'shipping.addressId': null })
    );
  };
  const onChangeProvince = (e) => {
    dispatch(getDistrict(e.target.value));
    onChange('province_number', e.target.value);
  };
  const onChangeDistrict = (e) => {
    dispatch(getWard(province_number, e.target.value));
    onChange('district_number', e.target.value);
  };
  return (
    <HomePage>
      <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <form onSubmit={submitHandler} className='border rounded'>
          <h3>Địa chỉ giao hàng</h3>

          {addressList && addressList.length ? (
            <div>
              <label>Chọn địa chỉ</label>
              <select
                class='custom-select'
                id='inputGroupSelect01'
                onChange={(e) => onChangeAddress(e.target.value)}
              >
                <option value={-1}>{'Chọn địa chỉ'}</option>
                {addressList &&
                  addressList.length &&
                  addressList.map((item, index) => (
                    <option value={index}>{item.normalizedAddress}</option>
                  ))}
              </select>
            </div>
          ) : null}
          {addressList && addressList.length ? 'Hoặc nhập địa chỉ mới' : ''}
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              value={full_name}
              onChange={(e) => {
                onChange('full_name', e.target.value);
              }}
              disabled={addressId ? true : false}
              placeholder='Họ và tên'
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              value={phone_number}
              onChange={(e) => {
                onChange('phone_number', e.target.value);
              }}
              disabled={addressId ? true : false}
              placeholder='Số điện thoại'
            />
          </div>
          <div className='form-group'>
            <select
              className='custom-select'
              value={province_number}
              onChange={onChangeProvince}
              disabled={addressId ? true : false}
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
              value={district_number}
              onChange={onChangeDistrict}
              disabled={addressId ? true : false}
            >
              <option selected>Quận/Huyện</option>
              {districts &&
                districts.map((option) => (
                  <option key={option.district_id} value={option.number}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>
          <div className='form-group'>
            <select
              className='custom-select'
              value={ward_number}
              onChange={(e) => {
                onChange('ward_number', e.target.value);
              }}
              disabled={addressId ? true : false}
            >
              <option selected>Tên phường / xã</option>
              {wards &&
                wards.map((option) => (
                  <option key={option.district_id} value={option.number}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              value={text}
              onChange={(e) => {
                onChange('text', e.target.value);
              }}
              placeholder='Địa chỉ cụ thể'
              disabled={addressId ? true : false}
            />
          </div>
          <button type='submit' className='btn btn-outline-dark'>
            Tiếp tục
          </button>
        </form>
      </div>
    </HomePage>
  );
}

export default ShippingScreen;
