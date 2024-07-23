import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Modal, Touchable } from 'react-native';
import { COLORS } from '../../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { updatePeoplePreferences } from '../../redux/preferencesSlice';
import { useState } from 'react';
import searchIcon from '../../assets/icons/searchicon.png';

export default function PeopleFilters() {
    const dispatch = useDispatch();
    const preferences = useSelector(state => state.preferences.people);
    const updatePreferences = (newPeoplePreferences) => dispatch(updatePeoplePreferences(newPeoplePreferences));
    const sortByOptions = [
        {name: 'None', value: 'none'},
        {name: 'A-Z', value: 'alphabetical'},
        {name: 'Z-A', value: 'alphabetical-reverse'},
        {name: 'Soonest Birthday', value: 'birthday-soonest'},
    ] 
    const [selectedSortBy, setSelectedSortBy] = useState(preferences.sortMethod || 'none');
    const updateSortBy = (newSortBy) => {
        setSelectedSortBy(newSortBy);
        updatePreferences({...preferences, sortMethod: newSortBy});
    }

    const tagOptions = useSelector(state => state.tags);
    return (
        <View style={styles.container}>
            <View style={styles.sortByContainer}>
                <Text style={styles.text}>Sort By:</Text>
                { sortByOptions.map(option => (
                    <TouchableOpacity 
                        onPress={() => updateSortBy(option.value)} 
                        key={option.value} 
                        style={{...styles.sortByItemContainer, opacity: selectedSortBy == option.value ? 1 : .6}}
                    >
                        <Text style={styles.text}>{option.name}</Text>
                    </TouchableOpacity>
                ))
                }
            </View>
            <View style={styles.sortByTagContainer}>
                <Text style={styles.text}>Has Tag(s):</Text>
                <View style={styles.sortByTagInputContainer}>
                    <Image source={searchIcon} style={styles.searchIcon} />
                    <TextInput 
                        style={styles.sortByTagInput}
                        placeholder="Tag Name"
                        placeholderTextColor={"#888"}
                        autoCapitalize='none'
                        autoComplete='off'
                        autoCorrect={false}
                    />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 15,
    },
    container: {
        width: 280,
        height: 280,
        padding: 20,
    },
    sortByContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        flexWrap: 'wrap',
        gap: 10,
    },
    sortByItemContainer: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    sortByTagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    sortByTagInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        flex: 1,
        width: 'auto',
    },
    searchIcon: {
        width: 15,
        height: 15,
        marginRight: 5,
        opacity: .3,
    },
    sortByTagInput: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 15,
        flex: 2,
    }
});