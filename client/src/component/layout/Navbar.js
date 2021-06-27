import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "../../asserts/scss/Navbar.scss";

const Navbar = () => {
 
  return (
    <div className="fuild-container landing-navbar">

    <nav className="navbar navbar-expand-lg navbar-dark dashboard-navbar">
        <a className="navbar-brand logo-navbar" href="/"> ✈  Mailer</a>

        <div class="collapse navbar-collapse topnav" id="navbarText">
        <ul className="navbar-nav ml-auto navbar-btn">
        <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-dark loginbtn'>
              Login
            </Link>
        </ul>
  
  </div>
    </nav>
    
</div>
  );
};




export default Navbar;
