import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/ProfileScreen'; 
import PeopleScreen from '../../screens/PeopleScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigatorInPeopleScreen() {
    const screenOptions = {
        headerShown: false,
    }
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="ListOfNames" component={PeopleScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}