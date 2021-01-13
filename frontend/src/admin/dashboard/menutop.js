import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { BsArrowReturnLeft } from 'react-icons/bs';
const MenuTopAdmin = () => {
  return (
    <div
      className="container-fluid"
      style={{
        background: 'rgb(158, 184, 190)',
        // height: '70px',
        boxShadow: '2px 3px 9px black',
        marginBottom: '10px',
      }}
    >
      <div className="">
        <div className="row" style={{ border: 'none', padding: 'none'}}>
          <div className="col-md-4">
            <h3 style={{ paddingTop: '10px' }}>Quản trị Website</h3>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-2" style={{ margin: 'auto'}}>
            <Link to="/" className="">
              {/* <i className="bx bxs-home"></i> */}
              <h5><BsArrowReturnLeft style={{ fontSize: '20px', marginRight: '10px'}} /> Về trang chủ</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTopAdmin;
