import {
ADD_STUDENT, GET_STUDENTS, EDIT_STUDENT, EDIT_STUDENT_PUT, CHANGE_IS_EDIT_FALSE
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

export const editStudent = (student) => {
    return dispatch => {
        dispatch({
            type: EDIT_STUDENT,
            payload: student
        });
    }
}

export const changeIsEditFalse = () => {
    return dispatch => {
        dispatch({
            type: CHANGE_IS_EDIT_FALSE,
//            payload:
        });
    }
}

export const editStudentPut = (student) => {

    return dispatch => {
        axios.put(`/api/students/${student.id}`, student)
        .then(res =>{
            dispatch({
                type: EDIT_STUDENT_PUT,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('edit student error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}
