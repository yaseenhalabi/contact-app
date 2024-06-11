import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../utils/colors.js';
import searchIcon from '../assets/icons/searchicon.png';
import Tag from '../components/tags screen/Tag';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
const NUM_COLUMNS = 2;
const GAP_IN_BETWEEN = 10;
const TAG_BOX_WIDTH = Dimensions.get('window').width / NUM_COLUMNS - GAP_IN_BETWEEN*1.5;
const TAG_BOX_HEIGHT = 70;
export default function TagsScreen() {

    const data = useSelector(state => state.tags);
    const [searchContent, setSearchContent] = useState('');
    
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
            <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <Tag tagName={item.name} 
                        color={item.color} 
                        width={TAG_BOX_WIDTH} 
                        gap={GAP_IN_BETWEEN}
                        height={TAG_BOX_HEIGHT}/>
                )}
                keyExtractor={(item) => item.id}
                numColumns={NUM_COLUMNS}
                columnWrapperStyle={styles.columnWrapperStyle}
                contentContainerStyle={styles.tagContainer}
            />
            </View>
        </View>
    )   
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flex: 1,
    },
    header: {
        padding: 15,
    },
    headerText: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 30,
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
        alignContent: 'center',
        alignItems: 'center',
        opacity: .7,
    },
    tagContainer: {

    },
    tagText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 18,
    }
});




