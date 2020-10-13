import React, { /*useState,*/ useContext } from 'react';
// import {
//     View,
// } from 'react-native';
import { createStackNavigator/*, TransitionPresets*/ } from '@react-navigation/stack';
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import SettingScreen from "../screens/SettingScreen";
import { Theme } from "../theme";
import { useTranslation } from 'react-i18next';
import { modalsStackScreenOptions } from "./options";

const ModalStack = createStackNavigator();

const ModalsStack = () => {

    const { t } = useTranslation();
    const { theme } = useContext(Theme);

    // const screenOptions = ({ navigation, route }) => {
    //     return {
    //         title: `${t((route.state && route.state.routes[route.state.index].name) || route.name || "Task")}`,
    //         headerLeft: () => {
    //             return (
    //                 <View style={
    //                     {
    //                         display: `flex`,
    //                         justifyContent: `center`,
    //                         alignItems: `center`,
    //                         flexDirection: `row`,
    //                         marginLeft: 20
    //                     }
    //                 }>

    //                     <MaterialCommunityIcons
    //                         name={`settings`}
    //                         color={theme.colors.headerIconColor}
    //                         size={26}
    //                     />
    //                     {/* <Text> {route.name}</Text> */}
    //                 </View>
    //             )
    //         },
    //         headerStyle: { backgroundColor: theme.colors.headerBackground },
    //         headerTintColor: theme.colors.headerTintColor,
    //         gestureEnabled: true,
    //         gestureDirection: "horizontal",
    //         ...TransitionPresets.SlideFromRightIOS,
    //     };
    // };

    return (
        <ModalStack.Navigator
            mode="modal"
            screenOptions={({navigation, route}) => modalsStackScreenOptions({navigation, route, t, theme})}
        >
            <ModalStack.Screen name="Settings" component={SettingScreen} options={{ headerShown: false, title: t("Settings") }} />
        </ModalStack.Navigator>
    );
};

export default ModalsStack;


