import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import ar from "./locales/ar";
import { NativeModules, Platform, I18nManager } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

// detect lng
const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const STRG_LNG = "@SetLng";

const resources = {
  en,
  ar
};


const i18nConfig = (newConfig = {}) => {
  return {
    resources,
    lng: (deviceLanguage && deviceLanguage.split('_')[0]) || "en",
    fallbackLng: "en",
    // load: 'languageOnly',
    debug: true,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      wait: true,
    },
    ...newConfig
  }
};

export const setConfig = (newConfig = {}) => {

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init(i18nConfig(newConfig), (err) => {
      if (err) return console.log('something went wrong loading: ', err);
      I18nManager.allowRTL(i18n.dir() === "rtl");
      I18nManager.forceRTL(i18n.dir() === "rtl");
      saveLngToStrg(i18n.language);
    });

};

export const getLngFromStrg = async () => {
  let strgLng = await AsyncStorage.getItem(STRG_LNG);
  if (strgLng) {
    setConfig({ lng: JSON.parse(strgLng) });
  }
}

export const saveLngToStrg = async (lng) => {
  if (!lng) return;

  await AsyncStorage.setItem(STRG_LNG, JSON.stringify(lng));
};

export const updateLocale = (val) => {
  if (!val) return;

  setConfig({ lng: val });
};

//============================== init
getLngFromStrg();
setConfig();

export default i18n;