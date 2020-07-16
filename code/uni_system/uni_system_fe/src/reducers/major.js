import {
GET_MAJORS, ADD_MAJOR, EDIT_MAJOR
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    majors: []
}

const getMajors = (state, action) => {
    return updateObject(state, {
        majors: action.payload,
    });
}

const addMajor = (state, action) => {
    return updateObject(state, {
        majors:[ action.payload, ...state.majors ]
    });
}

const editMajor = (state, action) => {
    return updateObject(state, {
        majors: state.majors.map(function (major) {
            if (major.id === action.payload.id){
                return{
                    ...major,
                    ...action.payload
                }
            }else{
                return major
            }
        })
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_MAJORS: return getMajors(state, action);
        case ADD_MAJOR: return addMajor(state, action);
        case EDIT_MAJOR: return editMajor(state, action);
        default:
            return state;
    }
}

export default reducer;
