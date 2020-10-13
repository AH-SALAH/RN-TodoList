import { DefaultTheme } from '@react-navigation/native';
// import i18n from "../i18n";

const darkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'royalblue',
        secondary: '#7cffc2',
        background: '#888',
        headerBackground: '#333',
        headerTintColor: '#fff',
        headerIconColor: '#fff',
        tabsBackground: '#333',
        cardBackground: '#777',
        listItemsBackground: '#999',
        text: '#fff',
    },
    // fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto',
    dark: true
};


export default darkTheme;