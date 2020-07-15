import {
ADD_STUDENT, GET_STUDENTS, EDIT_STUDENT, CHANGE_IS_EDIT_FALSE, EDIT_STUDENT_PUT
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
        students:[ action.payload, ...state.students ]
    });
}

const editStudent = (state, action) => {
    return updateObject(state, {
        student: action.payload,
        is_edit: true
    });
}

const changeIsEditFalse = (state, action) => {
    return updateObject(state, {
        is_edit: false
    });
}

const editStudentPut = (state, action) => {
    return updateObject(state, {
        student: action.payload,
        students: state.students.map(function (student) {
            if (student.id === action.payload.id){
                return{
                    ...student,
                    ...action.payload
                }
            }else{
                return student
            }
        })
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT: return addStudent(state, action);
        case GET_STUDENTS: return getStudents(state, action);
        case EDIT_STUDENT: return editStudent(state, action);
        case EDIT_STUDENT_PUT: return editStudentPut(state, action);
        case CHANGE_IS_EDIT_FALSE: return changeIsEditFalse(state, action);
        default:
            return state;
    }
}

export default reducer;
