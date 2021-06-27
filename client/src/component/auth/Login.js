import React,{ useState, Fragment } from 'react'
import "../../asserts/scss/Login.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import GoogleLogin from "react-google-login";
import { googleLogin, login } from "../../redux/actions/auth";
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';

const Login = ({ googleLogin, login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email:'',
        password: ''
    });

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };


    const { email, password } = formData;


    const onSubmit = async e => {
        e.preventDefault();
        await login(email,password);


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
        <div className="fluid-container login-page">
        <Navbar />
            <div className="login-card">
                <div className="my-form">
                <form className="login-form" onSubmit={onSubmit}>
                    <h1 className="heading">Login</h1>
                    <h3 className="heading2">Login Into Your Account </h3>
                    <div className="form-group">
                        <label>Email id</label>
                        <input type="text"
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
                    <button type="submit" className="btn btn-large btn-primary Loginbutton" >Login</button>
            
                    <div className="or">or</div>
                <GoogleLogin className="btn btn-large btn-outline-dark"
                clientId="645485184858-lpmdq3q6nefhpt68lj437bmt0v49vv0m.apps.googleusercontent.com"
                buttonText="Login with google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
                cookiePolicy={'single_host_origin'}
                />

                <p className="my-1">
                Don't have an account? <Link to="/register" className="endbtn">Sign Up</Link>
                </p>
                </form>
                
            </div>
           
            </div>
        </div>
      
    )
}

Login.propTypes = {
    googleLogin: PropTypes.func.isRequired,
    login:PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps, { googleLogin, login })(Login);
