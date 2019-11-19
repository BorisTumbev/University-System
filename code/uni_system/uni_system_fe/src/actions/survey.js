import {
GET_SURVEY
} from "./types";
import axios from 'axios';


export const addSurvey = (survey) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.post('/api/survey', survey, config)
        .then(res =>{
//            dispatch({
//                type: GET_MAJORS,
//                payload: res.data
//            });
        })
        .catch(err => {
            console.log('add survey error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const getSurvey = (id) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.get(`/api/survey/${id}`, config)
        .then(res =>{
            dispatch({
                type: GET_SURVEY,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get survey error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const logSurvey = (survey) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.post('/api/survey/log', survey, config)
        .then(res =>{
//            dispatch({
//                type: GET_SURVEY,
//                payload: res.data
//            });
        })
        .catch(err => {
            console.log('log survey error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}