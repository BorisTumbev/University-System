import {
ADD_TEACHER, GET_TEACHERS
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    teacher: [],
    teachers: [],
}

const addTeacher = (state, action) => {
    return updateObject(state, {
        teacher: action.payload,
    });
}

const getTeachers = (state, action) => {
    return updateObject(state, {
        teachers: action.payload,
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TEACHER: return addTeacher(state, action);
        case GET_TEACHERS: return getTeachers(state, action);
        default:
            return state;
    }
}

export default reducer;
