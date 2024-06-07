import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsTags } from '../../redux/peopleSlice';
import { COLORS, TAG_COLORS } from '../../utils/colors';


export default function Tags({ id }) {
    const dispatch = useDispatch();
    const tagsState = useSelector(state => state.people.find(person => person.id == id).tags)
    const updateTags = (newTags) => dispatch(updatePersonsTags({id, newTags}));
    const [addingTag, setAddingTag] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [newTagColor, setNewTagColor] = useState(TAG_COLORS[0]);
    const confirmNewTag = () => {
        if (newTag.length > 0) {
            updateTags([...tagsState, [newTag, newTagColor]]);
            setAddingTag(false);
            setNewTag('');
            setNewTagColor(TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]);
        }
    }

    return (
        <View style={styles.tagsContainer}>
            {
                tagsState.map(([tagName, color]) => 
                    <View key={tagName} style={[styles.tag, {backgroundColor: color}]}>
                        <Text style={styles.smallText}>{tagName}</Text>
                    </View>
                )
            }
            {
                !addingTag ?
                <TouchableOpacity const onPress={() => setAddingTag(true)} style={{justifyContent: 'center', opacity: .8}}>
                    <Text style={styles.smallText}>+ Add Tag</Text>
                </TouchableOpacity> 
                :
                <View style={[styles.tag, {backgroundColor: newTagColor}]}>
                    <TextInput 
                        style={styles.smallText}
                        onChangeText={setNewTag}
                        autoFocus={true}
                        onBlur={() => confirmNewTag()}
                        maxLength={30}
                        width={50}
                    />
                </View>
            }
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
        width: 'auto',
    },
    smallText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 10,
    },
})