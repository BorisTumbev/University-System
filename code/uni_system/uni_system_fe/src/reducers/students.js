import {
ADD_STUDENT, GET_STUDENTS, EDIT_STUDENT
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    student: [],
    students: [],
    is_edit: false,
}

const getStudents = (state, action) => {
    return updateObject(state, {
        students: action.payload,
    });
}

const addStudent = (state, action) => {
    return updateObject(state, {
        student: action.payload,
    });
}

const editStudent = (state, action) => {
    return updateObject(state, {
        student: action.payload,
        is_edit: true
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT: return addStudent(state, action);
        case GET_STUDENTS: return getStudents(state, action);
        case EDIT_STUDENT: return editStudents(state, action);
        default:
            return state;
    }
}

export default reducer;
