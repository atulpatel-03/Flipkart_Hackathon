import React, { useState, Fragement } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from "react-google-login";
import { googleLogin, register } from "../../redux/actions/auth";
import PropTypes from 'prop-types';
import "../../asserts/scss/Login.scss";
import { Link, Redirect } from "react-router-dom";
import Navbar from '../layout/Navbar';

const Register = ({ googleLogin, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password: ''
  });

const onChange = e => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
};


const {name, email,password } = formData;


const onSubmit = async e => {
    e.preventDefault();
    await register(formData);


};
    const responseSuccessGoogle = (response) => {
        console.log("login", response);
        const obj = {
          tokenId: response.tokenId
        }
        googleLogin(obj);
      }
    
      const responseFailureGoogle = (response) => {
        console.log("fail");
      }

      if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
      } 
    
    return (
      <div className="login-page">
        <Navbar />
      <div className="login-card">
          <div className="my-form">
          <form className="login-form" onSubmit={onSubmit}>
              <h1 className="heading">Sign Up</h1>
              <h3 className="heading2">Create Your Account </h3>
              <div className="form-group">
                  <label>Username</label>
                  <input type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      placeholder="Enter your username"
                      onChange={onChange}
                      required
                  />
              </div>
              <div className="form-group">
                  <label>Email Id</label>
                  <input type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      placeholder="Enter your username"
                      onChange={onChange}
                      required
                  />
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      placeholder="Enter password"
                      onChange={onChange}
                      required
                  />
              </div>
              <button type="submit" className="btn btn-large btn-primary Loginbutton" >Register</button>
      
              <div className="or">or</div>
          <GoogleLogin className="btn btn-large btn-outline-dark"
          clientId="645485184858-lpmdq3q6nefhpt68lj437bmt0v49vv0m.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseFailureGoogle}
          cookiePolicy={'single_host_origin'}
          />

          <p className="my-1">
         Already have an account? <Link to="/login" className="endbtn">Login</Link>
          </p>
          </form>
          
      </div>
     
      </div>
  </div>
    )
}

Register.propTypes = {
  googleLogin: PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { googleLogin,register })(Register);
