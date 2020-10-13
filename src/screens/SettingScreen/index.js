import React, { useContext, useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, SectionList, SafeAreaView, Switch/*, I18nManager*/ } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Theme } from "../../theme";
import { Picker } from '@react-native-community/picker';
import { useTranslation } from 'react-i18next';
import /*i18n,*/ { updateLocale } from '../../i18n';

const Item = ({ content }) => {
    return (
        <View style={{ flex: 1 }}>
            {content}
        </View>
    );
};

const ThemeSec = () => {

    const { theme, handleThemeChange } = useContext(Theme);
    const { t } = useTranslation();
    const toggleSwitch = (val) => handleThemeChange(val);

    return (
        <View style={[styles.item, { backgroundColor: theme.colors.listItemsBackground }]}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text>{theme.dark ? t('Dark') : t('Light')}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={theme.dark ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(val) => toggleSwitch(val)}
                        value={theme.dark}
                    />
                    {
                        theme.dark ?
                            <Text><Icon name="brightness-4" size={20} /></Text> :
                            <Text><Icon name="brightness-6" size={20} /></Text>
                    }
                </View>
            </View>
        </View>
    );
};

const LanguageSec = () => {

    const { t, i18n } = useTranslation();
    // const i18n = useContext(i18n);
    const { theme } = useContext(Theme);
    const [langs, setLangs] = useState(Object.keys(i18n.options.resources));

    return (
        <View style={[styles.item, { backgroundColor: theme.colors.listItemsBackground }]}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* <Text>{t("Language")}</Text> */}
                <Picker
                    // mode={"dropdown"}
                    selectedValue={i18n.language}
                    style={{ height: 30, width: 120 }}
                    onValueChange={async (itemValue, itemIndex) => {
                        await i18n.changeLanguage(itemValue, (err, t) => {
                            if (err) return console.log('something went wrong loading', err);
                            // I18nManager.forceRTL(i18n.dir() === 'rtl');
                            // i18n.languages = Object.keys(i18n.options.resources);
                            // i18n.reloadResources(Object.keys(i18n.options.resources));
                            // console.log("lngs: ", i18n.languages, "rsrcs: ", Object.keys(i18n.options.resources));
                            // setLangs(Object.keys(i18n.options.resources));
                            // i18n.init(i18n.options);
                            updateLocale(itemValue);
                        })
                    }
                    }
                >
                    {
                        langs.map(lng => {
                            // console.log("map: ", lng, "i18nLang: ", i18n.languages)
                            return <Picker.Item key={lng} label={t(lng)} value={lng} />
                        })
                    }
                </Picker>
                <View style={{ flex: 0, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse' }}>
                    <Icon name="translate" size={20} />
                    <Text style={{ marginHorizontal: 5 }}>{t(i18n.language)}</Text>
                </View>
            </View>
        </View>
    );
};

const SettingScreen = ({ navigation, route }) => {

    const { t } = useTranslation();
    const { theme } = useContext(Theme);

    const data = [
        {
            title: 'Theme',
            data: [<ThemeSec />]
        },
        {
            title: 'Language',
            data: [<LanguageSec />]
        }
    ]

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         title: t("Settings")
    //     });
    // }, [route]);

    return (
        <SafeAreaView style={[styles.container]}>
            <SectionList
                style={[styles.SectionList, { backgroundColor: theme.colors.cardBackground}]}
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item content={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={[styles.header]}>{t(title)}</Text>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 22,
        marginHorizontal: 15,
        borderRadius: 4
    },
    SectionList: {
        padding: 15,
        borderRadius: 4
    },
    item: {
        // backgroundColor: "#ddd",
        padding: 10,
        marginVertical: 8,
        borderRadius: 4
    },
    header: {
        fontSize: 18,
        // backgroundColor: "#ddd",
    },
    title: {
        fontSize: 24
    }
});

export default SettingScreen;
