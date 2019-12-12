import {
GET_DISCIPLINE_SCHEDULE, GET_DISCIPLINES
} from "./types";
import axios from 'axios';


export const sendEmail = (group_id, email) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.post(`/api/email/group/${group_id}`, email, config)
        .then(res =>{
//            dispatch({
//                type: GET_DISCIPLINES,
//                payload: res.data
//            });
        })
        .catch(err => {
            console.log('send email error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const sendSurveyEmail = (major_id, survey_id) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.post(`/api/email/survey/${major_id}/${survey_id}`, config)
        .then(res =>{
//            dispatch({
//                type: GET_DISCIPLINES,
//                payload: res.data
//            });
        })
        .catch(err => {
            console.log('send email error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}
