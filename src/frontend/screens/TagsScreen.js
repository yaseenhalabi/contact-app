import { SafeAreaView, View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { COLORS, TAG_COLORS } from '../utils/colors.js';
import SearchBar from '../components/global/SearchBar.js';
import Tag from '../components/tags screen/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { addTag, removeTags } from '../redux/tagsSlice.js';
import 'react-native-get-random-values';
import { v6 as uuidv6 } from 'uuid';
import DeleteFooter from '../components/global/DeleteFooter.js';
// Constants for tag spacing
const NUM_COLUMNS = 2;
const GAP_IN_BETWEEN = 10;
const TAG_BOX_WIDTH = Dimensions.get('window').width / NUM_COLUMNS - GAP_IN_BETWEEN*1.5;
const TAG_BOX_HEIGHT = 70;

export default function TagsScreen({ navigation, route }) {

    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => navigation.addListener('state', () => {
        if (route.params?.addingTag && !isDeleting) {
            setAddingTag(true);
            navigation.setParams({addingTag: false})
        }
    }, [navigation]))
    const dispatch = useDispatch();

    // filtering tag data
    const [searchContent, setSearchContent] = useState('');
    const allTags = useSelector(state => state.tags);
    const filteredTags = searchContent ? allTags.filter(tag => tag.name.toLowerCase().includes(searchContent.toLowerCase())) : allTags;    
    
    // adding new tags
    const [addingTag, setAddingTag] = useState(false);
    const [newTag, setNewTag] = useState(
        {
            name: "",
            color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
            id: uuidv6() 
        }
    );

    // add tag to redux store
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
                id: uuidv6()
            }
        )
    }
    // deleting tags
    const [selectedTags, setSelectedTags] = useState([]);
    const selectTag = (id) => {
        if (selectedTags.includes(id)) {
            setSelectedTags(selectedTags.filter(tag => tag != id));
            if (selectedTags.length === 1) {
                setIsDeleting(false);
            }
        }
        else {
            setSelectedTags([...selectedTags, id]);
        }
    }
    const deleteSelectedTags = () => {
        dispatch(removeTags(selectedTags));
        setIsDeleting(false);
        setSelectedTags([]);
    }
    const handleTagPress = (id) => {
        if (isDeleting) {
            selectTag(id);
        }
        else {
            navigation.push('TaggedPeople', {tagId: id, tagName: allTags.find(tag => tag.id == id).name})
        }
    }
    const handleTagLongPress = (id) => {
        if (!isDeleting) {
            setIsDeleting(true);
            setSelectedTags([id]);
        }
    }


    return (
        <SafeAreaView style={styles.container}>  
            <SearchBar searchContent={searchContent} setSearchContent={setSearchContent}/>
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
                        isTextInput
                        isDisabled
                        value={newTag.name}
                        handleChangeText={(text) => setNewTag({...newTag, name: text})}
                    />
                    }
                    {filteredTags.map(tag => (
                        <Tag 
                            onPress={() => handleTagPress(tag.id)}
                            onLongPress={() => handleTagLongPress(tag.id)}
                            isSelected={selectedTags.includes(tag.id)}
                            key={tag.id}
                            tagName={tag.name} 
                            color={tag.color} 
                            width={TAG_BOX_WIDTH}
                            height={TAG_BOX_HEIGHT}
                            gap={GAP_IN_BETWEEN}
                        />
                    ))}
                </View>
                {filteredTags.length == 0 && !addingTag && <Text style={styles.noResultsError}>No Tags Found</Text>}
            </ScrollView>
            {
            isDeleting && 
            <DeleteFooter
                onPress={deleteSelectedTags}
                deleteText={`Delete ${selectedTags.length} Contacts`} 
                onCancel={() => {
                    setIsDeleting(false)
                    setSelectedTags([])
                }}
            />
            }
        </SafeAreaView>
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
    noResultsError: {
        color: COLORS.placeholder,
        fontFamily: 'Trebuc',
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
    }
});




