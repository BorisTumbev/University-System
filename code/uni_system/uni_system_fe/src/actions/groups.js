import {
GET_GROUPS, ADD_GROUP, EDIT_GROUP
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

export const addGroup = (group) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };

    return dispatch => {
        axios.post('/api/groups', group, config)
        .then(res =>{
            dispatch({
                type: ADD_GROUP,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('add groups error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}

export const editGroup = (group) => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };

    return dispatch => {
        axios.put(`/api/group/${group.id}`, group, config)
        .then(res =>{
            dispatch({
                type: EDIT_GROUP,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('edit group error-> ' + err)
//            dispatch(authFail(err))
        })
    }
}
