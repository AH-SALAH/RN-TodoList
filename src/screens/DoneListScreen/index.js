import React, { useContext, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, I18nManager } from 'react-native';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StoreStateContext, StoreDispatchContext } from "../../store/store";
import { deleteDoneListItem } from "../../store/actions/doneListActions";
import { addListItem } from "../../store/actions/listActions";
// import { useTheme } from "@react-navigation/native";
import { Theme } from "../../theme";
import { useTranslation } from 'react-i18next';

const DoneListScreen = () => {

    const { t } = useTranslation();
    const storeState = useContext(StoreStateContext);
    const { theme } = useContext(Theme);

    return (
        <View style={styles.col}>
            <View style={[styles.cardContainer, { backgroundColor: theme.colors.cardBackground }]}>
                {
                    (
                        storeState.doneList &&
                        storeState.doneList.length &&
                        <FlatList
                            style={styles.list}
                            data={storeState.doneList}
                            // refreshControl
                            keyExtractor={(item, index) => item.id}
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
    )
}

const ListItem = ({ item, index }) => {

    // const storeState = useContext(StoreStateContext);
    const dispatch = useContext(StoreDispatchContext);
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
            dispatch(deleteDoneListItem(item));
            if (cb && typeof cb === 'function') cb();
        });
    };

    const handleRelist = (item) => {
        handleDelete(() => dispatch(addListItem(item)));
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
                <TouchableNativeFeedback
                    onPress={() => handleRelist(item)}
                    style={{ height: '100%', backgroundColor: 'mediumseagreen', padding: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Animated.Text style={{ color: '#fff', transform: [{ scale }] }}>
                        <MaterialCommunityIcons name="ballot-recount-outline" size={20} />
                    </Animated.Text>
                </TouchableNativeFeedback>
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
                <TouchableNativeFeedback
                    onPress={() => handleDelete()}
                >
                    <Animated.Text style={{ color: '#fff', transform: [{ scale }] }}>
                        <MaterialCommunityIcons name="delete" size={20} />
                    </Animated.Text>
                </TouchableNativeFeedback>
            </View>
        );
    };

    return (
        <Animated.View
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
                // onPress={() => dispatch(editListItem({ ...item, checked: !item.checked }))}
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
                        <Text
                            style={{
                                textDecorationLine: item.checked ? 'line-through' : 'none',
                                flex: 1,
                                color: theme.colors.text,
                            }}>
                            {index + 1 + '.'} {item.title}
                        </Text>
                    </Animated.View>
                </TouchableNativeFeedback>
            </Swipeable>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    row: {
        flex: 1,
        marginHorizontal: -15,
    },
    col: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    cardContainer: {
        elevation: 1,
        shadowOpacity: 1,
        backgroundColor: '#fff',
        flex: 1,
        overflow: "hidden",
        minHeight: 300,
        borderRadius: 7
    },
    list: {
        flex: 1,
    },
    listItem: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 7,
    }
});

export default DoneListScreen;
