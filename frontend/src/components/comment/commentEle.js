import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Rate,
  Card,
  Row,
  Col,
} from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentedProduct from '.';
import {
  postCommentProduct,
  getCommentProduct,
} from '../../actions/commentAction';
import { BsPlusSquareFill } from 'react-icons/bs';
import UploadImage from '../UploadImage';
import { uploadFile } from '../../modules/file';
const { TextArea } = Input;

export const Editor = ({
  onChange,
  onSubmit,
  submitting,
  content,
  rate,
  images,
}) => (
  <>
    <Form.Item className='ant-rate-select'>
      <Rate value={rate} onChange={(value) => onChange('rating', value)} />
    </Form.Item>
    <Form.Item>
      <TextArea
        placeholder='Nhập bình luận'
        autoSize={{ minRows: 4 }}
        onChange={(e) => onChange('content', e.target.value)}
        value={content}
      />
    </Form.Item>
    <UploadImage
      imageUrls={images}
      maxLength={5}
      imageWidth={1200}
      onChange={(images) => onChange('images', images)}
      // imageType={'product_images'}
      // customRef={(ref) => (this.imagesRef = ref)}
    />

    <Form.Item>
      <Button
        htmlType='submit'
        loading={submitting}
        onClick={onSubmit}
        type='primary'
      >
        Thêm bình luận
      </Button>
    </Form.Item>
  </>
);
const uploadButton = (
  <div>
    <BsPlusSquareFill style={{ fontSize: '20px' }} />
    <div className='ant-upload-text'>Upload</div>
  </div>
);
const CommentEle = ({ productID }) => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState([]);
  const [rate, setRate] = useState(0);
  const [rating, setRating] = useState(4);
  const [images, setimages] = useState([]);

  const dispatch = useDispatch();
  const listCommentProduct = useSelector((state) => state.listCommentProduct);
  const { comment, loading, error } = listCommentProduct;
  useEffect(() => {
    dispatch(getCommentProduct(productID));
    return () => {};
  }, []);

  const handleSubmit = async () => {
    if (!comments) {
      return;
    }
    await dispatch(
      postCommentProduct({ product_id: productID, content, rating })
    );
    dispatch(getCommentProduct(productID));
    setContent('');
  };

  const onChange = (key, value) => {
    if (key === 'content') {
      setContent(value);
    } else if (key === 'rate') {
      setRate(value);
    } else {
      setimages(value);
    }
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <>
      {loading ? (
        <div className='spinner-border text-primary' role='status'>
          <span className='sr-only'></span>
        </div>
      ) : error ? (
        <div> {error} </div>
      ) : (
        comment &&
        comment &&
        comment.length > 0 &&
        comment.map(
          (con) =>
            con.product_id._id === productID && (
              <CommentedProduct key={con.product_id._id} content={con} />
            )
        )
      )}

      {!userInfo ? (
        <Link to='/signin' className='text-primary'>
          {' '}
          <div>Đăng nhập để bình luận</div>{' '}
        </Link>
      ) : (
        userInfo &&
        userInfo.user && (
          <Comment
            avatar={
              <Avatar
                src={
                  userInfo.user.avatar
                    ? userInfo.user.avatar
                    : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                }
                alt={userInfo.user.email}
              />
            }
            content={
              <Editor
                onChange={onChange}
                onSubmit={() => handleSubmit()}
                submitting={submitting}
                content={content}
                rate={rate}
                images={images}
              />
            }
          />
        )
      )}
    </>
  );
};
export default CommentEle;
