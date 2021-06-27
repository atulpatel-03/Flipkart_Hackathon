import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "../../asserts/scss/Landing.scss";
import Navbar from "./Navbar"

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <Navbar />
    <div className="landing-img"></div>
      <div className='dark-overlay bg-text'>
        <div className='landing-inner'>
          <h1 className='x-large'>Mailer</h1>
          <p className='lead'>
            It is a Platform for Scheduling your mail , So Create your Mailer profile and Use this website
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary signbtn'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light loginbtn'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
