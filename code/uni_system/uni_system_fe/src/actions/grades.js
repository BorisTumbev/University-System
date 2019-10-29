import {
GET_GRADES, ADD_GRADE
} from "./types";
import axios from 'axios';


export const addGrade = (grade) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.post('/api/grades', grade, config)
        .then(res =>{
            dispatch({
                type: ADD_GRADE,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('add grades error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const getGrades = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.get('/api/grades', config)
        .then(res =>{
            dispatch({
                type: GET_GRADES,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get grades error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}



