import React/*, { useContext }*/ from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// import { tabBarOptions, homeStackGlobalScreenOptions } from "./options";
// import TabIndicator from "../utils/TabIndicator";
// import { Theme } from "../theme";
// import { useTranslation } from 'react-i18next';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
// import { useNavigation } from '@react-navigation/native';

// const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const AuthStack = props => {

    // const { t } = useTranslation();
    // const { theme } = useContext(Theme);

    // const navigation = useNavigation();

    const { setLoggedIn } = props;

    const authStackRoutes = [
        {
            name: "Login In",
            component: LoginScreen,
            options: props => null
        },
        {
            name: "Sign Up",
            component: RegisterScreen,
            options: props => null
        }
    ];

    return (
        <Stack.Navigator
            screenOptions={{
                gestureDirection: "horizontal",
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS
            }}
            // tabBarOptions={tabBarOptions({ theme })}
            // tabBarPosition="bottom"
            lazy={true}
            mode="card"
            headerMode="none"
        >
            {
                authStackRoutes.map(screen =>
                    <Stack.Screen
                        key={screen.name}
                        name={screen.name}
                        component={screen.component}
                        initialParams={{setLoggedIn}}
                        options={(props) => screen.options({ ...props })}
                    />
                )
            }
        </Stack.Navigator>
    )
}

export default AuthStack;