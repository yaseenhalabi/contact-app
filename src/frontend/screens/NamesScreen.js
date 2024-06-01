import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../utils/colors';
import searchIcon from '../assets/icons/searchicon.png';
import filterIcon from '../assets/icons/filtericon.png';
import Name from '../components/Names Screen/Name';
import AddNameButton from '../components/Names Screen/AddNameButton';
import { useSelector, useDispatch } from 'react-redux';
import { addPerson } from '../peopleSlice'
export default function NamesScreen({ navigation }) {
    const people = useSelector(state => state.people);
    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState('');
    const handleAddNameButtonPress = () => {
        dispatch(addPerson({name: 'New Name'}));
    }
    return (
        <SafeAreaView style={styles.container}>  
            <AddNameButton onPress={handleAddNameButtonPress}/>
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
            {people.map((data) => (
                <TouchableOpacity key={data.id} onPress={() => navigation.push('Profile', data)}>
                    <Name name={data.name} />
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




