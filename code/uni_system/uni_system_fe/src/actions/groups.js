import {
GET_GROUPS
} from "./types";
import axios from 'axios';


export const getGroups = (id = 0) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    let url;
    if(id === 0){
        url = '/api/groups';
    }
    else{
        url = `/api/groups/${id}`;
    }

    return dispatch => {
        axios.get(url, config)
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



