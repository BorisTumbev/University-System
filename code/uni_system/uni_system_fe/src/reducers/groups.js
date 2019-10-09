import {
GET_GROUPS
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    groups: [],
}

const getGroups = (state, action) => {
    return updateObject(state, {
        groups: action.payload,
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_GROUPS: return getGroups(state, action);
        default:
            return state;
    }
}

export default reducer;
