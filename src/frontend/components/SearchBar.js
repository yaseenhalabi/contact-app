import { View, StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import { COLORS } from '../utils/colors';
import searchIcon from '../assets/icons/searchicon.png';
import filterIcon from '../assets/icons/filtericon.png';

export default function SearchBar({ searchContent, setSearchContent }){
    return (
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
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 7,
        columnGap: 10,
        borderRadius: 10,
        marginHorizontal: 12,
        marginVertical: 8,
    },
    searchInput: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 18,
        opacity: .7,
        width: width - 105,
    },
    searchImage: {
        width: 17,
        height: 17,
        alignContent: 'center',
        alignItems: 'center',
        opacity: .7,
        top: 3,
    },
});




