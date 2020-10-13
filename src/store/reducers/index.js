import { listReducer } from "./listReducer";
import { doneListReducer } from "./doneListReducer";
import globalActionTypes from "../actions/globalActions/ActionsTypes";

export const root = (state = {}, action) => {

    if(action.type === globalActionTypes.POPULATE_STORE){
        state = action.payload;
    }

    return {
        list: listReducer(state.list, action),
        doneList: doneListReducer(state.doneList, action),
    };
};