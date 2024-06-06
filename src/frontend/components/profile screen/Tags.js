import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsName, updatePersonsNotes, updatePersonsAddress, updatePersonsTags } from '../../peopleSlice';
import { COLORS } from '../../utils/colors';

export default function Tags({ id }) {
    const dispatch = useDispatch();
    const tagsState = useSelector(state => state.people.find(person => person.id == id).tags)
    const updateTags = (newTags) => dispatch(updatePersonsTags({id, newTags}));

    return (
        <View style={styles.tagsContainer}>
            {
                tagsState.map(([tagName, color]) => 
                    <View key={tagName} style={[styles.tag, {backgroundColor: color}]}>
                        <Text style={styles.smallText}>{tagName}</Text>
                    </View>
                )
            }
            <TouchableOpacity style={{justifyContent: 'center', opacity: .8}}>
                <Text style={styles.smallText}>+ Add Tag</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    tag: {
        backgroundColor: "#FF6B85",
        borderRadius: 360,
        paddingVertical: 4,
        paddingHorizontal: 13,
    },
    smallText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 10,
    },
})