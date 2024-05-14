import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../utils/colors';
import tagIcon from '../../assets/icons/tagicon.png';
export default function NavigateToTagsButton() {
    return (
        <TouchableOpacity style={styles.button}>
            <Image source={tagIcon} style={styles.buttonIcon}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        bottom: 100, 
        right: 27.5, 
        backgroundColor: COLORS.button2,
        padding: 10,
        borderRadius: 360,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
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
        width: 20,
        height: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.5,

    },
});
