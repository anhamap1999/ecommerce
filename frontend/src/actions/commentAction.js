import Axios from "../modules/axios";
import { GET_COMMENT_PRODUCT_FAIL, GET_COMMENT_PRODUCT_REQUEST, GET_COMMENT_PRODUCT_SUCCESS, POST_COMMENT_PRODUCT_FAIL, POST_COMMENT_PRODUCT_REQUEST, POST_COMMENT_PRODUCT_SUCCESS } from "../constants/commentConstant";

  const getCommentProduct = (productID) => async (dispatch) => {

    
    try {
      dispatch({ type: GET_COMMENT_PRODUCT_REQUEST } ); 
      
      const { data } = await Axios.get("/api/comment");
      dispatch({ type: GET_COMMENT_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_COMMENT_PRODUCT_FAIL, payload: error.message });
    }
  }
  const postCommentProduct = (product) => async (dispatch,getState) => {

    
    try {
      dispatch({ type: POST_COMMENT_PRODUCT_REQUEST } ); 
      const { userSignin : { userInfo } } = getState();
      const { data } = await Axios.post("/api/comment",product
        );
      dispatch({ type: POST_COMMENT_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: POST_COMMENT_PRODUCT_FAIL, payload: error.message });
    }
  }
export {getCommentProduct,postCommentProduct}