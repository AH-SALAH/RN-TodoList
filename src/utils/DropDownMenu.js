import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    // Dimensions
} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
// import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { Theme } from "../theme";

export default props => {

    const { t, i18n } = useTranslation();
    const { theme } = useContext(Theme);
    const { menuVisible, menuOptions, setModalVisible, navigation } = props;
    const [visible, setVisible] = useState(menuVisible || false);
    const [options, setOptions] = useState(menuOptions || []);
    const menuRef = useRef().current;
    // const menuWidth = useRef();
    const [menuWidth, setMenuWidth] = useState(0);

    const isRtl = i18n.dir() === "rtl";

    useEffect(() => {
        setVisible(menuVisible);
    }, [menuVisible]);

    useEffect(() => {
        setOptions(menuOptions);
    }, [menuOptions]);

    const closeModal = val => {
        setVisible(false);
        setModalVisible(false);
        if (val && val.toLowerCase() !== 'close') navigation.navigate(val);
    };

    return (
        <View
            ref={menuRef}
            onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => { setMenuWidth(width) }}
            style={
                [
                    styles.wrapperView,
                    {
                        opacity: visible ? 1 : 0,
                        // left: -Dimensions.get('window').width + 46,
                        // left: i18n.dir() === "ltr" ? -Dimensions.get('window').width + 46 : 'auto',
                        // right: i18n.dir() === "rtl" ? Dimensions.get('window').width - 46 : 0,
                        // width: Dimensions.get('window').width,
                        // height: Dimensions.get('window').height,
                        // backgroundColor: theme.colors.cardBackground
                    }
                ]
            }
        >
            <View style={[
                styles.modalView,
                {
                    right: 20,
                    left: 'auto',
                    backgroundColor: theme.colors.cardBackground,
                    // right: i18n.dir() === "rtl" ? 'auto' : 20,
                    // left: i18n.dir() === "rtl" ? Dimensions.get('window').width - 30 : 'auto',
                }
            ]}>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.label}
                    renderItem={({ item, index }) =>
                        (
                            <View key={item.label + '_' + index} pointerEvents="auto">
                                <TouchableOpacity
                                    onPress={() => closeModal(item.value)}
                                    // value={item.value}
                                    style={{ flex: 1, borderBottomWidth: index === options.length - 1 ? 0 : 1, borderBottomColor: '#ddd' }}
                                >
                                    <View
                                        style={{ flex: 1, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        {
                                            item.icon ?
                                                <MaterialCommunityIcons color={theme.colors.text} name={item.icon} size={14} style={{ marginHorizontal: 5 }} /> :
                                                null
                                        }
                                        <Text style={{color: theme.colors.text}}>{t(item.label)}</Text>
                                    </View>
                                </TouchableOpacity>
                                {
                                    index === options.length - 1 ?
                                        <TouchableOpacity
                                            value={item.value}
                                            onPress={closeModal}
                                            style={{ flex: 1, borderBottomWidth: index === options.length - 1 ? 0 : 1, borderBottomColor: '#ddd' }}
                                        >
                                            <View style={{ flex: 1, padding: 10, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ddd', justifyContent: 'flex-start' }}>
                                                <MaterialCommunityIcons color={theme.colors.text} name="close" size={14} style={{ marginHorizontal: 5 }} />
                                                <Text style={{color: theme.colors.text}}>{t("Close")}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        null
                                }
                            </View>
                        )
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapperView: {
        flex: 1,
        // flexGrow: 1,
        // flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        // left: -Dimensions.get('window').width + 46,
        zIndex: 2,
        // backgroundColor: 'red',
        margin: 0,
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        // borderRadius: 4,
        // shadowColor: "rgba(0,0,0,0.2)",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        // display: 'none'
    },
    modalView: {
        flex: 1,
        // justifyContent: "flex-start",
        // alignItems: 'center',
        zIndex: 2,
        backgroundColor: '#fff',
        width: 148,
        // height: 148,
        position: 'absolute',
        // right: i18n.dir() === "rtl" ? 'auto' : 20,
        // left: i18n.dir() === "rtl" ? Dimensions.get('window').width - 30 : 'auto',
        top: 0,
        margin: 22,
        borderRadius: 4,
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});