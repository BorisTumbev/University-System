import {
ADD_STUDENT
} from "./types";
import axios from 'axios';


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



