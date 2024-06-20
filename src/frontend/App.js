import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import TagsScreen from './screens/TagsScreen';
import { COLORS } from './utils/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabBar from './navigation/TabBar';
import StackNavigatorInPeopleScreen from './navigation/StackNavigatorInPeopleScreen';
import store from './redux/store';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {

  useFonts({
    'Trebuc': require('./assets/fonts/trebuc.ttf'),
  });

  const Tab = createMaterialTopTabNavigator();
  tabOptions = {
    headerShown: false,
    tabBarShowLabel: false,
  }

  return (
    <Provider store={store} testID="app-component">
      <GestureHandlerRootView>
        <NavigationContainer style={styles.container}>
          {/* <Tab.Navigator screenOptions={tabOptions} tabBar={props => <TabBar {...props} testID="tab-bar"/>}> */}
          <Tab.Navigator screenOptions={tabOptions} tabBar={props => <View></View>}>
            <Tab.Screen name="People" component={StackNavigatorInPeopleScreen} testID="people-screen"/>
            <Tab.Screen name="Tags" component={TagsScreen} testID="tags-screen"/>
          </Tab.Navigator>
          <StatusBar style="light" testID="status-bar"/>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
