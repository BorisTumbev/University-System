import {
GET_SURVEY
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    survey: {}
}

const getSurvey = (state, action) => {
    return updateObject(state, {
        survey: action.payload,
    });
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_SURVEY: return getSurvey(state, action);
        default:
            return state;
    }
}

export default reducer;
