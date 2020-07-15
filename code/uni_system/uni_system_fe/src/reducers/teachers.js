import {
ADD_TEACHER, GET_TEACHERS, EDIT_TEACHER
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    teacher: [],
    teachers: [],
}

const addTeacher = (state, action) => {
    return updateObject(state, {
        teacher: action.payload,
        teachers:[ action.payload, ...state.teachers ]
    });
}

const getTeachers = (state, action) => {
    return updateObject(state, {
        teachers: action.payload,
    });
}

const editTeacher = (state, action) => {
    return updateObject(state, {
        teacher: action.payload,
        teachers: state.teachers.map(function (teacher) {
            if (teacher.id === action.payload.id){
                return{
                    ...teacher,
                    ...action.payload
                }
            }else{
                return teacher
            }
        })
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TEACHER: return addTeacher(state, action);
        case GET_TEACHERS: return getTeachers(state, action);
        case EDIT_TEACHER: return editTeacher(state, action);
        default:
            return state;
    }
}

export default reducer;
