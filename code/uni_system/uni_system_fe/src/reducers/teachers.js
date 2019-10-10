import {
ADD_TEACHER
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    teacher: [],
}

const addTeacher = (state, action) => {
    return updateObject(state, {
        student: action.payload,
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TEACHER: return addTeacher(state, action);
        default:
            return state;
    }
}

export default reducer;
