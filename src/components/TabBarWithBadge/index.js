import React, { useContext } from 'react'
import { View, Text } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { StoreStateContext } from "../../store/store";
// import { Theme } from "../theme";
// import { useTranslation } from 'react-i18next';

const TabBarWithBadge = ({ focused, color, route }) => {

    const { list, doneList } = useContext(StoreStateContext);
    // const { t } = useTranslation();

    let iconName;

    if (route.name === 'Task') {
        iconName = focused ? 'format-list-checkbox' : 'format-list-bulleted-square';
    }
    else if (route.name === 'Done List') {
        iconName = focused ? 'playlist-check' : 'format-list-checks';
    }
    // else if (route.name === 'Done List1') {
    //     iconName = focused ? 'account' : 'account-circle';
    // }

    // You can return any component that you like here!
    return (
        <View style={{ flex: 1, position: 'relative' }}>
            {
                (

                    route.name === "Task" &&
                    <View
                        style={
                            {
                                width: 17,
                                height: 17,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'red',
                                position: 'absolute',
                                right: -15,
                                top: -5,
                                borderRadius: 17 / 2,
                            }
                        }
                    >
                        <Text style={{ color: '#fff', fontSize: 12 }}>{(list && list.length) || 0}</Text>
                    </View>
                )
                ||
                (

                    route.name === "Done List" &&
                    <View
                        style={
                            {
                                width: 17,
                                height: 17,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'red',
                                position: 'absolute',
                                right: -15,
                                top: -5,
                                borderRadius: 17 / 2,
                            }
                        }
                    >
                        <Text style={{ color: '#fff', fontSize: 12 }}>{(doneList && doneList.length) || 0}</Text>
                    </View>
                )
                ||
                null
            }
            <MaterialCommunityIcons name={iconName} size={22} color={color} />
        </View>
    );
};

export default TabBarWithBadge;