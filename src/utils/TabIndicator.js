import React, { useContext, useRef, useEffect, useState } from 'react'
import { Animated, I18nManager } from 'react-native';
import { Theme } from "../theme";
import i18n from '../i18n';

const TabIndicator = ({ route }) => {

    const { theme } = useContext(Theme);

    const tabIndicatorWidth = (route) => route.layout.width / route.navigationState.routeNames.length;
    const tabIndicatorHeight = (route) => route.layout.height;
    const tabIndicatorX = (route) => (
        (!I18nManager.isRTL) ?
            route.navigationState.index * tabIndicatorWidth(route)
            :
            route.navigationState.index * -tabIndicatorWidth(route)
    );

    const [animatedTabIndicatorX, setAnimatedTabIndicatorX] = useState(new Animated.Value(tabIndicatorX(route)))

    i18n.on("languageChanged", (lng) => {
        if (i18n.language !== lng) {
            // tabIndicatorX(route);
            setAnimatedTabIndicatorX(new Animated.Value(tabIndicatorX(route)));
        }
    });

    // const animatedTabIndicatorX = useRef(new Animated.Value(tabIndicatorX(route))).current;

    useEffect(() => {
        Animated.spring(animatedTabIndicatorX, {
            toValue: tabIndicatorX(route),
            duration: 700,
            useNativeDriver: true
        }).start();
    }, [route]);

    return (
        <Animated.View
            style={{
                width: tabIndicatorWidth(route) / 2,
                height: tabIndicatorHeight(route) / 2,
                position: 'absolute',
                right: 0,
                left: tabIndicatorWidth(route) / 4,
                transform: [{ translateX: animatedTabIndicatorX }],
                top: tabIndicatorHeight(route) / 4,
                bottom: 0,
                backgroundColor: theme.colors.secondary,
                borderRadius: tabIndicatorWidth(route) / 2
            }}
        />
    )
};

export default TabIndicator;