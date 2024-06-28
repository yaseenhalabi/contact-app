import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import TagsScreen from './screens/TagsScreen';
import { COLORS } from './utils/colors';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigatorInPeopleScreen from './navigation/StackNavigatorInPeopleScreen';
import store from './redux/store';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { useEffect } from 'react'
import addPersonIcon from './assets/icons/add_person_icon.png'
import addTagIcon from './assets/icons/add_tag_icon.png'
import peopleIcon from './assets/icons/people_icon.png'
import tagIcon from './assets/icons/tag_icon.png'
import peopleIconFilled from './assets/icons/people_icon_filled.png'
import tagIconFilled from './assets/icons/tag_icon_filled.png'
const Tab = createMaterialBottomTabNavigator();

export default function App() {

  useFonts({
    'Trebuc': require('./assets/fonts/trebuc.ttf'),
  });

  return (
    <Provider store={store} testID="app-components">
      <PaperProvider >
        <GestureHandlerRootView>
          <NavigationContainer style={styles.container}>
            <Tab.Navigator 
              labeled={false}
              barStyle={{ backgroundColor: COLORS.primary, height: 110 }}
              activeColor='white'
              inactiveColor='white'
              screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              }}
              theme={{colors: {secondaryContainer: 'transparent'}}}
            >
              <Tab.Screen 
                name="People" 
                component={StackNavigatorInPeopleScreen} 
                testID="people-screen"
                options={{
                  tabBarIcon: ({focused}) => <Image source={focused ? peopleIconFilled : peopleIcon} style={{width: 35, height: 35, bottom: 2}}/>,

              }}
              />
              <Tab.Screen 
                name="Add Person" 
                component={StackNavigatorInPeopleScreen} 
                options={{
                  tabBarIcon: ({focused}) => <Image source={addPersonIcon} style={{width: 20, height: 25}}/>,
                }} 
                listeners={({ navigation, route }) => ({
                  tabPress: (e) => {
                    e.preventDefault();
                    navigation.jumpTo('People', {screen: 'ListOfNames', params: {addingPerson: true}})
                  },
                })}
              />                

              <Tab.Screen 
                name="Add Tag" 
                component={TagsScreen} 
                testID="tags-screen"
                options={{
                  tabBarIcon: ({focused}) => <Image source={addTagIcon} style={{width: 25, height: 25}}/>
                }}
                listeners={({ navigation }) => ({
                  tabPress: (e) => {
                    e.preventDefault();
                    navigation.jumpTo('Tags', {addingTag: true})
                  },
                })}
              />

              <Tab.Screen 
                name="Tags" 
                component={TagsScreen} 
                testID="tags-screen"
                options={{
                  tabBarIcon: ({focused}) => <Image source={focused ? tagIconFilled : tagIcon} style={{width: 25, height: 25}}/>
                }}
              />
            </Tab.Navigator>
            <StatusBar style="light" testID="status-bar"/>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
