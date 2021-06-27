import api from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";

import {
   HISTORY_MAILS,
   POST_ERROR,
   USER_LOADED,
   YOUR_MAILS
  } from './types';


// export const yourMails= () => async dispatch =>{
//     try {
//         console.log("before");
//         let res = await api.get('/post/yourmail');
        
//         console.log("after");
//         dispatch({
//             type:YOUR_MAILS,
//             payload:res
//         })
        
//     } catch (err) {
//         console.log(err.message);

//         dispatch({
//             type: POST_ERROR,
//             payload:err.message
//         })
//     }
// }

// export const historyMails= () => async dispatch =>{
//     try {
//         let result = await api.get('/post/history');

//         dispatch({
//             type:HISTORY_MAILS,
//             payload:result
//         })
//     } catch (err) {
//         console.log(err.message);

//         dispatch({
//             type: POST_ERROR,
//             payload:err.message
//         })
//     }
// }


export const sendMail = (formData) => async dispatch =>{
    try {
        
        let user = await api.post('/post/send',formData);

        dispatch({
            type:USER_LOADED,
            payload:user
        })

    } catch (err) {
        console.log(err.message);

        dispatch({
            type: POST_ERROR,
            payload:err.message
        })
    }
}

export const deleteHistoryMail = (notifyID) => async dispatch =>{
    try {

        let user = await api.put(`/post/history/deletemail/${notifyID}`);

        dispatch({
            type:USER_LOADED,
            payload:user
        })

    } catch (err) {
        console.log(err.message);

        dispatch({
            type: POST_ERROR,
            payload:err.message
        })
    }
}


export const deleteYourMail = (notifyID) => async dispatch =>{
    try {

        let user = await api.put(`/post/yourmails/deletemail/${notifyID}`);

        dispatch({
            type:USER_LOADED,
            payload:user
        })

    } catch (err) {
        console.log(err.message);

        dispatch({
            type: POST_ERROR,
            payload:err.message
        })
    }
}