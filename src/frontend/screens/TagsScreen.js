import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { COLORS, TAG_COLORS } from '../utils/colors.js';
import searchIcon from '../assets/icons/searchicon.png';
import Tag from '../components/tags screen/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { addTag } from '../redux/tagsSlice.js';

// Constants for tag spacing
const NUM_COLUMNS = 2;
const GAP_IN_BETWEEN = 10;
const TAG_BOX_WIDTH = Dimensions.get('window').width / NUM_COLUMNS - GAP_IN_BETWEEN*1.5;
const TAG_BOX_HEIGHT = 70;

export default function TagsScreen() {

    const dispatch = useDispatch();

    const [searchContent, setSearchContent] = useState('');
    const allTags = useSelector(state => state.tags);
    const filteredTags = searchContent ? allTags.filter(tag => tag.name.toLowerCase().includes(searchContent.toLowerCase())) : allTags;    
    
    const [addingTag, setAddingTag] = useState(false);
    const toggleAddingTag = () => setAddingTag(!addingTag);
    const [newTag, setNewTag] = useState(
        {
            name: "",
            color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
            id: (Math.max(...allTags.map(tag => tag.id)) + 1).toString()
        }
    );

    const confirmNewTag = () => {
        // add tag if name isn't empty and is unique
        if (newTag.name && !allTags.map(tag => tag.name).includes(newTag.name)) {
            dispatch(addTag({id: newTag.id, name: newTag.name, color: newTag.color}))
        }
        setAddingTag(false);
        setNewTag(
            {
                name: "",
                color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
                id: (Math.max(...allTags.map(tag => parseInt(tag.id))) + 2).toString()
            }
        )
    }

    return (
        <View style={styles.container}>  
            <SafeAreaView>
                <View style={styles.searchContainer}>
                    <Image source={searchIcon} style={styles.searchImage}/>
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder="Search..." 
                        placeholderTextColor={styles.searchInput.color} 
                        value={searchContent} 
                        onChangeText={setSearchContent} 
                    />
                </View>
            </SafeAreaView> 
            <ScrollView>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {
                    addingTag &&
                    <Tag 
                        tagName={newTag.name}
                        color={'#00000058'}
                        width={TAG_BOX_WIDTH}
                        height={TAG_BOX_HEIGHT}
                        gap={GAP_IN_BETWEEN}
                        onEnter={() => confirmNewTag()}
                        noGradient
                        isTextInput
                        isDisabled
                        handleChangeText={(text) => setNewTag({...newTag, name: text})}
                    />
                    }

                    {filteredTags.map(tag => (
                        <Tag key={tag.id} tagName={tag.name} color={tag.color} width={TAG_BOX_WIDTH} height={TAG_BOX_HEIGHT} gap={GAP_IN_BETWEEN}/>
                    ))}
                </View>
            </ScrollView>
            <SafeAreaView style={{width: '100%', position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity 
                    style={styles.addTagButton} 
                    onPress={() => setAddingTag(true)} 
                    disabled={searchContent || addingTag}
                    accessibilityRole='button'
                >
                    <Text style={styles.addTagButtonText}>+ New Tag</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )   
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flex: 1,
    },
    searchContainer: {
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        columnGap: 10,
    },
    searchInput: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 20,
        opacity: .7,
        width: width - 93, // Adjust the width based on your requirements
        opacity: .7,
    },
    searchImage: {
        width: 20,
        height: 20,
        opacity: .7,
    },
    addTagButton: {
        backgroundColor: COLORS.off_white,
        width: '95%',
        borderRadius: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addTagButtonText: {
        color: COLORS.primary,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 15,
    },
});




