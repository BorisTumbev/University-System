import {
GET_MAJORS
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
