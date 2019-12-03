import {
AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, RESET_PASS_STATUS_CODE
} from "./types";
import axios from 'axios';

export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authSuccess = (token, user) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
        user: user
    }
}

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return dispatch => {
        axios.post('/api/logout')
        .then(res =>{
            dispatch({
                type: AUTH_LOGOUT
            });
        })
        .catch(err => {
            console.log('logout error-> ' + err)
//            dispatch(authFail(err))
        })
    }
//    return {
//        type: AUTH_LOGOUT
//    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (email, password) => {

    return dispatch => {
        dispatch(authStart());
        axios.post('/api/login', {
            email: email,
            password: password
        })
        .then(res =>{
            console.log(res);
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token, res.data.user));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}


export const authCheckState = (user) => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, user));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}

export const getUser = () => {
    const config = {
        headers: {
            "Authorization": "Token " + localStorage.getItem('token')
        }
    };
    return dispatch => {
        axios.get('/api/user', config)
        .then(res =>{
            dispatch(authCheckState(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const resetPassword = (email) => {

    return dispatch => {
        axios.post('/api/reset-pass', email)
        .then(res =>{
            console.log(res)
            dispatch({
                type: RESET_PASS_STATUS_CODE,
                payload: res.status
            });
        })
        .catch(err => {
            dispatch({
                type: RESET_PASS_STATUS_CODE,
                payload: err.response.status
            });
        })
    }
}

export const resetPasswordConfirm = (token, password) => {

    return dispatch => {
        axios.post(`/api/reset-pass/${token}`, password)
        .then(res =>{
//                dispatch(authCheckState(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const resetPasswordConfirmGET = (token) => {

    return dispatch => {
        axios.get(`/api/reset-pass/${token}`)
        .then(res =>{
            dispatch({
                type: RESET_PASS_STATUS_CODE,
                payload: res.status
            });
        })
        .catch(err => {
            dispatch({
                type: RESET_PASS_STATUS_CODE,
                payload: err.response.status
            });
        })
    }
}
