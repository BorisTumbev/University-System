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
        axios.get(`/api/survey/resolve/${id}`, config)
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

export const getSurveyLog = (id = 0) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    let url;
    if(id === 0){
        url = '/api/survey/log/details'
    }
    else{
        url = `/api/survey/log/details/${id}`
    }

    return dispatch => {
        axios.get(url, config)
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


export const editSurvey = (survey) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.put(`/api/survey/${survey.id}`, survey, config)
        .then(res =>{
            dispatch(getSurveys());
//            dispatch({
//                type: GET_SURVEYS,
//                payload: res.data
//            });
        })
        .catch(err => {
            console.log('edit survey error-> ' + err)
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