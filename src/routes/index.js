import React, { useState, useContext } from 'react';
import {
    View,
} from 'react-native';
import { /*createStackNavigator,*/ TransitionPresets } from '@react-navigation/stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

// import HomeStack from "../stacks/HomeStack";
// import ModalsStack from "../stacks/ModalsStack";
// import HomeScreen from "../screens/HomeScreen";
// import DoneListScreen from "../screens/DoneListScreen";
import DropDownMenu from "../utils/DropDownMenu";
import TabBarWithBadge from "../components/TabBarWithBadge";
import TabIndicator from "../utils/TabIndicator";
import { Theme } from "../theme";
// import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const HomeStackHeaderRight = ({ navigation, route }) => {

    // const { t } = useTranslation();
    const { theme } = useContext(Theme);
    const [settingsMenuVisible, setSettingsMenuVisible] = useState(false);

    return (
        route.name !== "Settings" &&
        <View style={
            {
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                flexDirection: `row`,
                marginHorizontal: 10,
                position: 'relative',
                flex: 1
            }
        }
        >
            <TouchableNativeFeedback onPress={() => setSettingsMenuVisible(!settingsMenuVisible)}>
                <MaterialCommunityIcons.Button
                    name={`dots-vertical`}
                    color={theme.colors.headerIconColor}
                    backgroundColor="transparent"
                    size={20}
                    iconStyle={{ marginRight: 0 }}
                // style={{flex: 1}}   
                />
            </TouchableNativeFeedback>
            <DropDownMenu
                menuVisible={settingsMenuVisible}
                setModalVisible={setSettingsMenuVisible}
                menuOptions={
                    [
                        { label: "Settings", value: "Settings", icon: 'settings' },
                    ]
                }
                navigation={navigation}
            />

        </View>
        ||
        null
    )
};

const HomeStackHeaderLeft = ({ route }) => {

    const { theme } = useContext(Theme);

    let icon = () => {
        switch ((route.state && route.state.routes[route.state.index].name) || route.name) {
            case "Settings":
                return "settings";

            case "Task":
                return "format-list-checkbox";

            case "Done List":
                return "playlist-check";

            default:
                return "playlist-check";
        }
    }

    return (
        <View style={
            {
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                flexDirection: `row`,
                marginHorizontal: 20
            }
        }>

            <MaterialCommunityIcons
                name={icon()}
                color={theme.colors.headerIconColor}
                size={26}
            />
            {/* <Text> {route.name}</Text> */}
        </View>
    )

};

export const homeStackOptions = ({ navigation, route, theme, t }) => {

    return {
        // title: t((route.state && route.state.routes[route.state.index].name) || route.name || "Task"),
        // headerTitle: () => <Text style={{fontSize: 16}}>{t((route.state && route.state.routes[route.state.index].name) || route.name || "Task")}</Text>,
        headerLeft: (onPress, label, labelStyle) =>
            i18n.dir() === "ltr" ?
                <HomeStackHeaderLeft route={route} /> :
                <HomeStackHeaderRight route={route} navigation={navigation} />,
        headerRight: () => i18n.dir() === "ltr" ?
            <HomeStackHeaderRight route={route} navigation={navigation} /> :
            <HomeStackHeaderLeft route={route} />,
        headerStyle: { backgroundColor: theme.colors.headerBackground },
        headerTintColor: theme.colors.headerTintColor,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
    }
};

export const modalsStackOptions = ({ navigation, route, theme, t }) => {

    return {
        // title: t((route.state && route.state.routes[route.state.index].name) || route.name || "Task"),
        // headerTitle: () => <Text style={{fontSize: 16}}>{t((route.state && route.state.routes[route.state.index].name) || route.name || "Task")}</Text>,
        headerStyle: { backgroundColor: theme.colors.headerBackground },
        headerTintColor: theme.colors.headerTintColor,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
    }
};

// export const rootStackRoutes = [
//     {
//         name: "Task",
//         component: HomeStack,
//         options: props => homeStackOptions(props)
//     },
//     {
//         name: "Settings",
//         component: ModalsStack,
//         options: props => modalsStackOptions(props)
//     }
// ];

//===============================================

export const homeStackGlobalScreenOptions = ({ route, t }) =>
    (
        {
            title: t(route.name),
            tabBarIcon: ({ focused, color }) => <TabBarWithBadge focused={focused} color={color} route={route} />,
        }
    );

//================================================

export const tabBarOptions = ({ theme }) => {
    return {
        activeTintColor: theme.colors.primary || 'indigo',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        // activeBackgroundColor: theme.colors.tabsBackground,
        showIcon: true,
        showLabel: false,
        style: { padding: 0, margin: 0, backgroundColor: theme.colors.tabsBackground },
        // iconStyle: {margin: 0, padding: 0},
        labelStyle: { margin: 0, padding: 0, fontSize: 12 },
        // tabStyle: {paddingTop: 10, backgroundColor: theme.colors.tabsBackground},
        renderIndicator: (route) => <TabIndicator route={route} />,
        // indicatorStyle: {backgroundColor: 'red'}
    };
};

// export const homeStackRoutes = [
//     {
//         name: "Task",
//         component: HomeScreen,
//         options: props => null
//     },
//     {
//         name: "Done List",
//         component: DoneListScreen,
//         options: props => null
//     }
// ];