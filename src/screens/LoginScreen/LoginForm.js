import React, { useContext } from 'react';
import { View, TextInput, Text, StyleSheet/*, Button*/, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { Formik/*, useFormik, FormikProvider*/ } from "formik";
import { object as yupObject, string } from "yup";
import { useTranslation, Trans } from 'react-i18next';
import { Theme } from "../../theme";
import logo from "../../assets/images/bootsplash_logo_original.png";
import { useAsyncStorage } from '@react-native-community/async-storage';

const validationSchema = yupObject({
    email: string()
        .label('Email')
        .required(<Trans i18nKey="required" />)
        .email(<Trans i18nKey="message.notAvalidEmail" />)
        .test('customValidateEmail', <Trans i18nKey="message.notAvalidEmail" />, val => {
            return /^[A-Z0-9._-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(val);
        }),
    password: string()
        .label('Password')
        .min(4, <Trans i18nKey="message.minChar" values={{value: 4}} defaults={'At Least {{value}} Characters'} />)
        .required(<Trans i18nKey="required" />)
        .test('numAndAlpha', <Trans i18nKey="message.numAndAlpha" />, val => {
            let oneLetter = /[a-z]/gi.test(val);
            let onenumber = /[0-9]/gi.test(val);
            return oneLetter && onenumber;
        }),
});

const FormFields = props => {

    const { t } = useTranslation();
    const { theme } = useContext(Theme);
    const {
        handleSubmit,
        touched,
        errors,
        isSubmitting,
        handleChange,
        setFieldTouched,
        navigation
    } = props;

    const handleErrorsUI = fieldName => {
        if (!fieldName) return null;

        if (touched[fieldName] && errors[fieldName]) {
            return {
                color: (color) => touched[fieldName] && errors[fieldName] ?
                    color || 'crimson' :
                    touched[fieldName] && !errors[fieldName] ?
                        theme.colors.secondary :
                        theme.colors.primary,
                text: (text) => (
                    touched[fieldName] && errors[fieldName] &&
                    text || <Text style={styles.errorTxt} >{errors[fieldName]}</Text>
                )
                    ||
                    null,
                errorsState: touched[fieldName] && errors[fieldName]
            };
        }
        else {
            return {
                color: (color) => touched[fieldName] && errors[fieldName] ?
                    color || 'crimson' :
                    touched[fieldName] && !errors[fieldName] ?
                        theme.colors.secondary :
                        theme.colors.primary,
                text: () => null,
                errorsState: touched[fieldName] && errors[fieldName]
            }
        }
    };

    return (
        <View style={{ flex: 0, width: '100%' }}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={t('email')}
                    placeholderTextColor="#fff"
                    onChangeText={handleChange('email')}
                    onChange={() => setFieldTouched("email", true)}
                    // onSubmitEditing={handleChange('email')}
                    // onBlur={handleBlur}
                    clearButtonMode="while-editing"
                    highlightColor={handleErrorsUI('email').color()}
                    underlineColorAndroid={handleErrorsUI('email').color()}
                />
                {
                    handleErrorsUI('email').text()
                }
            </View>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={t('password')}
                    placeholderTextColor="#fff"
                    onChangeText={handleChange('password')}
                    onChange={(e) => setFieldTouched('password', true)}
                    // onSubmitEditing={handleChange('password')}
                    // onBlur={handleBlur}
                    clearButtonMode="while-editing"
                    highlightColor={handleErrorsUI('password').color()}
                    underlineColorAndroid={handleErrorsUI('password').color()}
                    secureTextEntry
                />
                {
                    handleErrorsUI('password').text()
                }

            </View>

            <TouchableOpacity onPress={handleSubmit} style={[styles.submitBtn, { opacity: isSubmitting ? 0.5 : 1 }]} disabled={isSubmitting}>
                {(isSubmitting && <ActivityIndicator color="#fff" />) || null}
                <Text
                    style={{ textAlign: 'center', color: '#fff', marginHorizontal: 15 }}
                >
                    {t("login").toUpperCase()}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')} style={[styles.signupBtn, { opacity: isSubmitting ? 0.5 : 1 }]} disabled={isSubmitting}>
                {/* {(isSubmitting && <ActivityIndicator />) || null} */}
                <Text
                    style={{ textAlign: 'center', color: '#999', marginHorizontal: 15 }}
                >
                    {t("signup").toUpperCase()}
                </Text>
            </TouchableOpacity>

        </View>
    )
};

const LoginForm = ({ navigation, route }) => {

    const setLoggedIn = route.params.setLoggedIn;

    const { setItem: setStrgLoggedIn } = useAsyncStorage("LOGGEDIN");

    const initialValues = {
        email: '',
        password: ''
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        if (values) {
            // console.log("Formik values: ", values);
            // setTimeout(() => {
            await setStrgLoggedIn(JSON.stringify(true));
            setSubmitting(false);
            if (setLoggedIn) setLoggedIn(true);
            // navigation.navigate('Task');
            // }, 1000);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={logo} style={{ width: 100, height: 100, marginBottom: 30 }} />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnChange
            >
                {
                    props => (
                        <FormFields {...props} navigation={navigation} />
                    )
                }
            </Formik>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 15,
        width: '90%',
        // height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',
        borderRadius: 15
    },
    input: {
        // marginBottom: 15,
        paddingHorizontal: 15,
        // backgroundColor: '#fff',
        // borderRadius: 50
        color: '#fff',
    },
    submitBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        padding: 15,
        borderRadius: 50,
        backgroundColor: 'royalblue',
        color: '#fff',
        textAlign: 'center',
        shadowColor: 'rgba(0,0,0,0.2)',
        elevation: 7,
    },
    signupBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 15,
        padding: 15,
        borderRadius: 50,
        backgroundColor: '#fff',
        color: '#999',
        textAlign: 'center',
        shadowColor: 'rgba(0,0,0,0.2)',
        elevation: 7,
    },
    errorTxt: {
        color: 'crimson',
        // textAlign: 'center'
        paddingHorizontal: 15,
    },
    inputWrapper: {
        // marginBottom: 15,
        minHeight: 70
    }
});

export default LoginForm;
