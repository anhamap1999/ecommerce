import axios from '../modules/axios';
import { ORDER_LIST_ADMIN_FAIL, ORDER_LIST_ADMIN_REQUEST, ORDER_LIST_ADMIN_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_SAVE_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS } from '../constants/orderConstants';
import axiosClient from '../modules/axios';


const getListOrdersAdmin = () => async (dispatch, getState) =>{
    try {   
        dispatch( { type : ORDER_LIST_ADMIN_REQUEST }  );
       
        
        const { data } = await axiosClient.get('/api/orders/admin');
        
        dispatch( { type : ORDER_LIST_ADMIN_SUCCESS , payload : data }  );
        
        
    } catch (error) {
        dispatch( { type : ORDER_LIST_ADMIN_FAIL , payload : error.message }  );
    }
}
const getListOrders = () => async (dispatch, getState) =>{
    try {
        dispatch( { type : ORDER_LIST_REQUEST }  );
        const { userSignin : { userInfo } } = getState();
        
        const { data } = await axios.get('/api/order');
         
        dispatch( { type : ORDER_LIST_SUCCESS , payload : data }  );
        
        
    } catch (error) {
        dispatch( { type : ORDER_LIST_FAIL , payload : error.message }  );
    }
}
const saveOrder = (order) => async (dispatch, getState) =>{
    try {
        dispatch( { type : ORDER_SAVE_REQUEST , payload : order }  );
        const { orders } = getState().odersList;
        const { data } = await axios.post('/api/order', JSON.stringify(order));
        console.log('DATA', data)
        dispatch( { type : ORDER_SAVE_SUCCESS , payload : {...orders, data} }  );
        
        
    } catch (error) {
        dispatch( { type : ORDER_SAVE_FAIL , payload : error.message }  );
    }
}
export { saveOrder ,getListOrders,getListOrdersAdmin}