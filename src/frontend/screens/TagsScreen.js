import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { COLORS, TAG_COLORS } from '../utils/colors.js';
import SearchBar from '../components/global/SearchBar.js';
import Tag from '../components/tags screen/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { addTag } from '../redux/tagsSlice.js';
import 'react-native-get-random-values';
import { v6 as uuidv6 } from 'uuid';
// Constants for tag spacing
const NUM_COLUMNS = 2;
const GAP_IN_BETWEEN = 10;
const TAG_BOX_WIDTH = Dimensions.get('window').width / NUM_COLUMNS - GAP_IN_BETWEEN*1.5;
const TAG_BOX_HEIGHT = 70;

export default function TagsScreen({ navigation, route}) {

    useEffect(() => navigation.addListener('state', () => {
        if (route.params?.addingTag) {
            toggleAddingTag()
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
    const toggleAddingTag = () => setAddingTag(!addingTag);
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
                        handleChangeText={(text) => setNewTag({...newTag, name: text})}
                    />
                    }
                    {filteredTags.map(tag => (
                        <Tag 
                            onPress={() => navigation.push('TaggedPeople', {tagId: tag.id, tagName: tag.name})}
                            key={tag.id}
                            tagName={tag.name} 
                            color={tag.color} 
                            width={TAG_BOX_WIDTH}
                            height={TAG_BOX_HEIGHT}
                            gap={GAP_IN_BETWEEN}
                        />
                    ))}
                </View>
            </ScrollView>
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
});




