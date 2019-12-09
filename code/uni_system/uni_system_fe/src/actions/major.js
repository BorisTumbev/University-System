import {
GET_MAJORS
} from "./types";
import axios from 'axios';


export const getMajors = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.get('/api/majors', config)
        .then(res =>{
            dispatch({
                type: GET_MAJORS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get majors error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const addMajor = (major) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.post('/api/majors', major, config)
        .then(res =>{
//            dispatch({
//                type: GET_MAJORS,
//                payload: res.data
//            });
        })
        .catch(err => {
            console.log('add majors error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const editMajor = (major) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.put(`/api/majors/${major.id}`, major, config)
        .then(res =>{
//            dispatch({
//                type: GET_MAJORS,
//                payload: res.data
//            });
        })
        .catch(err => {
            console.log('edit majors error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}
