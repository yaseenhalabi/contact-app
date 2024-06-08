import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsTags } from '../../redux/peopleSlice';
import { addTag, removeTag } from '../../redux/tagsSlice';
import { COLORS, TAG_COLORS } from '../../utils/colors';
import { FlatList } from 'react-native-gesture-handler';


export default function Tags({ id }) {
    const dispatch = useDispatch();
    const allTags = useSelector(state => state.tags);
    const profileTagIds = useSelector(state => state.people.find(person => person.id == id)).tags
    const currentTags = allTags.filter(tag => profileTagIds.includes(tag.id));
    const updateCurrentTagIds = (newIds) => dispatch(updatePersonsTags({id, newIds}));
    const [addingTag, setAddingTag] = useState(false);
    const [newTag, setNewTag] = useState(
        {
            name: "",
            color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
            id: (Math.max(...allTags.map(tag => tag.id)) + 1).toString()
        }
    );
    const confirmNewTag = () => {
        if (allTags.map(tag => tag.name).includes(newTag.name)) {
            alert("Tag already exists")
            setAddingTag(false);
        }
        else if (newTag.name.length > 0) {
            dispatch(addTag({id: newTag.id, name: newTag.name, color: newTag.color}))
            updateCurrentTagIds([...profileTagIds, newTag.id]);
            setAddingTag(false);
            setNewTag(
                {
                    name: "",
                    color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
                    id: (Math.max(...allTags.map(tag => parseInt(tag.id))) + 2).toString()
                }
            );
        }
        else {
            setAddingTag(false);
        }
    }

    const addTagToProfile = (tagId) => {
        console.log(tagId)
        updateCurrentTagIds([...profileTagIds, tagId]);
        setAddingTag(false);
    }


    // console.log(newTagId)
    // console.log(profileTagIds)
    // console.log(allTags)

    const tagSearchData = allTags.filter(tag => tag.name.includes(newTag.name) && !profileTagIds.includes(tag.id));
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
                <TouchableOpacity const onPress={() => setAddingTag(true)} style={{justifyContent: 'center', opacity: .8}}>
                    <Text style={styles.smallText}>+ Add Tag</Text>
                </TouchableOpacity> 
                :
                <View style={{flexDirection: 'column'}}>
                    <View style={[styles.tag, {backgroundColor: newTag.color}]}>
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
                    tagSearchData.length > 0 &&
                    <View>
                            {
                                tagSearchData.map(item =>
                                    <TouchableOpacity key={item.id} style={[styles.tag, {backgroundColor: COLORS.primary, marginTop: 5}]} onPress={() => addTagToProfile(item.id)}>
                                        <Text style={styles.smallText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                    </View>
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
    },
    smallText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 10,
    },
})