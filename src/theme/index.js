import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from "react-native";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import { useAsyncStorage } from '@react-native-community/async-storage';
import { useTranslation } from 'react-i18next';
// import i18n from "../i18n";
import {
    // setCustomView,
    setCustomTextInput,
    setCustomText,
    // setCustomImage,
    // setCustomTouchableOpacity
} from 'react-native-global-props';

export const Theme = createContext();

const ThemeProvider = props => {
    const { i18n } = useTranslation();

    const customTextProps = {
        style: {
            fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto',
        }
    };
    const customTextInputProps = {
        style: {
            fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto',
        }
    };

    let light = {
        ...lightTheme,
        // fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto'
    };
    let dark = {
        ...darkTheme,
        // fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto'
    };

    const colorscheme = useColorScheme();
    // const [darkT, setDarkT] = useState(dark);
    // const [lightT, setLightT] = useState(light);
    const [theme, setTheme] = useState(colorscheme === "dark" ? dark : light);
    // const [lng] = useState(i18n.language);
    const { setItem: setThemeFromStrg, getItem: getThemeFromStrg } = useAsyncStorage("@List_Theme");

    useEffect(() => {
        let getFS = async () => {
            await getFromStrg();
            // setTheme(theme.dark ? dark : light);
        }
        getFS();
    }, []);

    useEffect(() => {
        // setDarkT(d=> { return {...d, fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto'} });
        // setLightT(l => { return {...l, fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto'} });
        // setTheme(t => { return t.dark ? {...darkT} : {...lightT} });
        setTheme(theme.dark ? dark : light);
        setCustomText(customTextProps);
        setCustomTextInput(customTextInputProps);
    }, [i18n.language]);

    // i18n.on("languageChanged", (currLng) => {
    //     // if (currLng !== lng) {
    //     setTheme(theme.dark ? darkT : lightT);
    //     // }
    // });

    const handleThemeChange = (isDark) => {

        if (isDark === null || isDark === undefined) return;

        switch (isDark) {
            case true:
                // setTheme(t => { return { ...dark, fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto' } });
                setTheme(dark);
                saveToStrg(isDark);
                // setCustomText(customTextProps);
                // setCustomTextInput(customTextInputProps);
                break;

            case false:
                // setTheme(t => { return { ...light, fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto' } });
                setTheme(light);
                saveToStrg(isDark);
                // setCustomText(customTextProps);
                // setCustomTextInput(customTextInputProps);
                break;

            default:
                setTheme(light);
                saveToStrg(false);
                break;
        }
    };

    const getFromStrg = async () => {
        let t = await getThemeFromStrg();
        if (t !== undefined || t !== null) {
            handleThemeChange(JSON.parse(t));
        }
    };

    const saveToStrg = async (t) => {
        await setThemeFromStrg(JSON.stringify(t));
    };

    return (
        <Theme.Provider value={{ theme, handleThemeChange }}>
            {props.children}
        </Theme.Provider>
    )
}

export default ThemeProvider;