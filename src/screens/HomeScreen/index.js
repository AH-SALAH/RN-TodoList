import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    // FlatList,
    // KeyboardAvoidingView,
    // Platform,
    Button,
    // LayoutAnimation,
    Animated,
    I18nManager
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { FlatList, TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { useTheme } from "@react-navigation/native";

import { StoreDispatchContext, StoreStateContext } from "../../store/store";
import { addListItem, editListItem, deleteListItem } from "../../store/actions/listActions";
// import { listReducer } from "../../store/reducers/listReducer";
import { addDoneListItem } from "../../store/actions/doneListActions";
import { Theme } from "../../theme";
import { useTranslation } from 'react-i18next';
// import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({ navigation, route }) => {

    const dispatch = useContext(StoreDispatchContext);
    const {list/*, doneList*/} = useContext(StoreStateContext);
    // const [state, dispatch] = useReducer(listReducer, []);

    const { t } = useTranslation();
    const { theme } = useContext(Theme);

    const [inputVal, setInputVal] = useState('');
    const [translateCompX, setTranslateCompX] = useState(new Animated.Value(200));

    useEffect(() => {
        Animated.spring(translateCompX, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
        }).start(() => {
            route && route.name !== "Task" ? setTranslateCompX(200) : null;
        });
    }, []);

    const handleAdd = (e) => {
        let txt = (e && e.nativeEvent && e.nativeEvent.text) || inputVal;
        if (!txt) return alert(t("add_value_alert"));

        dispatch(addListItem({ title: txt, checked: false, id: "" + Math.random() }));
        setInputVal('');
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Animated.View
                style={[styles.row, { transform: [{ translateX: translateCompX }] }]}
            >
                <View style={[styles.col, { flex: 0 }]}>
                    <View style={[styles.cardContainer, { minHeight: null, flex: 0, backgroundColor: theme.colors.cardBackground, padding: 15 }]}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder={t("Add New Task")}
                                clearButtonMode="while-editing"
                                style={styles.addNewTaskInput}
                                value={inputVal}
                                onChangeText={(txt) => setInputVal(txt)}
                                onSubmitEditing={(e) => handleAdd(e)}
                            />
                        </View>
                        <View style={[{ flex: 0, justifyContent: `flex-start`, alignItems: `stretch`, marginTop: 15 }]}>
                            <TouchableOpacity onPress={(e) => handleAdd(e)}>
                                <Button title={t("Add")} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styles.col, { paddingTop: 0 }]}>
                    <View style={[styles.cardContainer, { backgroundColor: theme.colors.cardBackground }]}>
                        {
                            (
                                list &&
                                list.length &&
                                <FlatList
                                    style={styles.list}
                                    data={list}
                                    // refreshControl
                                    keyExtractor={(item, index) => item.id || index}
                                    renderItem={(props) => <ListItem {...props} />}
                                />
                            )
                            ||
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="emoticon-sad-outline" size={60} color="rgba(0,0,0,0.2)" />
                                <Text style={{ color: 'rgba(0,0,0,0.2)' }}>{t("No Tasks")}</Text>
                            </View>
                        }
                    </View>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const ListItem = ({ item, index }) => {

    const dispatch = useContext(StoreDispatchContext);
    // const {list, doneList} = useContext(StoreStateContext);
    // const { colors } = useTheme();
    const { theme } = useContext(Theme);

    const translateItemX = useRef(new Animated.Value(200)).current;
    const fadeItemX = useRef(new Animated.Value(0)).current;
    const fadeItemY = useRef(new Animated.Value(1)).current;
    const translateItemY = useRef(new Animated.Value(0)).current;

    const handleDelete = (cb) => {
        Animated.parallel([
            Animated.timing(fadeItemY, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true
            }),
            Animated.spring(translateItemY, {
                toValue: 50,
                duration: 150,
                useNativeDriver: true
            }),
        ]).start(() => {
            dispatch(deleteListItem(item));
            if (cb && typeof cb === 'function') cb();
        });
    };

    const handleDone = () => {
        handleDelete(() => dispatch(addDoneListItem(item)));
    };

    useEffect(() => {
        Animated.parallel([
            Animated.spring(translateItemX, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true
            }),
            Animated.timing(fadeItemX, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }),
        ]).start();
    }, []);

    const leftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return (
            <View
                style={{ justifyContent: 'flex-start', flexDirection: 'row' }}
            >
                <TouchableOpacity
                    onPress={handleDone}
                    style={{ height: '100%', backgroundColor: 'mediumseagreen', padding: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Animated.Text style={{ color: '#fff', transform: [{ scale }] }}>
                        <MaterialCommunityIcons name="check" size={20} />
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        );
    };

    const rightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-50, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        return (
            <View
                style={{ 
                    backgroundColor: 'indianred', 
                    flex: 1, 
                    width: '100%', 
                    padding: 15, 
                    flexDirection: 'row', 
                    justifyContent: I18nManager.isRTL ? 'flex-start' : 'flex-end', 
                    alignItems: 'center' 
                }}
            >
                <TouchableOpacity
                    onPress={() => handleDelete()}
                >
                    <Animated.Text style={{ color: '#fff', transform: [{ scale }] }}>
                        <MaterialCommunityIcons name="delete" size={20} />
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Animated.View
            key={item.id || index}
            style={
                {
                    borderBottomWidth: 1,
                    borderColor: 'lightgray',
                    transform: [{ translateY: translateItemY }],
                    opacity: fadeItemY
                }
            }
        >
            <Swipeable
                renderLeftActions={leftActions}
                renderRightActions={rightActions}
                onSwipeableRightOpen={handleDelete}
            // overshootLeft={false}
            >
                <TouchableNativeFeedback
                    onPress={() => dispatch(editListItem({ ...item, checked: !item.checked }))}
                >
                    <Animated.View
                        style={[
                            styles.listItem,
                            {
                                transform: [{ translateX: translateItemX, translateY: translateItemY }],
                                opacity: fadeItemX,
                                paddingRight: 10,
                                backgroundColor: theme.colors.listItemsBackground,
                                borderColor: theme.colors.border,
                            }
                        ]}
                        key={item.title + '_' + index}
                    >
                        <CheckBox
                            // disabled={false}
                            value={item.checked}
                            onValueChange={
                                (value) => dispatch(editListItem({ ...item, checked: value }))
                            }
                        >
                        </CheckBox>
                        <Text
                            style={{
                                textDecorationLine: item.checked ? 'line-through' : 'none',
                                flex: 1,
                                color: theme.colors.text,
                            }}>
                            {item.title}
                        </Text>
                        {/* <View style={{ width: `2%`, height: `100%`, backgroundColor: 'indianred', marginRight: -10, marginLeft: 10 }}></View> */}
                    </Animated.View>
                </TouchableNativeFeedback>
            </Swipeable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        marginHorizontal: -15,
        // width: `100%`,
    },
    col: {
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        // width: `100%`,
    },
    addNewTaskInput: {
        // borderWidth: 1,
        // borderColor: `rgba(0,0,0,0.2)`,
        // height: 50,
        borderRadius: 4,
        paddingHorizontal: 15,
        paddingVertical: 10,
        // width: `100%`,
        elevation: 1,
        shadowOpacity: 1
    },
    inputContainer: {
        flex: 0,
    },
    cardContainer: {
        elevation: 1,
        shadowOpacity: 1,
        // backgroundColor: '#fff',
        flex: 1,
        borderRadius: 5,
        overflow: "hidden",
        minHeight: 300
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        // width: `100%`,
        // padding: 15
    },
    list: {
        // elevation: 2,
        // shadowOpacity: 2,
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'flex-start',
        // backgroundColor: '#ddd',
        // width: `100%`,
        // padding: 15,
    },
    listItem: {
        // elevation: 1,
        // shadowOpacity: 1,
        // backgroundColor: '#fff',
        flex: 1,
        // justifyContent: 'space-between',
        alignItems: 'center',
        // width: `100%`,
        flexDirection: 'row',
        padding: 7,
        // borderRadius: 20
        // paddingRight: 0,
        // borderBottomWidth: 1,
        // borderBottomColor: `rgba(0,0,0,0.2)`
    }
});

export default HomeScreen;
