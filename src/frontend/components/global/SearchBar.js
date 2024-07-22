import { Modal, TouchableOpacity, ScrollView, TouchableWithoutFeedback, View, StyleSheet, Text, Image, TextInput, Dimensions } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../../utils/colors';
import searchIcon from '../../assets/icons/searchicon.png';
import filterIcon from '../../assets/icons/filtericon.png';

export default function SearchBar({ searchContent, setSearchContent, filterModalComponent }){
    const [filterModalOn, setFilterModalOn] = useState(false);
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
            <TouchableOpacity onPress={() => setFilterModalOn(true)}>
                <Image source={filterIcon} style={styles.searchImage}/>
            </TouchableOpacity>
            <Modal transparent={true} visible={filterModalOn} >
                <View style={styles.filterModalContainer}>
                    <View style={styles.filterModal}>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={() => setFilterModalOn(false)}>
                            <Text style={styles.modalCloseButtonText}>x</Text>
                        </TouchableOpacity>
                        {filterModalComponent}
                    </View>
                </View>          
            </Modal>
        </View> 
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#000000aa',
        flex: 1,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    filterModalContainer: {
        backgroundColor: '#0000006c',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterModal: {
        backgroundColor: COLORS.secondary,
        width: 300,
        height: 300,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCloseButton: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    modalCloseButtonText: {
        color: COLORS.off_white,
        fontSize: 20,
        fontWeight: 'bold',
    }
});




