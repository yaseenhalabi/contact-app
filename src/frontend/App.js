import React from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Tabs from './navigation/Tabs';

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'Trebuc': require('./assets/fonts/trebuc.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store} testID="app-components">
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <Tabs />
            <StatusBar style="light" testID="status-bar" />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
