import {
AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    error: null,
    loading: false,
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user: action.user,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
    });
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case AUTH_START: return authStart(state, action);
        case AUTH_SUCCESS: return authSuccess(state, action);
        case AUTH_FAIL: return authFail(state, action);
        case AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;
