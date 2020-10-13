import React, { useContext, useState, useEffect } from 'react';
import {
    // View,
    Text,
    ActivityIndicator,
    ImageBackground
} from 'react-native';
import { createStackNavigator/*, TransitionPresets*/ } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import HomeStack from "./HomeStack";
import ModalsStack from "./ModalsStack";
import AuthStack from "./AuthStack";
// import SettingScreen from "../screens/SettingScreen";
// import { rootStackRoutes } from "../routes";
import { homeStackOptions, modalsStackOptions } from "./options";
// import DropDownMenu from "../utils/DropDownMenu";
import { Theme } from "../theme";
import { useTranslation } from 'react-i18next';
// import i18n from '../i18n';
// import { forgroundStateMsgHandler } from "../../notificationsStates";
import { useAsyncStorage } from '@react-native-community/async-storage';
import bg from "../assets/images/bg.jpg";


const RootStack = createStackNavigator();

const Root = () => {

    const { theme } = useContext(Theme);
    const { t } = useTranslation();

    const { getItem: getLoggedin, removeItem: removeLoggedin } = useAsyncStorage("LOGGEDIN");
    const [loggedIn, setLoggedIn] = useState(null);
  

    const marginHorizontal = (route) => ((route.state && route.state.routes[route.state.index].name) || route.name) === "Done List" ? 10 : 5

    // const { navigation } = useNavigation();

    const rootStackRoutes = [
        {
            name: "Task",
            component: HomeStack,
            options: props => homeStackOptions(props)
        },
        {
            name: "Settings",
            component: ModalsStack,
            options: props => modalsStackOptions(props)
        },
        // {
        //     name: "Auth",
        //     component: AuthStack,
        //     options: props => null
        // },
    ];

    useEffect(() => {

        let logged = async () => {
          await removeLoggedin();
          let isIn = await getLoggedin();
          setLoggedIn(Boolean(JSON.parse(isIn)));
        };
        logged();
    
      }, [loggedIn]);

    // useEffect(() => {
    //     try {
    //         let RMsg = async () => {
    //             let remoteMsg = await forgroundStateMsgHandler();
    //             if (remoteMsg && remoteMsg.data) {
    //                 console.log("forGroundRemoteMsg: ", remoteMsg);
    //                 // navigation.navigate(remoteMsg.data?.type);
    //             }
    //         };
    //         RMsg();
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     // return () => forgroundStateMsgHandler();

    //     //eslinter-ignore-this-line
    // }, []);

    return (
        <>
            {
                loggedIn && loggedIn !== null ?

                    <RootStack.Navigator
                        screenOptions={({ navigation, route }) => {
                            return {
                                // title: t((route.state && route.state.routes[route.state.index].name) || route.name || "Task"),
                                headerTitle: () => <Text style={{ flex: 1, fontSize: 16, color: theme.colors.text, marginHorizontal: marginHorizontal(route) }}>{t((route.state && route.state.routes[route.state.index].name) || route.name || "Task")}</Text>,
                            }
                        }}
                        headerMode={"float"}
                        initialRouteName={"Task"}
                    >
                        {
                            rootStackRoutes.map(stack =>
                                <RootStack.Screen
                                    key={stack.name}
                                    name={stack.name}
                                    component={stack.component}
                                    options={(props) => stack.options({ theme, t, ...props })}
                                />
                            )
                        }
                    </RootStack.Navigator>
                    :
                    !loggedIn && loggedIn !== null ?
                        <AuthStack setLoggedIn={setLoggedIn} />
                        :
                        <ImageBackground source={bg} style={{ flex: 1, justifyContent: 'center' }} >
                            <ActivityIndicator size="large" color="#fff" />
                        </ImageBackground>
            }
        </>
    )
}

export default Root;