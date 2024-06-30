import { Image } from 'react-native';
import TagsScreen from '../screens/TagsScreen';
import { COLORS } from '../utils/colors';
import PeopleStackNavigator from './PeopleStackNavigator';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import addPersonIcon from '../assets/icons/add_person_icon.png'
import addTagIcon from '../assets/icons/add_tag_icon.png'
import peopleIcon from '../assets/icons/people_icon.png'
import tagIcon from '../assets/icons/tag_icon.png'
import peopleIconFilled from '../assets/icons/people_icon_filled.png'
import tagIconFilled from '../assets/icons/tag_icon_filled.png'

const Tab = createMaterialBottomTabNavigator();

export default function Tabs() {

  return (
    <Tab.Navigator 
        labeled={false}
        barStyle={{ backgroundColor: COLORS.primary, height: 90 }}
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
        component={PeopleStackNavigator} 
        testID="people-screen"
        options={{
            tabBarIcon: ({focused}) => <Image source={focused ? peopleIconFilled : peopleIcon} style={{width: 35, height: 35, bottom: 2}}/>,

        }}
        />
        <Tab.Screen 
        name="Add Person" 
        component={PeopleStackNavigator} 
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
  );
}
