import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaggedPeopleScreen from '../screens/TaggedPeopleScreen';
import TagsScreen from '../screens/TagsScreen';
const Stack = createNativeStackNavigator();
export default function TagsStackNavigator({navigation, route}) {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false,
                fullScreenGestureEnabled: true,
            }}
        >
            <Stack.Screen name="ListOfTags" component={TagsScreen} params={route.params}/>
            <Stack.Screen name="TaggedPeople" component={TaggedPeopleScreen} />
        </Stack.Navigator>
    )
}