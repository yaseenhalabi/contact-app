import { TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native';
import { COLORS } from '../../utils/colors';
import { LinearGradient } from 'expo-linear-gradient';
export default function Tag({ onPress, tagName, color, width, height, gap, isTextInput, handleChangeText, isDisabled, onEnter}) {
    // A lot of those props are for the new tag input stuff
    return (
        <View elevation={5} style={styles.container}>
        <TouchableOpacity onPress={onPress} disabled={isDisabled} testID='tag-container'>
            <View 
                style={{...styles.tagContainer, backgroundColor: color, width: width, marginLeft: gap, marginTop: gap, height: height}}
                end={{x: .5, y: 5}}
                elevation={5}
            >   
                {
                    isTextInput ?
                    <TextInput 
                        style={styles.tagText}
                        placeholder='Enter tag...'
                        placeholderTextColor='#ffffff3f'
                        value={tagName}
                        onChangeText={handleChangeText}
                        autoFocus
                        onEndEditing={onEnter}
                        autoComplete='off'
                        autoCapitalize='words'
                        autoCorrect={false}
                    />
                    :
                    <Text style={styles.tagText}>{tagName}</Text>
                }
            </View> 
        </TouchableOpacity>
    </View>
    )

}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 2,
    },
    tagContainer: {
        padding: 12,
        borderRadius: 10,
    },
    tagText: {
        color: COLORS.off_white,
        fontSize: 14,
        fontWeight: 'bold',
    },
});