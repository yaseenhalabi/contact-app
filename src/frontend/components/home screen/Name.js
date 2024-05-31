import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../utils/colors';
import ThreeLines from '../../assets/icons/ThreeLinesSVG';
export default function Name({ name }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <ThreeLines />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ffffff51',
        borderBottomWidth: .5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    text: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 20,
    },
    image: {
    },
});

