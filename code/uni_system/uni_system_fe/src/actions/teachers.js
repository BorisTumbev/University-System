import {
ADD_TEACHER, GET_TEACHERS, EDIT_TEACHER
} from "./types";
import axios from 'axios';


export const addTeacher = (teacher) => {

    return dispatch => {
        axios.post('/api/teachers', teacher)
        .then(res =>{
            dispatch({
                type: ADD_TEACHER,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('add teacher error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const getTeachers = () => {

    return dispatch => {
        axios.get('/api/teachers')
        .then(res =>{
            dispatch({
                type: GET_TEACHERS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get teachers error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const editTeacher = (teacher) => {

    return dispatch => {
        axios.put(`/api/teachers/${teacher.id}`, teacher)
        .then(res =>{
            dispatch({
                type: EDIT_TEACHER,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('edit teacher error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

