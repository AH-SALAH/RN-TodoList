import listActionTypes from "../../actions/listActions/ActionTypes";

export const listReducer = (state = [], action) => {
    switch (action.type) {
        case listActionTypes.ADD_LIST_ITEM:
            return [...state, action.payload];

        case listActionTypes.EDIT_LIST_ITEM:
            return state.map(item => item.id === action.payload.id ? action.payload : item);

        case listActionTypes.DELETE_LIST_ITEM:
            return [...state.filter(item => item.id !== action.payload.id)];

        case listActionTypes.POPULATE_LIST:
            return [...action.payload];

        default:
            return state;
    }
};