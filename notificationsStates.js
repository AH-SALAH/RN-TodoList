import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export const forgroundStateMsgHandler = async (cb) => {
    return messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage), [
            // {
            //   text: 'Ask me later',
            //   onPress: () => console.log('Ask me later pressed')
            // },
            // {
            //   text: 'Cancel',
            //   onPress: () => console.log('Cancel Pressed'),
            //   style: 'cancel'
            // },
            { text: 'OK', onPress: () => { if (cb && typeof cb === "function") cb(remoteMessage.data?.type); } }
        ]);
        // if (cb && typeof cb === "function") cb(remoteMessage.data?.type);
        return remoteMessage;
    });
};

export const backgroundStateMsgHandler = async (cb) => {
    // Register background handler
    return messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        if (cb && typeof cb === "function") cb();
        return remoteMessage;
    });
};