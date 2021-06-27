import {
    HISTORY_MAILS,
    YOUR_MAILS,
    POST_ERROR
  } from '../actions/types';
  
  const initialState = {
    loading: true,
    yourmails:null,
    historymails:null,
    error:null,
  };
  
  function authReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
     case HISTORY_MAILS:
         return{
             ...state,
             loading:false,
             historymails:payload
         };
    case YOUR_MAILS:
        return{
            ...state,
            loading:false,
            yourmails:payload
        };
    case POST_ERROR:
        return{
            ...state,
            loading:false,
            error:payload
        };
    
    default:
        return state;
    }
  }
  
  export default authReducer;
  