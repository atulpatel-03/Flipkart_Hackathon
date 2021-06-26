import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from "react-google-login";
import { googleLogin } from "../../redux/actions/auth";
import PropTypes from 'prop-types';

const Register = ({ googleLogin }) => {

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
    
    return (
        <div>
             <GoogleLogin
                clientId="645485184858-lpmdq3q6nefhpt68lj437bmt0v49vv0m.apps.googleusercontent.com"
                buttonText="Login with google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
                cookiePolicy={'single_host_origin'}
                />
        </div>
    )
}

Register.propTypes = {
  googleLogin: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

export default connect(null, { googleLogin })(Register);
