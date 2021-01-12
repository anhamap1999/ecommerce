import axios from '../modules/axios';
import { ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_SAVE_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS } from '../constants/orderConstants';


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
        const { orders } = getState().ordersList;
        const { data } = await axios.post('/api/order', JSON.stringify(order));
        dispatch( { type : ORDER_SAVE_SUCCESS , payload : {...orders, data} }  );
        
    } catch (error) {
        dispatch( { type : ORDER_SAVE_FAIL , payload : error.message }  );
    }
}
export { saveOrder ,getListOrders}