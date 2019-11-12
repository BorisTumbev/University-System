import {
GET_MAJORS
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


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_MAJORS: return getMajors(state, action);
        default:
            return state;
    }
}

export default reducer;
