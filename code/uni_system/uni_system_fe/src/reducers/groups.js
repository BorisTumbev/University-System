import {
GET_GROUPS, EDIT_GROUP, ADD_GROUP
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

const addGroup = (state, action) => {
    return updateObject(state, {
        groups:[ action.payload, ...state.groups ]
    });
}

const editGroup = (state, action) => {
    return updateObject(state, {
        groups: state.groups.map(function (group) {
            if (group.id === action.payload.id){
                return{
                    ...group,
                    ...action.payload
                }
            }else{
                return group
            }
        })
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_GROUPS: return getGroups(state, action);
        case EDIT_GROUP: return editGroup(state, action);
        case ADD_GROUP: return addGroup(state, action);
        default:
            return state;
    }
}

export default reducer;
