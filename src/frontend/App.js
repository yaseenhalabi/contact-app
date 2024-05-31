import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import HomeScreen from './screens/NamesScreen';
import TagsScreen from './screens/TagsScreen';
import { COLORS } from './utils/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabBar from './components/navigation/TabBar';
import StackNavigatorInPeopleScreen from './components/navigation/StackNavigatorInPeopleScreen';
export default function App() {

  const [fontsLoaded] = useFonts({
    'Trebuc': require('./assets/fonts/trebuc.ttf'),
  });
  const Tab = createMaterialTopTabNavigator();
  tabOptions = {
    headerShown: false,
    tabBarShowLabel: false,
  }


  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator screenOptions={tabOptions} tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="People" component={StackNavigatorInPeopleScreen} />
        <Tab.Screen name="Tags" component={TagsScreen} />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
