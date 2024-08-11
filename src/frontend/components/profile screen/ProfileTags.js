import { View, Text, TouchableOpacity, ScrollView       , StyleSheet, TextInput } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsTags } from '../../redux/peopleSlice';
import { addTag } from '../../redux/tagsSlice';
import { COLORS, TAG_COLORS } from '../../utils/colors';
import 'react-native-get-random-values';
import { v6 as uuidv6 } from 'uuid';
import DeleteFooter from '../global/DeleteFooter';

export default function ProfileTags({ id }) {
    const dispatch = useDispatch();
    const allTags = useSelector(state => state.tags);
    profileTagIds = useSelector(state => state.people.find(person => person.id == id))?.tags || [];
    const currentTags = allTags.filter(tag => profileTagIds.includes(tag.id));
    const updateCurrentTagIds = (newIds) => dispatch(updatePersonsTags({id, newIds}));
    const [addingTag, setAddingTag] = useState(false);
    const [newTag, setNewTag] = useState(
        {
            name: "",
            color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
            id: uuidv6()
        }
    );
    const confirmNewTag = () => {
        if (allTags.map(tag => tag.name).includes(newTag.name)) {
            const tagId = allTags.find(tag => tag.name.toLowerCase() == newTag.name.toLowerCase()).id;
            updateCurrentTagIds([...profileTagIds, tagId]);
            resetNewTag();
        } else if (newTag.name.length > 0) {
            dispatch(addTag({id: newTag.id, name: newTag.name, color: newTag.color}))
            updateCurrentTagIds([...profileTagIds, newTag.id]);
            resetNewTag();
        } else {
            setAddingTag(false);
        }
    };

    const resetNewTag = () => {
        setAddingTag(false);
        setNewTag({
            name: "",
            color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
            id: uuidv6()
        });
    };
    const addTagToProfile = (tagId) => {
        updateCurrentTagIds([...profileTagIds, tagId]);
        setAddingTag(false);
    };
    // ~~~~~~ tag search filtering
    const tagSearchData = allTags.filter(tag => tag.name.toLowerCase().includes(newTag.name.toLowerCase()) && !profileTagIds.includes(tag.id));

    return (
        <View style={styles.tagsContainer}>
            {currentTags.map(({ id, color, name }) => 
                <View key={id} style={[styles.tag, { backgroundColor: color }]}>
                    <Text style={styles.smallText}>{name}</Text>
                </View>
            )}
            {!addingTag ? (
                <TouchableOpacity onPress={() => setAddingTag(true)} style={{ justifyContent: 'center' }}>
                    <Text style={styles.smallText}>+ Add Tag</Text>
                </TouchableOpacity>
            ) : (
                <View style={{ flexDirection: 'column', width: '100%' }}>
                    <View style={[styles.tag, { backgroundColor: '#0000003b', borderRadius: 0 }]}>
                        <TextInput 
                            style={styles.smallText}
                            onChangeText={(value) => setNewTag({...newTag, name: value})}
                            autoFocus={true}
                            onEndEditing={() => confirmNewTag()}
                            maxLength={30}
                            minWidth={30}
                        />
                    </View>
                    {tagSearchData.length > 0 && (
                        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={styles.tagOptionsContainer}>
                            {tagSearchData.map(item => (
                                <TouchableOpacity key={item.id} onPress={() => addTagToProfile(item.id)} style={styles.tagListItemContainer}>
                                    <View style={{...styles.tagListItem, backgroundColor: `${item.color}a1`}}>
                                        <Text style={styles.smallText}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </KeyboardAwareScrollView>
                    )}
                </View>
            )}
        </View>
    );
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
        maxHeight: 30,
        alignItems: 'flex-start',
        zIndex: 9,
    },
    smallText: {
        color: COLORS.white,
        fontFamily: 'trebuc',
        fontWeight: 'bold',
        fontSize: 11,
        width: '100%',
    },
    tagOptionsContainer: {
        zIndex: 3,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        width: '100%',
        top: 20,
        maxHeight: 200,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    tagListItemContainer: {
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    tagListItem: {
        backgroundColor: "#FF6B85",
        borderRadius: 360,
        paddingVertical: 4,
        paddingHorizontal: 13,
        width: 'auto',
        maxHeight: 20,
        alignItems: 'flex-start',
        zIndex: 9,
    },
});
