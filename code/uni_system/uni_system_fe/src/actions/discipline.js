import {
GET_DISCIPLINE_SCHEDULE, GET_DISCIPLINES
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
