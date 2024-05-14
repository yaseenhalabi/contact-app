import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../utils/colors';
import plusIcon from '../../assets/icons/plusicon.png';
export default function AddNameButton() {
    return (
        <TouchableOpacity style={styles.button}>
            <Image source={plusIcon} style={styles.buttonIcon}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.button1,
        padding: 10,
        borderRadius: 360,
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 15, 
        right: 15, 
        zIndex: 1,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonIcon: {
        color: 'white',
        width: 25,
        height: 25,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.5,

    },
});
