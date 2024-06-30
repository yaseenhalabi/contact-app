import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen'; 
import PeopleScreen from '../screens/PeopleScreen';
const Stack = createNativeStackNavigator();
export default function StackNavigatorInPeopleScreen({navigation, route}) {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false,
                fullScreenGestureEnabled: true,
            }}
        >
            <Stack.Screen name="ListOfNames" component={PeopleScreen} params={route.params}/>
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}