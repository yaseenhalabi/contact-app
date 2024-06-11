import { SafeAreaView, TouchableOpacity, View, StyleSheet, Text, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import { COLORS } from '../../utils/colors';
import personIcon from '../../assets/icons/personicon.png';
import { LinearGradient } from 'expo-linear-gradient';
export default function Tag({ tagName, color, width, height, gap, noGradient, isTextInput, handleChangeText, isDisabled, onEnter}) {
    // relativeSize is float showing proportion of people relative to tag with highest people
    return (
        <TouchableOpacity onPress={() => console.log("hi")} disabled={isDisabled}>
            <LinearGradient 
                colors={[color, noGradient ? color : COLORS.white]} 
                style={{...styles.tagContainer, width: width, marginLeft: gap, marginTop: gap, height: height}}
                end={{x: .5, y: 5}}
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
                    />
                    :
                    <Text style={styles.tagText}>{tagName}</Text>
                }
            </LinearGradient> 
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
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