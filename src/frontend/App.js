import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import store from './redux/store';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import Tabs from './navigation/Tabs';

export default function App() {

  useFonts({
    'Trebuc': require('./assets/fonts/trebuc.ttf'),
  });

  return (
    <Provider store={store} testID="app-components">
      <PaperProvider >
          <NavigationContainer>
            <Tabs/>
            <StatusBar style="light" testID="status-bar"/>
          </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
