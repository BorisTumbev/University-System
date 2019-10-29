import {
GET_DISCIPLINE_SCHEDULE, GET_DISCIPLINES
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    discipline_schedule: [],
    disciplines: [],
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

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_DISCIPLINE_SCHEDULE: return getDiscSchedule(state, action);
        case GET_DISCIPLINES: return getDisciplines(state, action);
        default:
            return state;
    }
}

export default reducer;
