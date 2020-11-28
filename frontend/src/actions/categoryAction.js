import axios from 'axios';
import {CATEGORY_SAVE_FAIL, CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS} from '../constants/categoryConstants'

const saveCategory = (category) => async (dispatch, getState) =>{
    try {
            dispatch( { type : CATEGORY_SAVE_REQUEST , payload : category }  );
            const { userSignin : { userInfo } } = getState();
            console.log("category :" ,category);
            console.log("author :" ,{headers:{authorization:'Bearer ' + userInfo.token}});
            const { data } = await axios.post('/api/categories/add', category, {
                headers:{
                    authorization : 'Bearer ' + userInfo.token
                },
            });
           
            dispatch( { type : CATEGORY_SAVE_SUCCESS , payload : data }  );
    } catch (error) {
        dispatch( { type : CATEGORY_SAVE_FAIL , payload : error.message }  );
    }
}
export {saveCategory};