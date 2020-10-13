import React, { useState, useContext, memo, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    useWindowDimensions,
    // StyleSheet,
    Animated,
    I18nManager,
    Keyboard,
} from 'react-native';
import { /*createStackNavigator,*/ TransitionPresets } from '@react-navigation/stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

// import HomeStack from "../stacks/HomeStack";
// import ModalsStack from "../stacks/ModalsStack";
// import HomeScreen from "../screens/HomeScreen";
// import DoneListScreen from "../screens/DoneListScreen";
import DropDownMenu from "../utils/DropDownMenu";
import TabBarWithBadge from "../components/TabBarWithBadge";
import TabIndicator from "../utils/TabIndicator";
import { Theme } from "../theme";
import { useTranslation } from 'react-i18next';
import { StoreStateContext, StoreDispatchContext } from "../store/store";
import { searchDoneListItem, populateDoneList } from "../store/actions/doneListActions";
// import i18n from '../i18n';

const SearchBar = memo(props => {
    const { width } = useWindowDimensions();
    const { doneList } = useContext(StoreStateContext);
    const dispatch = useContext(StoreDispatchContext);
    const [inputVal, setInputVal] = useState('');
    const [inputFocus, setInputFocus] = useState(false);
    const [filteredDoneList, setFilteredDoneList] = useState([...doneList]);
    const { theme } = useContext(Theme);
    const { t } = useTranslation();
    const [showSearch, setShowSearch] = useState(props.open);
    const inputRref = useRef();

    const opacityAnimated = useRef(new Animated.Value(showSearch ? 1 : 0)).current;
    const xAnimated = useRef(new Animated.Value(showSearch ? (I18nManager.isRTL ? -35 : 35) : (I18nManager.isRTL ? width : -width))).current;

    const inputWidth = width * 0.85;

    useEffect(() => {
        return () => dispatch(populateDoneList(filteredDoneList));
    }, []);
   
    useEffect(() => {
        setShowSearch(props.open);
    }, [props]);

    useEffect(() => {
        // fadeInOut();
        // translateX();
        animateSequence();
        if (!showSearch) {
            handleTxtChange('');
            Keyboard.dismiss();
        }
        setInputFocus(showSearch);
        if (showSearch) inputRref.current.focus();
    }, [showSearch]);

    // const fadeInOut = () => {
    //     Animated.timing(opacityAnimated, {
    //         toValue: showSearch ? 1 : 0,
    //         duration: 1000,
    //         useNativeDriver: true
    //     }).start();
    // };

    // const translateX = () => {
    //     Animated.spring(xAnimated, {
    //         toValue: showSearch ? 0 : width,
    //         duration: 1000,
    //         useNativeDriver: true
    //     }).start();
    // };

    const animateSequence = () => {
        Animated.parallel([
            Animated.timing(opacityAnimated, {
                toValue: showSearch ? 1 : 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.spring(xAnimated, {
                toValue: showSearch ? (I18nManager.isRTL ? -35 : 35) : (I18nManager.isRTL ? width : -width),
                duration: 300,
                useNativeDriver: true
            }),

        ]).start();
    };

    const handleTxtChange = async (txt) => {
        setInputVal(txt);
        // if (!txt) return;
        // filterDoneList(txt);
        let fltrdDL = await (txt ? dispatch(searchDoneListItem({ txt: txt.toLowerCase(), filteredDoneList })) : dispatch(populateDoneList(filteredDoneList)));
        if (fltrdDL) setFilteredDoneList(fltrdDL.payload);
    };

    // const filterDoneList = (txt) => {
    //     return filteredDoneList.filter(l => l.indexOf(txt) > -1);
    // };

    return (
        <Animated.View
            style={{
                // ...StyleSheet.absoluteFillObject,
                position: "relative",
                // top: 10,
                // bottom: 10,
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: theme.colors.cardBackground,
                borderRadius: inputWidth / 2,
                paddingHorizontal: 20,
                paddingVertical: 5,
                elevation: 1,
                shadowOpacity: 1,
                zIndex: 1,
                width: inputWidth,
                opacity: opacityAnimated,
                transform: [{ translateX: xAnimated }]
            }}
        >
            <TouchableNativeFeedback
                style={{
                    // flex: 1,
                    // ...StyleSheet.absoluteFillObject,
                    // position: "absolute",
                    // left: 0,
                    zIndex: 1,
                    // paddingVertical: 0,
                    // paddingHorizontal: 0,
                    // backgroundColor: "red",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <MaterialCommunityIcons.Button
                    name={`magnify`}
                    color={theme.colors.listItemsBackground}
                    backgroundColor="transparent"
                    size={20}
                    iconStyle={{ marginRight: 0, color: theme.colors.text }}
                    style={{ paddingVertical: 5, paddingHorizontal: 10 }}
                />
            </TouchableNativeFeedback>
            <View
                style={{
                    zIndex: 1,
                    position: "relative",
                    flex: 1,
                    flexDirection: "row"
                }}
            >
                <TextInput
                    ref={node => inputRref.current = node}
                    placeholder={`${t("Search")}...`}
                    clearButtonMode="while-editing"
                    autoFocus={inputFocus}
                    // pointerEvents="auto"
                    enablesReturnKeyAutomatically
                    style={{
                        // flex: 1,
                        // backgroundColor: "yellow",
                        // borderRadius: inputWidth / 2,
                        paddingHorizontal: 20,
                        paddingVertical: 0,
                        // elevation: 1,
                        // shadowOpacity: 1,
                        width: '100%',
                        textAlign: 'center'
                        // zIndex: 1,
                        // position: "relative"
                    }}
                    value={inputVal}
                    onChangeText={(txt) => handleTxtChange(txt)}
                    onSubmitEditing={(e) => handleTxtChange(e.nativeEvent.text)}
                />
            </View>
        </Animated.View>

    );
});

const HomeStackHeaderRight = ({ navigation, route }) => {

    const { width } = useWindowDimensions();
    // const { t } = useTranslation();
    const { theme } = useContext(Theme);
    const [settingsMenuVisible, setSettingsMenuVisible] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    // const [showSearchIcon, setShowSearchIcon] = useState(true);
    const xAnimated = useRef(new Animated.Value(showSearchBar ? (I18nManager.isRTL ? 10 : -10) : 0)).current;
    const scaleAnimated = !showSearchBar ? useRef(new Animated.Value(0)).current : useRef(new Animated.Value(showSearchBar ? 0.7 : 1)).current;
    const rotateAnimated = useRef(new Animated.Value(showSearchBar ? 1 : 0)).current;
    // const startScaleAnimated = useRef(new Animated.Value(0)).current;
    const opacityAnimated = useRef(new Animated.Value(0)).current;

    const handleShowSearch = () => {
        setShowSearchBar(!showSearchBar);
        // setShowSearchIcon(!showSearchIcon);
    };

    useEffect(() => {
        if (((route.state && route.state.routes[route.state.index].name) || route.name) === "Done List") {
            animateInit();
        }
        // else{
        //     if(showSearchBar) handleShowSearch();
        // }
        return () => setShowSearchBar(false);
    }, [route]);

    useEffect(() => {
        animateSequence();
    }, [showSearchBar]);

    const animateSequence = () => {
        Animated.parallel([
            Animated.spring(scaleAnimated, {
                toValue: showSearchBar ? 0.7 : 1,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(rotateAnimated, {
                toValue: showSearchBar ? 1 : 0,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.spring(xAnimated, {
                toValue: showSearchBar ? (I18nManager.isRTL ? 10 : -10) : 0,
                duration: 1000,
                useNativeDriver: true
            }),

        ]).start();
    };

    const animateInit = () => {
        Animated.sequence([
            // Animated.delay(3000),
            Animated.timing(opacityAnimated, {
                toValue: 1,
                duration: 1000,
                // delay: 700,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnimated, {
                toValue: 1,
                duration: 2000,
                // delay: 2200,
                useNativeDriver: true
            }),

        ]).start();
    };

    return (
        ((route.state && route.state.routes[route.state.index].name) || route.name) !== "Settings" &&
        <View
            style={{
                flex: 1,
                justifyContent: `center`,
                alignItems: `center`,
                flexDirection: `row`,
                // marginHorizontal: 10,
                position: 'relative',
                // backgroundColor: "red",
                left: 0,
                right: 0,
                // zIndex: -1
            }}
        >
            {
                (
                    ((route.state && route.state.routes[route.state.index].name) || route.name) === "Done List" &&
                    <Animated.View
                        style={{
                            flex: 1,
                            justifyContent: `center`,
                            alignItems: `center`,
                            flexDirection: `row`,
                            // marginHorizontal: 10,
                            position: 'relative',
                            // backgroundColor: "red",
                            left: 0,
                            right: 0,
                            // zIndex: -1,
                        }}
                    >
                        <SearchBar
                            open={showSearchBar}
                        />

                        <Animated.View
                            style={{
                                flex: 0,
                                flexDirection: "row",
                                backgroundColor: "red",
                                borderRadius: 50,
                                elevation: 1,
                                position: "relative",
                                marginHorizontal: 5,
                                zIndex: 2,
                                // left: showSearchBar ? 'auto' : 20,
                                opacity: opacityAnimated,
                                transform: [
                                    { translateX: xAnimated },
                                    { scale: scaleAnimated },
                                ]
                            }}
                        >
                            <TouchableNativeFeedback
                                onPress={handleShowSearch}
                                style={{
                                    flex: 0,
                                    elevation: 1,
                                    position: "relative",
                                    zIndex: 2,
                                    transform: [
                                        {
                                            rotate: rotateAnimated.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '360deg'],
                                                extrapolate: "clamp"
                                            })
                                        },
                                        { perspective: 1000 }
                                    ]
                                }}
                            >

                                <MaterialCommunityIcons.Button
                                    name={showSearchBar ? `close` : `magnify`}
                                    // color={theme.colors.headerIconColor}
                                    backgroundColor="transparent"
                                    size={20}
                                    iconStyle={{ marginRight: 0 }}
                                // style={{}}
                                />
                            </TouchableNativeFeedback>
                        </Animated.View>
                    </Animated.View>
                )
                ||
                null
            }
            <View style={{ flex: 1, zIndex: 3, position: "relative", elevation: 1 }}>
                <TouchableNativeFeedback onPress={() => setSettingsMenuVisible(!settingsMenuVisible)}>
                    <MaterialCommunityIcons.Button
                        name={`dots-vertical`}
                        color={theme.colors.headerIconColor}
                        backgroundColor="transparent"
                        size={20}
                        iconStyle={{ marginRight: 0 }}
                    // style={{flex: 1}}   
                    />
                </TouchableNativeFeedback>
                <DropDownMenu
                    menuVisible={settingsMenuVisible}
                    setModalVisible={setSettingsMenuVisible}
                    menuOptions={
                        [
                            { label: "Settings", value: "Settings", icon: 'settings' },
                        ]
                    }
                    navigation={navigation}
                />
            </View>

        </View>
        ||
        null
    )
};

const HomeStackHeaderLeft = ({ route }) => {

    const { theme } = useContext(Theme);

    let icon = () => {
        switch ((route.state && route.state.routes[route.state.index].name) || route.name) {
            case "Settings":
                return "settings";

            case "Task":
                return "format-list-checkbox";

            case "Done List":
                return "playlist-check";

            default:
                return "playlist-check";
        }
    }

    return (
        <View style={
            {
                flex: 1,
                justifyContent: `center`,
                alignItems: `center`,
                flexDirection: `row`,
                marginHorizontal: 20
            }
        }>

            <MaterialCommunityIcons
                name={icon()}
                color={theme.colors.headerIconColor}
                size={26}
            />
            {/* <Text> {route.name}</Text> */}
        </View>
    )

};

export const homeStackOptions = ({ navigation, route, theme, t }) => {

    return {
        // title: t((route.state && route.state.routes[route.state.index].name) || route.name || "Task"),
        // headerTitle: () => <Text style={{fontSize: 16}}>{t((route.state && route.state.routes[route.state.index].name) || route.name || "Task")}</Text>,
        headerLeft: (onPress, label, labelStyle) =>
            // i18n.dir() === "ltr" ?
            <HomeStackHeaderLeft route={route} navigation={navigation} />
        // :
        // <HomeStackHeaderRight route={route} navigation={navigation} />
        ,
        headerRight: () =>
            // i18n.dir() === "ltr" ?
            <HomeStackHeaderRight route={route} navigation={navigation} />
        // :
        // <HomeStackHeaderLeft route={route} />
        ,
        headerStyle: { backgroundColor: theme.colors.headerBackground },
        headerTintColor: theme.colors.headerTintColor,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
    }
};

export const modalsStackOptions = ({ navigation, route, theme, t }) => {

    return {
        // title: t((route.state && route.state.routes[route.state.index].name) || route.name || "Task"),
        // headerTitle: () => <Text style={{fontSize: 16}}>{t((route.state && route.state.routes[route.state.index].name) || route.name || "Task")}</Text>,
        headerStyle: { backgroundColor: theme.colors.headerBackground },
        headerTintColor: theme.colors.headerTintColor,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
    }
};

// export const rootStackRoutes = [
//     {
//         name: "Task",
//         component: HomeStack,
//         options: props => homeStackOptions(props)
//     },
//     {
//         name: "Settings",
//         component: ModalsStack,
//         options: props => modalsStackOptions(props)
//     }
// ];

//===============================================

export const homeStackGlobalScreenOptions = ({ route, t }) =>
    (
        {
            title: t(route.name),
            tabBarIcon: ({ focused, color }) => <TabBarWithBadge focused={focused} color={color} route={route} />,
        }
    );

//================================================

export const tabBarOptions = ({ theme }) => {
    return {
        activeTintColor: theme.colors.primary || 'indigo',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        // activeBackgroundColor: theme.colors.tabsBackground,
        showIcon: true,
        showLabel: false,
        style: { padding: 0, margin: 0, backgroundColor: theme.colors.tabsBackground },
        // iconStyle: {margin: 0, padding: 0},
        labelStyle: { margin: 0, padding: 0, fontSize: 12 },
        // tabStyle: {paddingTop: 10, backgroundColor: theme.colors.tabsBackground},
        renderIndicator: (route) => <TabIndicator route={route} />,
        // indicatorStyle: {backgroundColor: 'red'}
    };
};

// export const homeStackRoutes = [
//     {
//         name: "Task",
//         component: HomeScreen,
//         options: props => null
//     },
//     {
//         name: "Done List",
//         component: DoneListScreen,
//         options: props => null
//     }
// ];

//=============================================

export const modalsStackScreenOptions = ({ navigation, route, t, theme }) => {
    return {
        title: `${t((route.state && route.state.routes[route.state.index].name) || route.name || "Settings")}`,
        headerLeft: () => {
            return (
                <View style={
                    {
                        display: `flex`,
                        justifyContent: `center`,
                        alignItems: `center`,
                        flexDirection: `row`,
                        marginLeft: 20
                    }
                }>

                    <MaterialCommunityIcons
                        name={`settings`}
                        color={theme.colors.headerIconColor}
                        size={26}
                    />
                    {/* <Text> {route.name}</Text> */}
                </View>
            )
        },
        headerStyle: { backgroundColor: theme.colors.headerBackground },
        headerTintColor: theme.colors.headerTintColor,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
    };
};