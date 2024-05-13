import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import { COLORS } from '../utils/colors';
import Name from '../components/Name';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>  
            {/* Search Bar + filters*/}
            <View>
                <Text style={styles.text}>Search</Text>
            </View> 
            {/* List of Names */}
            <ScrollView>
                <Name firstName="John" lastName="Doe" />
                <Name firstName="Adam" lastName="Smith" />
                <Name firstName="Henry" lastName="Banks" />
            </ScrollView> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flex: 1,
    },
    text: {
        color: COLORS.off_white,
    },
});




