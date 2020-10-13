import React, { createContext, useEffect, useReducer } from 'react';
import { root } from "./reducers";
import { useAsyncStorage } from '@react-native-community/async-storage';
import { populateData } from "./actions/globalActions";

export const StoreDispatchContext = createContext();
export const StoreStateContext = createContext();

const StoreProvider = props => {

    const [storeState, dispatch] = useReducer(root, {});
    const { getItem: getList } = useAsyncStorage("@List");
    const { getItem: getDoneList } = useAsyncStorage("@DoneList");

    const readItemFromStorage = async () => {
        try {
            let getListItems = await getList();
            let getDoneListItems = await getDoneList();
            if (getListItems || getDoneListItems) {
                dispatch(
                    populateData({
                        list: (getListItems && JSON.parse(getListItems)) || [],
                        doneList: (getDoneListItems && JSON.parse(getDoneListItems)) || []
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readItemFromStorage();
    }, []);

    return (
        <StoreDispatchContext.Provider value={dispatch}>
            <StoreStateContext.Provider value={storeState}>
                {props.children}
            </StoreStateContext.Provider>
        </StoreDispatchContext.Provider>
    )
}

export default StoreProvider;
