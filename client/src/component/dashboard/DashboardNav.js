import React from 'react'
import PropTypes from 'prop-types';
import "../../asserts/scss/DashboardNav.scss";
import Drawer from './Drawer';
import slider from "../../asserts/images/slider.png";
import { logout } from '../../redux/actions/auth';
import { connect } from "react-redux";

const DashboardNav = ({logout}) => {

    const handleLogout = () => {
        logout();
        // history.push("/");
        // history.go(0);
    } 

    return (
        <div className="fuild-container landing-navbar-1">
          
             <nav className="navbar navbar-expand-lg navbar-dark dashboard-navbar-1">
                <div className="slider-button"><img src={slider} /></div>
                
                        <a className="navbar-brand logo-navbar" href="/dashboard">✈  Mailer</a>
                        <div class="collapse navbar-collapse topnav" id="navbarText">
                <ul className="navbar-nav ml-auto navbar-btn">
               
            <button to='/' className='btn btn-dark logoutbtn' onClick={handleLogout}>
             Logout
            </button>
        </ul>
                 </div>   
            </nav>
            <Drawer />
        </div>
    )
}

DashboardNav.propTypes = {
    logout: PropTypes.func.isRequired,
}

export default connect(null,{logout})(DashboardNav);
