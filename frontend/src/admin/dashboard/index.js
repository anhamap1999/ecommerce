import React  from 'react';
import { Link } from 'react-router-dom';
import SlideBarAdmin from './slidebar';
import './styles.css'
const DashboardScreen = (props) => {
    
    return <div class="d-flex" id="wrapper">
                <SlideBarAdmin />
                <div id="page-content-wrapper">

                    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <Link to='/' class="" >Home </Link>              
                    </nav>

                    <div class="container-fluid">
                        <div className="container">
                            {props.children}  
                        </div>
                    </div>
                </div>
    </div>
    
      
}

export default DashboardScreen ;