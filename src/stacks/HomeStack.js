import React, { useContext, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { tabBarOptions, homeStackGlobalScreenOptions } from "./options";
// import TabIndicator from "../utils/TabIndicator";
import { Theme } from "../theme";
import { useTranslation } from 'react-i18next';
import HomeScreen from "../screens/HomeScreen";
import DoneListScreen from "../screens/DoneListScreen";
import { useNavigation } from '@react-navigation/native';
import { forgroundStateMsgHandler } from "../../notificationsStates";

const Tab = createMaterialTopTabNavigator();

const HomeStack = () => {

    const { t } = useTranslation();
    const { theme } = useContext(Theme);

    const navigation = useNavigation();

    const homeStackRoutes = [
        {
            name: "Task",
            component: HomeScreen,
            options: props => null
        },
        {
            name: "Done List",
            component: DoneListScreen,
            options: props => null
        }
    ];

    useEffect(() => {
        try {
            let RMsg = async () => {
                await forgroundStateMsgHandler((action) => navigation.navigate(action));
            };
            RMsg();
        } catch (error) {
            console.log(error);
        }

        // return () => forgroundStateMsgHandler();

        //eslinter-ignore-this-line
    }, []);

    return (
        // <NavigationContainer independent>
        <Tab.Navigator
            screenOptions={({ route }) => homeStackGlobalScreenOptions({ route, t })}
            tabBarOptions={tabBarOptions({ theme })}
            tabBarPosition="bottom"
            lazy={true}
        >
            {
                homeStackRoutes.map(screen =>
                    <Tab.Screen key={screen.name} name={screen.name} component={screen.component} options={(props) => screen.options({ ...props })} />
                )
            }
            {/* <Tab.Screen name="Task" component={HomeScreen} />
            <Tab.Screen name="Done List" component={DoneListScreen} /> */}
        </Tab.Navigator>

        // </NavigationContainer>
    )
}

export default HomeStack;