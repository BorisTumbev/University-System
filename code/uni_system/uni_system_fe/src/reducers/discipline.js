import {
GET_DISCIPLINE_SCHEDULE
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    discipline_schedule: [],
}

const getDiscSchedule = (state, action) => {
    return updateObject(state, {
        discipline_schedule: action.payload,
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_DISCIPLINE_SCHEDULE: return getDiscSchedule(state, action);
        default:
            return state;
    }
}

export default reducer;
