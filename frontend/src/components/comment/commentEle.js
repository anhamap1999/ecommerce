import {  Comment, Avatar, Form, Button, List, Input  } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentedProduct from '.';
import { postCommentProduct,getCommentProduct  } from '../../actions/commentAction';
const { TextArea } = Input;




const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

 const  CommentEle = ({productID}) => { 
   
    const [comments, setComments] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [content, setContent] = useState([])
   
    const [rating, setRating] = useState(4)
    const [images, setimages] = useState([]);
    const dispatch = useDispatch();
    const listCommentProduct = useSelector(state => state.listCommentProduct)
    const {comment,loading,error} =listCommentProduct;
    useEffect(() => {
        dispatch(getCommentProduct(productID))
        return () => {
            
        }
    }, [])
    
    const handleSubmit = async() => {
        if (!comments) {
            return;
        };
        await dispatch(postCommentProduct({product_id :productID ,content,rating}));
        dispatch(getCommentProduct(productID))
        setContent('')
    };

    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
      <>
        {   loading ? 
                            <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only"></span>
                            </div>
                        
                    :
            error ? <div> {error} </div>
                    :
            comment && comment.data && comment.data.length > 0 &&
            comment.data.map(con => con.product_id === productID && 
                                        <CommentedProduct  
                                            content={con}
                                        />)
            }
        
        { 
            userInfo && userInfo.user &&
            <Comment
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt={userInfo.user.email}
                    />
                }
                content={
                    <Editor
                        onChange={e =>setContent(e.target.value)}
                        onSubmit={()=>handleSubmit()}
                        submitting={submitting}
                        value={content}
                    />
                }
          />
        }
      </>
    );
}
export default CommentEle ;