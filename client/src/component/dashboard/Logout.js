import React from 'react'
import PropTypes from 'prop-types';
import DashboardNav from './DashboardNav';
import { logout } from '../../redux/actions/auth';
import { connect } from "react-redux";
import "../../asserts/scss/Logout.scss";
const Logout = ({logout}) => {

    const handleLogout = () => {
        logout();
        // history.push("/");
        // history.go(0);
    } 
    return (
        <div>
            <DashboardNav />
            <div className="logout">
            <h3>Logout Your Accout from Here</h3>
            <button to='/' className='btn btn-primary loginbtn' onClick={handleLogout}>
             Logout
            </button>
            </div>
        </div>
    )
}

Logout.propTypes = {
logout:PropTypes.func.isRequired,
}

export default connect(null,{logout})(Logout);
