import doneListActionTypes from "../../actions/doneListActions/ActionTypes";

export const doneListReducer = (state = [], action) => {
    switch (action.type) {
        case doneListActionTypes.ADD_DONE_ITEM:
            return [...state, action.payload];

        case doneListActionTypes.DELETE_DONE_ITEM:
            return [...state.filter(item => item !== action.payload)];

        case doneListActionTypes.POPULATE_DONE_LIST:
            return [...action.payload];

        case doneListActionTypes.SEARCH_DONE_LIST:
            let regex = new RegExp(action.payload.txt, 'gi');
            return action.payload.filteredDoneList.filter(l => l && l.title.search(regex) > -1).length ?
                action.payload.filteredDoneList.filter(l => l && l.title.search(regex) > -1) :
                state.filter(l => l && l.title.search(regex) > -1);

        default:
            return state;
    }
};