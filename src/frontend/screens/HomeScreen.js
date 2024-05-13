import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../utils/colors';
import searchIcon from '../assets/images/searchicon.png';
import filterIcon from '../assets/images/filtericon.png';
import Name from '../components/home screen/Name';

export default function HomeScreen() {

    mock_data = [
        {id: '29051', firstName: "John", lastName: "Doe"},
        {id: '29052', firstName: "Adam", lastName: "Smith"},
        {id: '29053', firstName: "Henry", lastName: "Banks"},
        {id: '29054', firstName: "Jack", lastName: "Travis"},
        {id: '29055', firstName: "Tom", lastName: "Hanks"}, 
        {id: '29056', firstName: "Sam", lastName: "Smith"},
    ]
    const [searchContent, setSearchContent] = useState('');
    
    return (
        <SafeAreaView style={styles.container}>  
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
                <Name key={data.id} firstName={data.firstName} lastName={data.lastName} />
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




