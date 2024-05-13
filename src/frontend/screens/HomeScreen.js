import { SafeAreaView, View, StyleSheet, Text, ScrollView, Image, TextInput } from 'react-native';
import { COLORS } from '../utils/colors';
import searchIcon from '../assets/images/searchicon.png';
import Name from '../components/Name';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>  
            {/* Search Bar + filters */}
            <View style={styles.searchContainer}>
                <Image source={searchIcon} style={styles.searchImage}/>
                <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor={styles.searchInputafr.color} />
            </View> 
            {/* List of Names */}
            <ScrollView>
                <Name firstName="John" lastName="Doe" />
                <Name firstName="Adam" lastName="Smith" />
                <Name firstName="Henry" lastName="Banks" />
            </ScrollView> 
        </SafeAreaView>
    )   
}

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
    },
    searchImage: {
        width: 20,
        height: 20,
        opacity: .7,
    },
});




