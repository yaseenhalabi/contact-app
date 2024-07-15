import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsTags } from '../../redux/peopleSlice';
import { addTag, removeTag } from '../../redux/tagsSlice';
import { COLORS, TAG_COLORS } from '../../utils/colors';
import 'react-native-get-random-values';
import { v6 as uuidv6 } from 'uuid';

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
        // if the tag already exists, add it to the profile
        if (allTags.map(tag => tag.name).includes(newTag.name)) {
            tagId = allTags.find(tag => tag.name.toLowerCase() == newTag.name.toLowerCase()).id;
            updateCurrentTagIds([...profileTagIds, tagId]);
            setAddingTag(false);
            setNewTag(
                {
                    name: "",
                    color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
                    id: uuidv6()
                }
            );
        }

        // if the tag doesn't exist, add it to the tags and then add it to the profile
        else if (!allTags.map(tag => tag.name).includes(newTag.name) && newTag.name.length > 0) {
            dispatch(addTag({id: newTag.id, name: newTag.name, color: newTag.color}))
            updateCurrentTagIds([...profileTagIds, newTag.id]);
            setAddingTag(false);
            setNewTag(
                {
                    name: "",
                    color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
                    id: uuidv6()
                }
            );
        }
        // if the tag is empty or already exists, don't add it
        else {
            setAddingTag(false);
        }
    }
    const addTagToProfile = (tagId) => {
        updateCurrentTagIds([...profileTagIds, tagId]);
        setAddingTag(false);
    }

    const tagSearchData = allTags.filter(tag => tag.name.toLowerCase().includes(newTag.name.toLowerCase()) && !profileTagIds.includes(tag.id));
    return (
        <View style={styles.tagsContainer}>
            {
                currentTags.map(({id, color, name}) => 
                    <View key={id} style={[styles.tag, {backgroundColor: color}]}>
                        <Text style={styles.smallText}>{name}</Text>
                    </View>
                )
            }
            {
                !addingTag ?
                <TouchableOpacity const onPress={() => setAddingTag(true)} style={{justifyContent: 'center'}}>
                    <Text style={styles.smallText}>+ Add Tag</Text>
                </TouchableOpacity> 
                :
                <View style={{flexDirection: 'column', width: '100%'}}>
                    <View style={[styles.tag, {backgroundColor: '#0000003b', borderRadius: 0}]}>
                        <TextInput 
                            style={styles.smallText} // Set the width to 100%
                            onChangeText={(value) => setNewTag({...newTag, name: value})}
                            autoFocus={true}
                            onBlur={() => confirmNewTag()}
                            maxLength={30}
                            minWidth={30}
                        />
                    </View>
                    {
                    tagSearchData &&
                    <ScrollView style={styles.tagOptionsContainer}>
                            {
                            tagSearchData.map(item =>
                                    <View key={item.id} style={styles.tagListItemContainer}>
                                        <TouchableOpacity 
                                            style={{...styles.tagListItem, backgroundColor: `${item.color}a1`}}
                                            onPress={() => addTagToProfile(item.id)}
                                        >
                                            <Text style={styles.smallText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                    </ScrollView>
                    }

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
        maxHeight: 20,
        alignItems: 'flex-start',
        zIndex: 9,
    },
    smallText: {
        color: COLORS.white,
        fontFamily: 'trebuc',
        fontWeight: 'bold',
        fontSize: 9,
        width: '100%'
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
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
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
    }
})