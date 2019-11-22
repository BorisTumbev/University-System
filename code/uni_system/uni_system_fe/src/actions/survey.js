import {
GET_SURVEY, GET_SURVEY_LOG, GET_SURVEYS, SHOW_ON_HOME
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

export const getSurveyLog = (id) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.get(`/api/survey/log/${id}`, config)
        .then(res =>{
            dispatch({
                type: GET_SURVEY_LOG,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get survey log error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const getSurveys = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.get('/api/survey', config)
        .then(res =>{
            dispatch({
                type: GET_SURVEYS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get surveys error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const showOnHome = (survey) => {
    return dispatch => {
        dispatch({
            type: SHOW_ON_HOME,
            payload: survey
        });
    }
}