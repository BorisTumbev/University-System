import {
GET_DISCIPLINE_SCHEDULE, GET_DISCIPLINES, GET_DISCIPLINE_MODEL_SCHEDULE
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

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_DISCIPLINE_SCHEDULE: return getDiscSchedule(state, action);
        case GET_DISCIPLINES: return getDisciplines(state, action);
        case GET_DISCIPLINE_MODEL_SCHEDULE: return getDiscModelSchedule(state, action);
        default:
            return state;
    }
}

export default reducer;
