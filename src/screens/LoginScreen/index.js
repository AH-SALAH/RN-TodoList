import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ImageBackground } from "react-native";
import LoginForm from "./LoginForm";
// import loginBg from "../../assets/images/login-bg.jpg";
import bg from "../../assets/images/bg.jpg";

const LoginScreen = (props) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground source={bg} style={styles.bgImage}>
                <View style={[styles.container]}>
                    <LoginForm {...props} />
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff'
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});

export default LoginScreen;
