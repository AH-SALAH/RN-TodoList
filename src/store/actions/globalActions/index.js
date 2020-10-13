import globalActionTypes from "./ActionsTypes";
// import AsyncStorage from '@react-native-community/async-storage';

const populateDataAction = payload => {
    return {
        type: globalActionTypes.POPULATE_STORE,
        payload
    }
};

//==========================================

export const populateData = (data) => {
    if (!data) return;

    try {
        return populateDataAction(data);
    } catch (error) {
        console.log(error);
    }
};
