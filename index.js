/**
 * @format
 */
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { requestUserMessagingPermission } from "./src/notifications/requestPermissions";
import { backgroundStateMsgHandler } from "./notificationsStates";

const userPrem = requestUserMessagingPermission();
if (userPrem) {
    const bgRemoteMessage = backgroundStateMsgHandler();
    if (bgRemoteMessage) console.log("bgRemoteMessage: ", bgRemoteMessage);
}
// messages headless check for ios only, not exist on android
const HeadlessCheck = ({ isHeadless }) => {
    if (Platform.OS === "ios") {
        if (isHeadless) {
            // App has been launched in the background by iOS, ignore
            return null;
        }

        return <App />;
    }
    else {
        return <App />;
    }
}


AppRegistry.registerComponent(appName, () => HeadlessCheck);
