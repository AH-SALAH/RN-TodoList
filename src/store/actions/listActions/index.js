import listActionTypes from "./ActionTypes";
import AsyncStorage from '@react-native-community/async-storage';

const addListItemAction = payload => {
    return {
        type: listActionTypes.ADD_LIST_ITEM,
        payload
    }
};

const editListItemAction = payload => {
    return {
        type: listActionTypes.EDIT_LIST_ITEM,
        payload
    }
};

const deleteListItemAction = payload => {
    return {
        type: listActionTypes.DELETE_LIST_ITEM,
        payload
    }
};

const populateListAction = payload => {
    return {
        type: listActionTypes.POPULATE_LIST,
        payload
    }
};

//==========================================

export const addListItem = (item) => {
    if (!item) return;

    try {
        let addToStrg = async () => {
            let newList = null;
            let list = await AsyncStorage.getItem("@List");
            if (!list) {
                newList = await AsyncStorage.setItem("@List", JSON.stringify([item]));
            }
            else {
                let listArr = JSON.stringify([...JSON.parse(list), item]);
                newList = await AsyncStorage.setItem("@List", listArr);
            }
            return newList;
        }
        addToStrg();

        return addListItemAction(item);
    } catch (error) {
        console.log(error);
    }
};

export const editListItem = (item) => {
    if (!item) return;

    try {
        let editToStrg = async () => {
            let newList = null;
            let list = await AsyncStorage.getItem("@List");
            if (!list) {
                newList = await AsyncStorage.setItem("@List", JSON.stringify([item]));
            }
            else {
                let listArr = JSON.stringify([...JSON.parse(list).map(l => l.id !== item.id ? l : item)]);
                newList = await AsyncStorage.setItem("@List", listArr);
            }
            return newList;
        }
        editToStrg();

        return editListItemAction(item);
    } catch (error) {
        console.log(error);
    }
};

export const deleteListItem = (item) => {
    if (!item) return;

    try {
        let removeFromStrg = async () => {
            let list = await AsyncStorage.getItem("@List");
            if (list) {
                listArr = JSON.parse(list);
                list = await AsyncStorage.setItem("@List", JSON.stringify(listArr.filter(it => it.id !== item.id)));
            }
        }
        removeFromStrg();

        return deleteListItemAction(item);
    } catch (error) {
        console.log(error);
    }
};

export const populateList = (data) => {
    if (!data) return;

    try {
        return populateListAction(data);
    } catch (error) {
        console.log(error);
    }
};
