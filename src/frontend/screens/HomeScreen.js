import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../utils/colors';
export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>  
            {/* Search Bar + filters*/}
            <View>
                <Text>Search</Text>
            </View> 
            {/* List of Names */}
            <View>
                <View><Text>Name 1</Text></View>
                <View><Text>Name 2</Text></View>
                <View><Text>Name 3</Text></View>
            </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
});




