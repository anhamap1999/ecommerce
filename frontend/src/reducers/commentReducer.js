import { GET_COMMENT_PRODUCT_FAIL, GET_COMMENT_PRODUCT_REQUEST, GET_COMMENT_PRODUCT_SUCCESS } from "../constants/commentConstant";


function getCommentProductReducer(state = { comment: [] }, action) {
    switch (action.type) {
      case GET_COMMENT_PRODUCT_REQUEST:
        return { loading: true, comment : [] };
      case GET_COMMENT_PRODUCT_SUCCESS:
        return { loading: false, comment: action.payload };
      case GET_COMMENT_PRODUCT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  export {getCommentProductReducer};