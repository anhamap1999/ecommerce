import React from 'react';
import { Row, Col } from 'antd';
import { SendMailContainer, SendMailText, SendMailInput } from './Sendmaiele';

const myFunction = () => {
  alert('Page is loaded');
};
const SendMail = () => {
  return (
    <>
      <div className="container">
        <SendMailContainer onLoad={myFunction}>
          <Row>
            <Col md={{ span: 12 }}>
              <SendMailText>
                <h3>
                  Subscriber And Get <br></br>
                  10% OFF
                </h3>
                <p>get 10% discount for all prpoducts</p>
              </SendMailText>
            </Col>
            <Col md={{ span: 12 }}>
              <SendMailInput>
                <input type="text" placeholder="  @email.com"></input>
                <button>Subscriber</button>
              </SendMailInput>
            </Col>
          </Row>
        </SendMailContainer>
      </div>
    </>
  );
};

export default SendMail;
