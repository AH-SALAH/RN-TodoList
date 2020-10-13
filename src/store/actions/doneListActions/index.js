import doneListActionTypes from "./ActionTypes";
import AsyncStorage from '@react-native-community/async-storage';

const addDoneListItemAction = payload => {
    return {
        type: doneListActionTypes.ADD_DONE_ITEM,
        payload
    }
};

const searchDoneListItemAction = payload => {
    return {
        type: doneListActionTypes.SEARCH_DONE_LIST,
        payload
    }
};

const deleteDoneListItemAction = payload => {
    return {
        type: doneListActionTypes.DELETE_DONE_ITEM,
        payload
    }
};

const populateDoneListAction = payload => {
    return {
        type: doneListActionTypes.POPULATE_DONE_LIST,
        payload
    }
};

//==========================================

export const addDoneListItem = (item) => {
    if (!item) return;

    try {

        let addToStrg = async () => {
            let newList = null;
            let list = await AsyncStorage.getItem("@DoneList");
            if (!list) {
                newList = await AsyncStorage.setItem("@DoneList", JSON.stringify([item]));
            }
            else {
                let listArr = JSON.stringify([...JSON.parse(list), item]);
                newList = await AsyncStorage.setItem("@DoneList", listArr);
            }
            return newList;
        }
        addToStrg();
        
        return addDoneListItemAction(item);
    } catch (error) {
        console.log(error);
    }
};

export const searchDoneListItem = (item) => {
    if (!item) return;

    try {
        return searchDoneListItemAction(item);
    } catch (error) {
        console.log(error);
    }
};

export const deleteDoneListItem = (item) => {
    if (!item) return;

    try {
        let removeFromStrg = async () => {
            let list = await AsyncStorage.getItem("@DoneList");
            if (list) {
                listArr = JSON.parse(list);
                list = await AsyncStorage.setItem("@DoneList", JSON.stringify(listArr.filter(it => it.id !== item.id)));
            }
        }
        removeFromStrg();
        
        return deleteDoneListItemAction(item);
    } catch (error) {
        console.log(error);
    }
};

export const populateDoneList = (data) => {
    if (!data) return;

    try {
        return populateDoneListAction(data);
    } catch (error) {
        console.log(error);
    }
};
