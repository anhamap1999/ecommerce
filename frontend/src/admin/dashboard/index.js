import React  from 'react';
import { Link } from 'react-router-dom';
import MenuTopAdmin from './menutop';
import SlideBarAdmin from './slidebar';
import './styles.css'
const DashboardScreen = (props) => {
    
    return <div>
        <MenuTopAdmin/>
        <div className="d-flex" id="wrapper">
                <SlideBarAdmin />
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                      
                            {props.children}  

                    </div>
                </div>
    </div>
    </div>
    
      
}

export default DashboardScreen ;