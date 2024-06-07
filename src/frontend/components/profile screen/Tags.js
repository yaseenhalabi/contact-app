import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsTags } from '../../redux/peopleSlice';
import { addTag, removeTag } from '../../redux/tagsSlice';
import { COLORS, TAG_COLORS } from '../../utils/colors';


export default function Tags({ id }) {
    const dispatch = useDispatch();
    const allTags = useSelector(state => state.tags);
    const profileTags = useSelector(state => state.people.find(person => person.id == id)).tags
    const profileTagIds = profileTags ? profileTags : [];
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
        if (newTag.name.length > 0) {
            console.log("CONFIRMING NEW TAG")
            try {
                dispatch(addTag({id: newTag.id, name: newTag.name, color: newTag.color}))
            } catch (error) { console.log(error) }
            updateCurrentTagIds([...profileTagIds, newTag.id]);
            setAddingTag(false);
            setNewTag({...newTag, name: ''});
            setNewTag({...newTag, color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]});
        }
    }

    // console.log(newTagId)
    // console.log(profileTagIds)
    // console.log(allTags)


    return (
        <View style={styles.tagsContainer}>
            {
                currentTags.map(({color, name}) => 
                    <View key={name} style={[styles.tag, {backgroundColor: color}]}>
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
                <View style={[styles.tag, {backgroundColor: newTag.color}]}>
                    <TextInput 
                        style={styles.smallText}
                        onChangeText={(value) => setNewTag({...newTag, name: value})}
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