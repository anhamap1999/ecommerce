
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Modal  } from 'antd';
import ProfileScreen from './profile';
import Axios from 'axios';
import { creareAddressNew, getListAddressNew } from '../../actions/delivery_addressAction';

export default function PlaceUserScreen(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

const [full_name, setFull_name] = useState('');
const [phone_number, setPhone_number] = useState('');
const [province_number, setProvince_number] = useState('');
const [district_number, setdistrict_number] = useState('');
const [ward_number, setWard_number] = useState('');
const [text, setText] = useState('');

  
const [provinceData, setProvinceData] = useState({ });
const [districtData, setDistrictData] = useState({ });
const [wardData, setWardData] = useState({ });  
const listAddress = useSelector(state => state.listAddress)
const { addressList ,loading ,error} = listAddress;
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getListAddressNew());
      const fetchData = async () => {
        const result = await Axios.get('/api/address/province');
        setProvinceData(result.data);
      };
      fetchData();
    }, []);
    
  const onChangeProvince = async (e) =>{
    setProvince_number(e.target.value);
    const result1= await Axios.get('/api/address/district?province_number=' + e.target.value);
    setDistrictData(result1.data);
     
  } ;

  const onChangeDistrict = async (e) =>{
    setdistrict_number(e.target.value);
    const result2 = await Axios.get(`/api/address/ward?district_number=${e.target.value}&province_number=${province_number}`);
    setWardData(result2.data);
   
  };
  const submidHandler = (e ) =>{
    e.preventDefault();
    dispatch(creareAddressNew({
      full_name,phone_number,province_number,district_number,ward_number,text
    }))
    setIsModalVisible(false);
  }
  return <ProfileScreen >  
    <div className="" style={{marginTop : '20px'}}>
      <div className="header__title">
        <div className="row">
          <div className="col-sm-8">
            <h4>Địa chỉ của tôi</h4>
          </div>
          <div className="col-sm-4">
           <button type="button" class="btn btn-danger" onClick={showModal} style={{position:'absolute',right:'15px'}}>Thêm địa chỉ mới</button>
          </div>
          <Modal 
              title="Thêm địa chỉ mới" 
              visible={isModalVisible}    
              cancelText="Hủy" 
              onCancel={handleCancel}
              >

              <form onSubmit={submidHandler}>
                        <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              value={full_name}  
                              onChange={e => {setFull_name(e.target.value)}} 
                              placeholder="Họ và tên" />
                        </div>
                        <div className="form-group">
                            <input 
                              type="text" className="form-control"
                              value={phone_number}  
                              onChange={e => {setPhone_number(e.target.value)}}    
                              placeholder="Số điện thoại" />
                        </div>
                        <div className="form-group">
                            <select className="custom-select" value = {province_number} 
                                    onChange={onChangeProvince}  >
                                <option selected >Tỉnh/Thành phố</option>
                                {
                                 provinceData.data && provinceData.data.map((option) => (
                                    <option   
                                        key={option.province_id}
                                        value={option.number} 
                                    >
                                          {option.name}
                                    </option>
                                  ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                           
                            <select className="custom-select"
                              value = {district_number} 
                              onChange={ onChangeDistrict}  >
                                <option selected >Quận/Huyện</option>
                                {
                                 districtData.data && districtData.data.map((option) => (
                                    <option   
                                        key={option.district_id}
                                        value={option.number} 
                                    >
                                          {option.name}
                                    </option>
                                  ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <select
                                className="custom-select" 
                                  value = {ward_number} 
                                  onChange={ e => { setWard_number(e.target.value)}} >
                                <option selected >Tòa nhà , Tên Đường</option>
                                {
                                 wardData.data && wardData.data.map((option) => (
                                    <option   
                                        key={option.district_id}
                                        value={option.number} 
                                    >
                                          {option.name}
                                    </option>
                                  ))
                                } 
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              value={text}  
                              onChange={e => {setText(e.target.value)}} 
                              placeholder="Ghi chú" />
                        </div>
                        <div className="form-group form-check">
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Thêm địa chỉ mới</button>
                    </form> 
          </Modal>
        </div>
      </div>
      <hr>
      </hr>
    </div>
                                
    {/* List  address */}
    { loading ?  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div> :
        error ? <div>{error}</div>:
    addressList.data && addressList.data.map(address => 
      <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <div className="text-muted" style={{height: '35px'}}>
            Họ và Tên
          </div>
          <div className="text-muted"  style={{height: '35px'}}>
            Số điện thoại
          </div>
        <div className="text-muted"  style={{height: '35px'}}>
          Địa chỉ
        </div>
        </div>
        <div className="col-sm-7">
        <div className="text-dark" style={{height: '35px'}}>
           {address.full_name}
          </div>
          <div className="text-dark"  style={{height: '35px'}}>
          {address.phone_number}
          </div>
        <div className="text-dark"  style={{height: '35px'}}>
          {address.normalizedAddress}
        </div>
        </div>
        <div className="col-sm-2"></div>

      </div>
      <hr ></hr>
    </div>
    )
    }
  </ProfileScreen>
  
}



