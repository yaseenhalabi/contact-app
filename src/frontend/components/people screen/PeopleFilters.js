import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal } from 'react-native';
import { COLORS } from '../../utils/colors';
export default function PeopleFilters() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>PEOPLE FILTERS</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: COLORS.off_white,
    }
});