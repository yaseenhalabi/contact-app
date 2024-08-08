import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { COLORS } from '../../utils/colors';
import trashIcon from '../../assets/icons/trashicon.png';

export default function DeleteFooter({ deleteText, onPress, onCancel }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={onPress} 
                style={styles.deleteButton}
                hitSlop={20}
            >
                <Image style={styles.trashImage} source={trashIcon}></Image>
                <Text style={styles.text}>{deleteText}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={onCancel}
                hitSlop={20}
            >
                <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.delete_red,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
        flex: 1,
        zIndex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,    
    },
    trashImage: {
        width: 15,
        height: 15,
    },
    text: {
        fontFamily: 'Trebuc',
        color: 'white',
        fontSize: 14,
    }, 
});