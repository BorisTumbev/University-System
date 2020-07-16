import {
    GET_DISCIPLINE_SCHEDULE, GET_DISCIPLINES, GET_DISCIPLINE_MODEL_SCHEDULE, ADD_DISCIPLINE, EDIT_DISCIPLINE, ADD_DISCIPLINE_MODEL_SCHEDULE,
    EDIT_DISCIPLINE_MODEL_SCHEDULE
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    discipline_schedule: [],
    disciplines: [],
    discipline_model_schedule: []
}

const getDisciplines = (state, action) => {
    return updateObject(state, {
        disciplines: action.payload,
    });
}

const addDiscipline = (state, action) => {
    return updateObject(state, {
        disciplines:[ action.payload, ...state.disciplines ]
    });
}

const editDiscipline = (state, action) => {
    return updateObject(state, {
        disciplines: state.disciplines.map(function (discipline) {
            if (discipline.id === action.payload.id){
                return{
                    ...discipline,
                    ...action.payload
                }
            }else{
                return discipline
            }
        })
    });
}

const getDiscSchedule = (state, action) => {
    return updateObject(state, {
        discipline_schedule: action.payload,
    });
}

const getDiscModelSchedule = (state, action) => {
    return updateObject(state, {
        discipline_model_schedule: action.payload,
    });
}

const addDisciplineModelSchedule = (state, action) => {
    return updateObject(state, {
        discipline_model_schedule:[ action.payload, ...state.discipline_model_schedule ]
    });
}

const editDisciplineModelSchedule = (state, action) => {
    return updateObject(state, {
        discipline_model_schedule: state.discipline_model_schedule.map(function (discipline) {
            if (discipline.id === action.payload.id){
                return{
                    ...discipline,
                    ...action.payload
                }
            }else{
                return discipline
            }
        })
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_DISCIPLINE_SCHEDULE: return getDiscSchedule(state, action);
        case ADD_DISCIPLINE_MODEL_SCHEDULE: return addDisciplineModelSchedule(state, action);
        case EDIT_DISCIPLINE_MODEL_SCHEDULE: return editDisciplineModelSchedule(state, action);
        case GET_DISCIPLINES: return getDisciplines(state, action);
        case GET_DISCIPLINE_MODEL_SCHEDULE: return getDiscModelSchedule(state, action);
        case ADD_DISCIPLINE: return addDiscipline(state, action);
        case EDIT_DISCIPLINE: return editDiscipline(state, action);
        default:
            return state;
    }
}

export default reducer;
