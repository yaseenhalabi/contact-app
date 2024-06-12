import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen'; 
import PeopleScreen from '../screens/PeopleScreen';

const Stack = createNativeStackNavigator();
export default function StackNavigatorInPeopleScreen() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="ListOfNames" component={PeopleScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}