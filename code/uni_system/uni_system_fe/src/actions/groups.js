import {
GET_GROUPS
} from "./types";
import axios from 'axios';


export const getGroups = () => {

    return dispatch => {
        axios.get('/api/groups')
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



