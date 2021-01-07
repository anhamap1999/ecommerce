import React  from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
const MenuTopAdmin = () => {
    
    return  <div className="container-fluid" style={{ background :'#5058C7'}}>
        <div className="" >
            <div className="row">
                <div className="col-md-4">
                    <h3 style={{ paddingTop: '10px'}}>Quản trị Website</h3>
                </div>
                <div className="col-md-6">
                   
                </div>         
                <div className="col-md-2">
                    <Link to='/' className="" >
                        <i class='bx bxs-home'></i>
                    </Link>    
                </div>
            </div>
        </div>
    </div>

}

export default MenuTopAdmin ;