import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { COLORS } from '../../utils/colors';
export default function Name({ name, isInput, handleNameChange, onSubmit }) {
    return (
        <View style={styles.container}>
            {
                isInput ?
                <TextInput
                    style={styles.text}
                    value={name}
                    placeholder='Enter name...'
                    onChangeText={handleNameChange}
                    onSubmitEditing={onSubmit}
                    autoFocus width={300}
                />
                :
                <Text style={styles.text}>{name}</Text>
            }
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

