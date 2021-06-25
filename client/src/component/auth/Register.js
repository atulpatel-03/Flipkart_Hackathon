import React from 'react';
import GoogleLogin from "react-google-login";

const Register = () => {

    const responseSuccessGoogle = (response) => {
        console.log("login", response)
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

export default Register
