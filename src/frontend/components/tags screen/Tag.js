import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import { COLORS } from '../../utils/colors';
import personIcon from '../../assets/icons/personicon.png';
export default function Tag({ tagName, color, relativeSize }) {
    // relativeSize is float showing proportion of people relative to tag with highest people
    return (
        <View style={styles.tagContainer}>
            <View style={[styles.tag, { backgroundColor: color, width: `${Math.min(100*(.2+relativeSize), 80)}%` }]}>
                <Text style={styles.tagText}>{tagName}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', columnGap: '3'}}>
                <Text style={styles.tagText}>{100*relativeSize}</Text>
                <Image source={personIcon} style={styles.personIcon}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingEnd: 7,
    },
    tag: {
        padding: 10,
        borderTopEndRadius: 360,
        borderBottomEndRadius: 360,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 18,
    },
    personIcon: {
        width: 10,
        height: 13,
    }
});