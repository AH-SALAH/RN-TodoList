import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ImageBackground } from "react-native";
import SignupForm from "./SignupForm";
// import loginBg from "../../assets/images/login-bg.jpg";
import bg from "../../assets/images/bg.jpg";

const RegisterScreen = (props) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground source={bg} style={styles.bgImage}>
                <View style={[styles.container]}>
                    <SignupForm {...props} />
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

export default RegisterScreen;
