import {
GET_SURVEY, GET_SURVEY_LOG
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    survey: {},
    survey_log: []
}

const getSurvey = (state, action) => {
    return updateObject(state, {
        survey: action.payload,
    });
}

const getSurveyLog = (state, action) => {
    return updateObject(state, {
        survey_log: action.payload,
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_SURVEY: return getSurvey(state, action);
        case GET_SURVEY_LOG: return getSurveyLog(state, action);
        default:
            return state;
    }
}

export default reducer;
