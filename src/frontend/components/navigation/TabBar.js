import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../utils/colors';
export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={{backgroundColor: COLORS.primary}}>
        <SafeAreaView style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
            }
            };

            const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
            };

            return (
            <TouchableOpacity
                key={label}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1, backgroundColor: isFocused ? '#ffffff20' : 'transparent', alignItems: 'center', justifyContent: 'center', padding: 10}}
            >
                <Text style={{ color: isFocused ? COLORS.off_white : '#fdfdfd71', fontFamily: 'Trebuc' }}>
                {label}
                </Text>
            </TouchableOpacity>
            );
        })}
        </SafeAreaView>
    </View>
    
  );
}