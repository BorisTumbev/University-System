import {
GET_DISCIPLINE_SCHEDULE
} from "./types";
import axios from 'axios';


export const getDiscSchedule = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.get('/api/discipline', config)
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
