import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../utils/colors';
import searchIcon from '../assets/icons/searchicon.png';
import filterIcon from '../assets/icons/filtericon.png';
import Name from '../components/home screen/Name';
import AddNameButton from '../components/home screen/AddNameButton';

export default function PeopleScreen({ navigation }) {

    mock_data = [
        {
            id: '29051', 
            firstName: "John", 
            lastName: "Doe", 
            tags: [["Hinsdale Central", "#df4040"], ["Asbahi Family", "#c4438a"], ["People I Hate", "#4fbf38"], ["Computer Science Club", "#1794a0"]], 
            birthday: "5/29/2001", 
            notes: "This is a note\nthis is more stuff\n\nthis is some more notes",
            xLink: "https://www.google.com",
            instagramLink: "https://www.instagram.com",
        },
        {
            id: '12345', 
            firstName: "Jane", 
            lastName: "Smith", 
            tags: [["University of California", "#ec7dd2"], ["Smith Family", "#2baa6a"]], 
            birthday: "03/05/1990", 
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/janesmith",
        },
        {
            id: '98765', 
            firstName: "Michael", 
            lastName: "Johnson", 
            tags: [["Harvard University", "#122089"], ["Johnson Family", "#c2114c"]], 
            birthday: "07/22/1985", 
            notes: "Nulla facilisi. Sed euismod, nunc a aliquam eleifend, mauris justo lacinia mauris, vitae luctus nunc risus a nunc.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/michaeljohnson",
        },
        // Add more mock data here
    ];
    const [searchContent, setSearchContent] = useState('');
    return (
        <SafeAreaView style={styles.container}>  
            <AddNameButton />
            {/* Search Bar + filters */}
            <View style={styles.searchContainer}>
                <Image source={searchIcon} style={styles.searchImage}/>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search..." 
                    placeholderTextColor={styles.searchInput.color} 
                    value={searchContent} 
                    onChangeText={setSearchContent} 
                />
                <Image source={filterIcon} style={styles.searchImage}/>

            </View> 
            {/* List of Names */}
            <ScrollView>
            {mock_data.map((data) => (
                <TouchableOpacity key={data.id} onPress={() => navigation.push('Profile', data)}>
                    <Name firstName={data.firstName} lastName={data.lastName} />
                </TouchableOpacity>
            ))}
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
        borderColor: '#ffffff51',
        borderBottomWidth: .2,
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
    },
    searchImage: {
        width: 20,
        height: 20,
        alignContent: 'center',
        alignItems: 'center',
        opacity: .7,
    },
});




