import {
    GET_DISCIPLINE_SCHEDULE, GET_DISCIPLINES, GET_DISCIPLINE_MODEL_SCHEDULE, ADD_DISCIPLINE, EDIT_DISCIPLINE, ADD_DISCIPLINE_MODEL_SCHEDULE,
    EDIT_DISCIPLINE_MODEL_SCHEDULE
} from "./types";
import axios from 'axios';


export const getDisciplines = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.get('/api/discipline', config)
        .then(res =>{
            dispatch({
                type: GET_DISCIPLINES,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get discipline error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const addDiscipline = (disc) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.post('/api/discipline', disc, config)
        .then(res =>{
            dispatch({
                type: ADD_DISCIPLINE,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('add discipline error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const editDiscipline = (disc) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.put(`/api/discipline/${disc.id}`, disc, config)
        .then(res =>{
            dispatch({
                type: EDIT_DISCIPLINE,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('edit discipline error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}


export const getDiscSchedule = (major_id = 0) => {
    let url;
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    if(major_id === 0){
        url = '/api/discipline_schedule';
    }
    else{
        url = `/api/discipline_schedule/${major_id}`;
    }

    return dispatch => {
        axios.get(url, config)
        .then(res =>{
            dispatch({
                type: GET_DISCIPLINE_SCHEDULE,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get discipline schedule error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const addDiscSchedule = (obj) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };

    return dispatch => {
        axios.post('/api/discipline_model_schedule', obj, config)
        .then(res =>{
            dispatch({
                type: ADD_DISCIPLINE_MODEL_SCHEDULE,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('add discipline schedule error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const getDiscModelSchedule = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };

    return dispatch => {
        axios.get('/api/discipline_model_schedule', config)
        .then(res =>{
            dispatch({
                type: GET_DISCIPLINE_MODEL_SCHEDULE,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get discipline schedule error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const editDiscModelSchedule = (obj) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };

    return dispatch => {
        axios.put(`/api/discipline_model_schedule/${obj.id}`, obj, config)
        .then(res =>{
            dispatch({
                type: EDIT_DISCIPLINE_MODEL_SCHEDULE,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('edit discipline schedule error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}
