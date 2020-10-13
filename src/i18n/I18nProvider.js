import React, {createContext, useState, useMemo} from 'react';
import i18n from '../i18n';
// import { initReactI18next } from 'react-i18next';
// import { I18nManager } from 'react-native';

export const I18nContext = createContext();

const I18nProvider = props => {
    // const [i18nInstance, setI18nInstance] = useState(i18n);

    // const handleLangChange = (lng) => {
    //   setI18nInstance({ ...i18nInstance, language: lng });
    // };

        const [locale, setLocale] = useState(i18n.language);
        const localizationContext = useMemo(
          () => ({
            t: (scope, options) => i18n.t(scope, { locale, ...options }),
            locale,
            setLocale,
            languages: i18n.languages,
            i18n
          }),
          [locale]
        );

    return (
      <I18nContext.Provider value={localizationContext}>
        {
            i18n.isInitialized &&
            props.children
        }
      </I18nContext.Provider>
    )
  };

export default I18nProvider;
