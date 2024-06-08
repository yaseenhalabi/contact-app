import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
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

    // console.log(newTagId)
    // console.log(profileTagIds)
    // console.log(allTags)

    const tagSearchData = allTags.map(tag => tag.name).filter(tag => tag.includes(newTag.name) && newTag.name.length > 0);
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
                <View style={[{backgroundColor: 'blue', flexDirection: 'column'}]}>
                    <View style={[styles.tag, {backgroundColor: newTag.color, borderRadius: 0}]}>
                        <TextInput 
                            style={styles.smallText} // Set the width to 100%
                            onChangeText={(value) => setNewTag({...newTag, name: value})}
                            autoFocus={true}
                            onBlur={() => confirmNewTag()}
                            maxLength={30}
                        />
                    </View>
                    {
                    tagSearchData.length > 0 &&
                    <View>
                        <View>
                            <FlatList
                                style={{paddingBottom: 10}}
                                width={100}
                                backgroundColor={newTag.color}
                                data={tagSearchData}
                                renderItem={({item}) => 
                                    <View style={{paddingHorizontal: 13}} onPress={() => setNewTag({...newTag, name: item})}>
                                        <Text style={styles.smallText}>{item}</Text>
                                    </View>
                                }
                            />
                        </View>
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