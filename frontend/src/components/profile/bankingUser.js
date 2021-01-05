
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Modal  } from 'antd';
import {Link} from 'react-router-dom';
import ProfileScreen from './profile';
import Axios from 'axios';
import { createBankNew } from '../../actions/bankAction';

export default function BankingUserScreen(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [account_number, setaccount_number] = useState('');
  const [account_name, setaccount_name] = useState('');

  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [province_number, setProvince_number] = useState('');

  const [bankData, setBankData] = useState({});
  const [branchData, setBranchData] = useState({});
  const [provinceData, setProvinceData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get('/api/banks');
      setBankData(result.data);
    };
    const fetchData1 = async () => {
      const result = await Axios.get('/api/address/province');
      setProvinceData(result.data);
    };
    fetchData();
    fetchData1();
  }, []);
  const onChangeBank = async (e) =>{
    setBank(e.target.value);
    const result1= await Axios.get(`/api/banks/branch?bank_number=${e.target.value}&province_number=${province_number}`);
    setBranchData(result1.data);
     
  } ;
  const showModal = () => {
    setIsModalVisible(true);
  };

  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBankNew(
      {
        account_name,account_number,bank,branch,province_number
      }
    ))
  };
  return <ProfileScreen >  
    <div className="" style={{marginTop : '20px'}}>
      <div className="header__title">
        <div className="row">
          <div className="col-sm-8">
            <h4>Tài khoản Ngân Hàng của tôi</h4>
          </div>
          <div className="col-sm-4">
           <button type="button" class="btn btn-danger" onClick={showModal} style={{position:'absolute',right:'15px'}}>Thêm Tài khoản mới</button>
          </div>
          <Modal 
              title="Thêm Tài khoản mới" 
              visible={isModalVisible}    
              cancelText="Hủy" 
              onCancel={handleCancel}
              >

              <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              value={account_number}  
                              onChange={e => {setaccount_number(e.target.value)}} 
                              placeholder="Tên chủ thẻ" />
                        </div>
                        <div className="form-group">
                            <input 
                              type="text" className="form-control"
                              value={account_name}  
                              onChange={e => {setaccount_name(e.target.value)}}    
                              placeholder="Số tài khoản" />
                        </div>
                        <div className="form-group">
                            <select className="custom-select" value = {province_number} 
                                     onChange={e =>setProvince_number(e.target.value)}
                                     >
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
                            <select
                                className="custom-select" 
                                  value = {bank} 
                                  onChange={onChangeBank} >
                                <option selected >Chọn Ngân hàng</option>
                                {
                                 bankData.data && bankData.data.map((option) => (
                                    <option   
                                   
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
                                  value = {branch} 
                                  onChange={ e => setBranch(e.target.value)} >
                                <option selected >Chọn chi nhánh ...</option>
                                {
                                 branchData.data && branchData.data.map((option) => (
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
                                
   
    
  </ProfileScreen>
  
}



