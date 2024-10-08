import React, { useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsNotes } from '../../redux/peopleSlice';
import { COLORS } from '../../utils/colors';

export default function NotesInput({ id }) {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.people.find(person => person.id === id)?.notes) || "";
    const updateNotes = (newNotes) => dispatch(updatePersonsNotes({ id, newNotes }));
    const notesInputRef = useRef(null);

    const handleBoxPress = () => {
        notesInputRef.current.focus();
    }

    return (
        <TouchableWithoutFeedback onPress={handleBoxPress}>
            <View style={styles.notesContainer}>
                <Text style={styles.subTitle}>Notes</Text>
                <TextInput
                    ref={notesInputRef}
                    style={[styles.mediumText, { maxHeight: 150 }]}
                    placeholder='Enter Notes Here...'
                    placeholderTextColor={COLORS.placeholder}
                    multiline={true}
                    value={notes}
                    onChangeText={updateNotes}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    mediumText: {
        color: COLORS.off_white,
        fontFamily: 'trebuc',
        fontSize: 14,
    },
    notesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.secondary,
        zIndex: -1,
        height: 200,
    },
    subTitle: {
        color: COLORS.off_white,
        fontSize: 14,
        marginBottom: 10,
        fontWeight: '600',
    },
});
