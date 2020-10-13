import React, { /*useEffect,*/ useContext, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTranslation } from 'react-i18next';
import { createForm } from 'rc-form';
import { Theme } from '../../theme';

const FormFields = (props) => {

    const { t } = useTranslation();
    // const { theme } = useContext(Theme);
    const { getFieldDecorator, handleSubmit, getFieldError } = props;

    // useEffect(() => {
    //     getFieldDecorator = props.getFieldDecorator;
    //     handleSubmit = props.handleSubmit;
    //     getFieldError = props.getFieldError;

    // }, [props]);

    return (
        <View style={{ flex: 0, width: '100%' }}>
            <View>
                {
                    getFieldDecorator('email', {
                        // validateFirst: true,
                        rules: [
                            {
                                // required: true,
                                message: t('required'),
                                type: 'email'
                            }
                        ],
                        initialValues: ''
                    })(
                        <TextInput
                            style={[styles.input, { borderColor: getFieldError('email') ? 'crimson' : 'transparent', borderWidth: getFieldError('email') ? 1 : 0 }]}
                            placeholder={t('email')}
                            // onChangeText={props.handleChange('email')}
                            onSubmitEditing={handleSubmit}
                            clearButtonMode="while-editing"
                        />
                    )
                }
                {
                    (
                        getFieldError('email') &&
                        <Text style={{ textAlign: 'center', color: 'crimson', marginBottom: 15 }} >
                            {getFieldError('email')}
                        </Text>
                    )
                    ||
                    null
                }

            </View>
            <View>
                {
                    getFieldDecorator('password', {
                        // validateFirst: true,
                        rules: [
                            {
                                required: true,
                                message: t('required')
                            },
                            {
                                pattern: /\w\d/gi,
                                message: t('messages.numAndAlpha')
                            }
                        ],
                        initialValues: ''
                    })(
                        <TextInput
                            style={[styles.input, { borderColor: getFieldError('password') ? 'crimson' : 'transparent', borderWidth: getFieldError('email') ? 1 : 0 }]}
                            placeholder={t('password')}
                            // onChangeText={props.handleChange('password')}
                            onSubmitEditing={handleSubmit}
                            clearButtonMode="while-editing"
                            secureTextEntry
                        />
                    )
                }
                {

                    (
                        getFieldError('password') &&
                        <Text style={{ textAlign: 'center', color: 'crimson', marginBottom: 15 }} >
                            {getFieldError('password')}
                        </Text>
                    )
                    ||
                    null
                }
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                <Text
                    style={{ textAlign: 'center', color: '#fff' }}
                >
                    {t("login").toUpperCase()}
                </Text>
            </TouchableOpacity>

        </View>
    )
};

const LoginForm = props => {

    const { t } = useTranslation();
    const { theme } = useContext(Theme);
    const [loading, setLoading] = useState(true);

    const { getFieldValue, validateFields, getFieldDecorator, resetFields, getFieldError, setFieldsValue, isFieldTouched } = props.form;

    const handleSubmit = () => {
        setLoading(true);
        validateFields(async (errs, values) => {
            if (!errs) {
                console.log("rc values: ", values);
                // resetFields();
            }
            else {
                alert("solve Props 1st: " + JSON.stringify(Object.keys(errs)));
                // console.log("solve Props 1st: ", JSON.stringify(Object.keys(errs)));
            }
            setLoading(false);
        });
    };

    return (
        <View style={styles.container}>
            {/* <FormFields
                getFieldDecorator={getFieldDecorator}
                handleSubmit={handleSubmit}
                getFieldError={getFieldError}
            /> */}

            <View style={{ flex: 0, width: '100%' }}>
                <View>
                    {
                        getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: t('required'),
                                },
                                {
                                    message: t('message.notAvalidEmail'),
                                    type: 'email'
                                    // validator: (rule, value, callback)=>{

                                    // }
                                }
                            ],
                            initialValues: ''
                        })(
                            <TextInput
                                style={[styles.input]}
                                placeholder={t('email')}
                                // onChangeText={(txt) => setFieldsValue({'email': txt})}
                                // onSubmitEditing={handleSubmit}
                                highlightColor={isFieldTouched('email') && getFieldError('email') && getFieldError('email').length ? 'crimson' : theme.colors.primary}
                                underlineColorAndroid={isFieldTouched('email') && getFieldError('email') ? 'crimson' : theme.colors.primary}
                                // clearButtonMode="while-editing"
                            />
                        )
                    }
                    {
                        (
                            isFieldTouched('email') && getFieldError('email') && getFieldError('email').length &&
                            <Text style={{ textAlign: 'center', color: 'crimson', marginBottom: 15 }} >
                                {getFieldError('email')}
                            </Text>
                        )
                        ||
                        null
                    }

                </View>
                <View>
                    {
                        getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: t('required')
                                },
                                {
                                    pattern: /(\d){4,}/gi,
                                    // validator: (rule, value, callback)=>{
                                    //   return value.test(/\w\d/gi);
                                    //     //  ? callback() : callback(t('messages.numAndAlpha'));  
                                    // },
                                    message: t('message.numAndAlpha')
                                }
                            ],
                            initialValues: ''
                        })(
                            <TextInput
                                style={[styles.input]}
                                placeholder={t('password')}
                                highlightColor={isFieldTouched('password') && getFieldError('password') && getFieldError('password').length ? 'crimson' : theme.colors.primary}
                                underlineColorAndroid={isFieldTouched('password') && getFieldError('password') ? 'crimson' : theme.colors.primary}
                                // onChangeText={(txt) => setFieldsValue({'password': txt})}
                                // onSubmitEditing={handleSubmit}
                                // clearButtonMode="while-editing"
                                secureTextEntry
                            />
                        )
                    }
                    {

                        (
                            isFieldTouched('password') && getFieldError('password') && getFieldError('password').length &&
                            <Text style={{ textAlign: 'center', color: 'crimson', marginBottom: 15 }} >
                                {getFieldError('password')}
                            </Text>
                        )
                        ||
                        null
                    }
                </View>

                <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                    {(loading && <ActivityIndicator color="#fff" />) || null}
                    <Text
                        style={{ textAlign: 'center', color: '#fff', marginHorizontal: 15 }}
                    >
                        {t("login").toUpperCase()}
                    </Text>
                </TouchableOpacity>

            </View>

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
        backgroundColor: '#fff',
        borderRadius: 15
    },
    input: {
        marginBottom: 15,
        paddingHorizontal: 15,
        // backgroundColor: '#fff',
        // borderRadius: 50
    },
    submitBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        padding: 15,
        borderRadius: 50,
        backgroundColor: 'royalblue',
        color: '#fff',
        textAlign: 'center',
        shadowColor: 'rgba(0,0,0,0.2)',
        elevation: 7,
    },
});

export default createForm('Login-form')(LoginForm);
