import React from 'react';
import { Upload, Modal, Spin } from 'antd';
import utils from '../modules/utils';
import CarouselModal from './CarouselModal.jsx';
// import './style.css';
import { connect } from 'react-redux';
// import notification from '../../modules/notification';
import PropTypes from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';
// import { RiDeleteBin6Line } from 'react-icons/ri';
import { uploadFile, deleteFile } from '../modules/file';
// import { uploadFile, deleteFile } from '../actions/fileAction';
// import { useDispatch, useSelector } from 'react-redux';

const MB2B = 1024 * 1024;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
class ImageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
      previewVisible: false,
      previewImage: '',
      selectedIndex: 0,
    };
    if (props.customRef) {
      this.props.customRef(this);
    }
  }

  static propTypes = {
    imageType: PropTypes.oneOf([
      'company_logo',
      'company_cover',
      'company_images',
      'product_thumbnail',
      'product_images',
      'banner',
      'business_registration_form',
      'company_deposit',
      'promotion_banner',
      'private',
      'report',
    ]),
  };

  cleanFileList = () => {
    this.setState({ fileList: [] });
  };

  onUpdateImage = ({ imageUrls, imageWidth, imageType }) => {
    let fileList = [];
    if (
      imageUrls &&
      imageUrls.length
      // (imageUrls.length !== this.props.imageUrls.length || imageUrls[0] !== this.props.imageUrls[0])
    ) {
      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const index = i;
        if (typeof url === 'string') {
          fileList.push({
            uid: index,
            name: url,
            status: 'done',
            url: url,
          });
        } else {
          fileList.push(url);
        }
      }
    }
    fileList = fileList.map((item) => {
      if (item && item.thumbUrl) {
        delete item.thumbUrl;
      }
      return item;
    });
    return fileList;
  };

  async componentWillReceiveProps({ imageUrls, imageWidth, imageType }) {
    // if(imageType !== )
    // if (imageType !== 'private') {
    //   const fileList = await this.onUpdateImage({ imageType, imageUrls, imageWidth });
    //   this.setState({ fileList });
    // } else
    if (
      imageUrls &&
      imageUrls.length &&
      imageUrls.length !== this.props.imageUrls.length
    ) {
      const fileList = this.onUpdateImage({ imageType, imageUrls, imageWidth });
      this.setState({ fileList });
    }
  }

  async componentDidMount() {
    const { imageUrls, imageWidth, imageType } = this.props;
    // const fileList = await this.onUpdateImage({
    //   imageType,
    //   imageUrls,
    //   imageWidth,
    // });
    const fileList = this.onUpdateImage({ imageType, imageUrls, imageWidth });
    this.setState({ fileList });
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    const fileList = this.state.fileList;
    const index = fileList.findIndex((item) => file.uid === item.uid);

    this.setState({
      previewImage: file.url,
      previewVisible: true,
      selectedIndex: index,
    });
  };

  customUpload = async ({ onError, onSuccess, file }) => {
    try {
      const image = await uploadFile(file);
      let { fileList } = this.state;
      const fileItem = {
        ...file,
        originFileObj: file,
        status: 'done',
        url: image,
      };
      fileList.push(fileItem);
      if (fileList.length > this.props.maxLength) {
        fileList = fileList.slice(0, this.props.maxLength);
      }
      this.setState({ fileList });
      if (this.props.onChange) {
        this.props.onChange(fileList);
      }
      onSuccess(null, image);
    } catch (e) {
      onError(e);
    }
  };

  customRequest = async (file) => {
    console.log('FILE', file);
    if (file.file && file.file.size > MAX_FILE_SIZE) {
      console.log('FILE IS TOO LARGE');
      //   notification.show({
      //     message: 'Up ảnh thất bại',
      //     description: (
      //       <>
      //         Ảnh có kích thước quá lớn ({utils.roundNumber(file.file.size / MB2B, 2)} MB).
      //         <p className='my-0'>Kích thước tối đa cho phép là 10MB</p>
      //       </>
      //     )
      //   });
      return;
    }
    const fileItem = {
      ...file.file,
      originFileObj: file.file,
      status: 'done',
      url: await utils.getBase64(file.file),
    };
    let fileList = this.state.fileList;
    fileList.push(fileItem);
    if (fileList.length > this.props.maxLength) {
      fileList = fileList.slice(0, this.props.maxLength);
    }
    // const fileErrors = {};
    // fileList.forEach((fileItem, index) => {
    //   if (fileItem.size > MAX_FILE_SIZE) {

    //   }
    // });
    // if (fileErrors.length && this.props.fileSizeError) {
    //   this.props.fileSizeError(fileErrors);
    // } else {
    this.setState({ fileList });
    if (this.props.onChange) {
      this.props.onChange(fileList);
    }
    // }
  };

  onRemove = async (file) => {
    const fileList = this.state.fileList;
    const removeIndex = fileList.findIndex((item) => item.uid === file.uid);
    fileList.splice(removeIndex, 1);
    this.setState({ fileList });
    await deleteFile(file.url);
    if (this.props.onChange) {
      this.props.onChange(fileList);
    }
  };

  // only cover_image or whatever image so big and only one
  onRawRemove = () => {
    this.setState({ fileList: [] });
    if (this.props.onChange) {
      this.props.onChange([]);
    }
  };

  onUploadImage = async () => {
    const fileList = this.state.fileList;
    const fileUpload = [];
    const fileHold = [];
    let fileListRes = [];
    fileList.forEach((file, index) => {
      if (file.originFileObj) {
        fileUpload.push(file.originFileObj);
      } else {
        fileHold.push(file);
      }
    });
    if (this.props.imageType) {
      if (!fileUpload.length) {
        fileListRes = fileHold;
      } else {
        // let imageRes = [];
        if (this.props.private) {
        }
        const imagesRes = await this.props.uploadFile(
          fileUpload,
          this.props.imageType
        );
        if (imagesRes) {
          fileListRes = fileHold.concat(imagesRes);
        } else {
          //   notification.show({
          //     message: 'Upload hình ảnh thất bại',
          //     description: this.props.files.message
          //   });
          return false;
        }
      }
      return fileListRes.map((file) => {
        if (file.url) {
          return utils.detectFileUrl(file.url);
        }
        return file;
      });
    }
  };

  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      selectedIndex,
    } = this.state;
    const { imageType, files } = this.props;
    const uploadButton = (
      <div>
        <AiOutlinePlus style={{ fontSize: '20px' }} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <>
        <div className="clearfix">
          <Upload
            customRequest={this.customUpload}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onRemove={this.onRemove}
            // className={(imageType === 'company_cover' || imageType === 'banner') && 'cover-image'}
            multiple={this.props.maxLength > 1 ? true : false}
            showUploadList={{
              showDownloadIcon: false,
              //   showPreviewIcon:
              //     imageType === 'company_cover' || imageType === 'banner'
              //       ? false
              //       : true,
            }}
            accept=".png, .jpg, .jpeg"
            // prefixCls='Loại file hợp lệ: .png .jpg .jpeg'
          >
            {/* {uploadButton} */}
            {fileList.length >= this.props.maxLength ? null : uploadButton}
          </Upload>
          {/* 
          <p>
            <i>Dung lượng tối đa: 10 Mb</i>
          </p> */}

          {fileList.length <= 1 ? (
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          ) : (
            <CarouselModal
              visible={previewVisible}
              imageUrls={fileList.map((file) =>
                typeof file === 'string' ? file : file.url
              )}
              imageWidth={this.props.imageWidth}
              onClose={() => {
                this.setState({ previewVisible: false });
              }}
              startIndex={selectedIndex}
            />
          )}
        </div>
        {fileList.length >= this.props.maxLength || (
          <>
            <i style={{ display: 'block', lineHeight: 'normal' }}>
              Loại file hợp lệ: .png, .jpg, .jpeg
            </i>
            <p className="my-0" style={{ lineHeight: 'normal' }}>
              <i>Dung lượng tối đa: 10 MB</i>
            </p>
          </>
        )}
      </>
    );
  }
}

const mapDispatchToProps = {
  //   uploadFile,
  //   deleteFile,
};

const mapStateToProps = (state) => ({
  files: state.file,
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);
