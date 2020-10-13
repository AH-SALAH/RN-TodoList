import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from "./src/stacks/Root";
import ThemeProvider, { Theme } from "./src/theme";
import StoreProvider from "./src/store/store";
import i18n from "./src/i18n";
import RNBootSplash from "react-native-bootsplash";

// const customTextProps = {
//   style: {
//     fontFamily: i18n.dir() === "rtl" ? 'Bahij-Bold' : 'Roboto',
//   }
// };
// const customTextInputProps = {
//   underlineColorAndroid: 'rgba(0,0,0,0)',
//   style: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     backgroundColor: 'white'
//   }
// };
// setCustomText(customTextProps);
// setCustomTextInput(customTextInputProps);

const AppRoot = () => {
  const { theme } = useContext(Theme);

  useEffect(() => {
    // console.log("now hide");
    if (i18n.isInitialized) RNBootSplash.hide({ duration: 250 });
  }, [i18n.isInitialized]);


  return (
    <NavigationContainer theme={theme}>
      <Root />
    </NavigationContainer>
  );
};

const App = () => {

  return (
    <StoreProvider>
      <ThemeProvider>
        <AppRoot />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;


