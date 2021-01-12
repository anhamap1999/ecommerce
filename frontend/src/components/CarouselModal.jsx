import React from 'react';
import { Modal, Carousel, Row, Col } from 'antd';
// import './style.css';

export default class CarouselModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.carousel = null;
  }

  onCancel = () => {
    this.setState({ visible: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrls, visible } = this.props;
    return (
      <Modal
        className="carousel-modal"
        visible={visible}
        onCancel={this.onCancel}
        footer={null}
      >
        <Row style={{ display: 'flex' }}>
          <Col span={2} style={{ display: 'flex' }}>
            <div
              className="arrow rl-45"
              onClick={() => this.carousel.prev()}
            ></div>
          </Col>
          <Col span={20}>
            <Carousel
              dots={false}
              ref={(ref) => {
                this.carousel = ref;
                this.carousel && this.carousel.goTo(this.props.startIndex);
              }}
            >
              {imageUrls.map((image, index) => {
                return (
                  <div key={index} className="text-center">
                    <img
                      alt={image}
                      style={{ margin: 'auto', width: '100%' }}
                      src={image}
                    />
                  </div>
                );
              })}
            </Carousel>
          </Col>
          <Col span={2} style={{ display: 'flex' }}>
            <div
              className="arrow rr-45"
              onClick={() => this.carousel.next()}
            ></div>
          </Col>
        </Row>
      </Modal>
    );
  }
}
