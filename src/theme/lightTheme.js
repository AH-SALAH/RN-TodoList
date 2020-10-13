import { DefaultTheme } from '@react-navigation/native';
// import i18n from "../i18n";

const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'royalblue',
        secondary: '#7cffc2',
        background: '#ccc',
        headerBackground: '#fdfdfd',
        headerTintColor: '#4f4f4f',
        headerIconColor: '#333',
        tabsBackground: '#fdfdfd',
        cardBackground: '#fdfdfd',
        listItemsBackground: '#ededed',
        text: '#4f4f4f'
    },
    // fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto',
    dark: false
};


export default lightTheme;