import {
ADD_STUDENT
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    student: [],
}

const addStudent = (state, action) => {
    return updateObject(state, {
        student: action.payload,
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT: return addStudent(state, action);
        default:
            return state;
    }
}

export default reducer;
