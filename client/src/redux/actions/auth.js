import api from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
  } from './types';

  export const loadUser = () => async dispatch => {
    try {
      const res = await api.get('/auth');
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  
export const logout = () => dispatch => {
  localStorage.clear();
  setAuthToken(false);
  dispatch({ type : LOGOUT , payload : {} });
}

  
  
  export const register = formData => async dispatch => {
    try {
      const res = await api.post('/users', formData);
      setAuthToken(res.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      // dispatch(loadUser());
    } catch (err) {
        console.log(err.message);

        dispatch({
            type: REGISTER_FAIL,
            payload:err.message
        })
    }
  };
  
  
  export const login = (email, password) => async dispatch => {
    const body = { email, password };
  
    try {
      const res = await api.post('/auth', body);
      setAuthToken(res.data.token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
      // dispatch(loadUser());
    } catch (err) {
        console.log(err.message);

        dispatch({
            type: LOGIN_FAIL,
            payload:err.message
        })
    }
  };

  export const googleLogin= (data) => async dispatch =>{
      try {
          let res = await api.post('/auth/googlelogin',data);
          setAuthToken(res.data.token);
          console.log("Coming Data",res.data.token);

          dispatch({
            type: LOGIN_SUCCESS,
            payload: res
          });
          
      } catch (err) {
        console.log(err.message);

        dispatch({
            type: LOGIN_FAIL,
            payload:err.message
        })
      }
  }
  