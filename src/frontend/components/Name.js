import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../utils/colors';
import ThreeLines from '../assets/images/ThreeLinesSVG';
export default function Name({ firstName, lastName }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{firstName} {lastName}</Text>
            <ThreeLines />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ffffff51',
        borderBottomWidth: .2,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    text: {
        color: COLORS.off_white,
        fontFamily: 'Inter-Black',
        fontSize: 17,
    },
    image: {
        width: '10%',
        height: '200%',
    },
});

