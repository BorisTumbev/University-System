import {
GET_GRADES
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    grades: [],
}


const getGrades = (state, action) => {
    return updateObject(state, {
        grades: action.payload,
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_GRADES: return getGrades(state, action);
        default:
            return state;
    }
}

export default reducer;
