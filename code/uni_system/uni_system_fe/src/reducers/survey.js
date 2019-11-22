import {
GET_SURVEY, GET_SURVEY_LOG, GET_SURVEYS, SHOW_ON_HOME
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    survey: {},
    survey_log: [],
    surveys: [],
    survey_on_home: undefined
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

const getSurveys = (state, action) => {
    return updateObject(state, {
        surveys: action.payload,
    });
}

const showOnHome = (state, action) => {
    return updateObject(state, {
        survey_on_home: action.payload.id,
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_SURVEY: return getSurvey(state, action);
        case GET_SURVEY_LOG: return getSurveyLog(state, action);
        case GET_SURVEYS: return getSurveys(state, action);
        case SHOW_ON_HOME: return showOnHome(state, action);
        default:
            return state;
    }
}

export default reducer;
