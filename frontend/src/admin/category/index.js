import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCatogoryAll } from '../../actions/categoryAction';
import { getUserInfoAdmin } from '../../actions/userActions';
import DashboardScreen from '../dashboard';
import { Modal, Button } from 'antd'
import { useState } from 'react';
import FormSaveCategory from './saveCategory';
const CategoryAdminScreen = (props) => {
   const listCategories = useSelector(state => state.listCategories)
   const { categories ,loadingCat , errorCat } = listCategories;
   const dispatch = useDispatch()
   useEffect(() => {
       dispatch(getCatogoryAll())
       return () => {
          
       }
   }, []);
   const [isModalVisible, setIsModalVisible] = useState(false);

   const showModal = () => {
     setIsModalVisible(true);
   };
 
 
   const handleCancel = () => {
     setIsModalVisible(false);
   };
 
    return <DashboardScreen > 
            <div className="maine">
            <h3>
            Danh mục
            </h3>
        <button className="btn btn-danger ab-right"  onClick={showModal}>Thêm Danh mục</button>
            <Modal title="Thêm Danh mục" visible={isModalVisible}  onCancel={handleCancel}>
               <FormSaveCategory   />
            </Modal>
        </div>
            { 
            loadingCat ?   <div class="spinner-border text-primary" role="status">
                            <span class="sr-only"></span>
                         </div> :
            errorCat ? <div className="">{errorCat}</div> :
            <div>
               
                <div className="list-product-add  " >
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Tên Danh mục</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Tùy chỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    categories && categories.data && categories.data.map(category=>
                        <tr key = {category._id}>
                        <td>{category.name}</td>
                        <td>{category.status}</td>
                        <td>
                            <button className="btn btn-success" >Sửa</button>
                            <button className="btn btn-dark">Xóa</button>
                        </td>
                    </tr>
                        
                      )
                }
                    </tbody>
                    </table>
                </div> 
            </div>
            
            }
        </DashboardScreen>     
}

export default CategoryAdminScreen ;