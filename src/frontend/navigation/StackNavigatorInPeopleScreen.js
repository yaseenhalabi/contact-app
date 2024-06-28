import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen'; 
import PeopleScreen from '../screens/PeopleScreen';
import { useEffect } from 'react'
const Stack = createNativeStackNavigator();
export default function StackNavigatorInPeopleScreen({navigation, route}) {
    // We can use gestures detecting from native-stack library!
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="ListOfNames" component={PeopleScreen} params={route.params}/>
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}