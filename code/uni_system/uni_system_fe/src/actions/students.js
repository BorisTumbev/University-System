import {
ADD_STUDENT, GET_STUDENTS
} from "./types";
import axios from 'axios';


export const getStudents = () => {

    return dispatch => {
        axios.get('/api/students')
        .then(res =>{
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get student error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const addStudent = (student) => {

    return dispatch => {
        axios.post('/api/students', student)
        .then(res =>{
            dispatch({
                type: ADD_STUDENT,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('add user error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}



