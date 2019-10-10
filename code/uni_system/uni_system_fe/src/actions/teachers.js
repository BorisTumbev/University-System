import {
ADD_TEACHER
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



