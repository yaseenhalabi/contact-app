import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../../utils/colors';

export default function Name({ name, isInput, handleNameChange, onSubmit, isSelected }) {
    return (
        <View style={{ ...styles.container, backgroundColor: isSelected ? COLORS.secondary : COLORS.primary, borderBottomWidth: isSelected ? 0 : 0.5 }}>
            {isInput ? (
                <TextInput
                    onBlur={onSubmit}
                    style={styles.text}
                    value={name}
                    autoComplete='off'
                    autoCapitalize='words'
                    autoCorrect={false}
                    placeholder='Enter name...'
                    onChangeText={handleNameChange}
                    onSubmitEditing={onSubmit}
                    autoFocus
                    width={300}
                />
            ) : (
                <Text style={styles.text}>{name}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ffffff51',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    text: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 20,
    },
});
