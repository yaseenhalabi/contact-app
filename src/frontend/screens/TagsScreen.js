import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../utils/colors';
import searchIcon from '../assets/icons/searchicon.png';
import Tag from '../components/tags screen/Tag';

export default function TagsScreen() {

    mock_data = [ ]
    const [searchContent, setSearchContent] = useState('');
    
    return (
        <SafeAreaView style={styles.container}>  
            <View style={styles.header}>
                <Text style={styles.headerText}>Tags</Text> 
            </View>
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
            <View style={styles.tagContainer}>
                <ScrollView>
                    <Tag tagName="Hinsdale Central" color="#5151d6" relativeSize={.9}/>
                    <Tag tagName="Long piece of text long piece of text" color="#F51C43" relativeSize={.2}/>
                    <Tag tagName="Asbahi Family" color="#c4438a" relativeSize={.4}/>
                </ScrollView> 
            </View>
        </SafeAreaView>
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
        backgroundColor: COLORS.secondary,
        flex: 1,
    },
    tag: {
        padding: 10,
        backgroundColor: '#F51C43',
        width: '50%',
        borderTopEndRadius: 360,
        borderBottomEndRadius: 360,
    },
    tagText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 18,
    }
});




