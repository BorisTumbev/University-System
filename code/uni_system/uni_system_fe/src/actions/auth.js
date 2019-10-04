import {
AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT
} from "./types";
import axios from 'axios';

export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (email, password) => {

    return dispatch => {
        dispatch(authStart());
        axios.post('/rest-auth/login/', {
            email: email,
            password: password
        })
        .then(res =>{
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

