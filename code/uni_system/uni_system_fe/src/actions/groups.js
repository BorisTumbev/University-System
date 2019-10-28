import {
GET_GROUPS
} from "./types";
import axios from 'axios';


export const getGroups = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.get('/api/groups', config)
        .then(res =>{
            dispatch({
                type: GET_GROUPS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('get groups error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}



