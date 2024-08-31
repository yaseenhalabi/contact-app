import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native';
import { COLORS } from '../../utils/colors';

export default function Tag({ onPress, onLongPress, isSelected, tagName, color, width, height, gap, isTextInput, handleChangeText, isDisabled, onEnter }) {
    return (
        <View elevation={5} style={styles.container}>
            <TouchableOpacity onPress={onPress} onLongPress={onLongPress} disabled={isDisabled} testID='tag-container'>
                <View
                    style={[styles.tagContainer, { backgroundColor: color, width, marginLeft: gap, marginTop: gap, height }, isSelected ? styles.selected : {}]}
                    end={{ x: .5, y: 5 }}
                    elevation={5}
                >
                    {isTextInput ? (
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
                    ) : (
                        <Text style={styles.tagText}>{tagName}</Text>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
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
    selected: {
        shadowColor: COLORS.white,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
    },
});
