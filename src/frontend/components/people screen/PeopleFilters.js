import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Modal, Touchable } from 'react-native';
import { COLORS } from '../../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { updatePeoplePreferences } from '../../redux/preferencesSlice';
import { useState, useRef } from 'react';
import searchIcon from '../../assets/icons/searchicon.png';
import AutofillTextInput from './AutofillTextInput';

export default function PeopleFilters() {
    const dispatch = useDispatch();
    const tagSuggestions = useSelector(state => state.tags);
    const preferences = useSelector(state => state.preferences.people);
    const updatePreferences = (newPeoplePreferences) => dispatch(updatePeoplePreferences(newPeoplePreferences));
    const [selectedSortBy, setSelectedSortBy] = useState(preferences.sortMethod || 'none');
    const sortByOptions = [
        {name: 'None', value: 'none'},
        {name: 'A-Z', value: 'alphabetical'},
        {name: 'Z-A', value: 'alphabetical-reverse'},
        {name: 'Soonest Birthday', value: 'birthday-soonest'},
    ] 
    const updateSortBy = (newSortBy) => {
        setSelectedSortBy(newSortBy);
        updatePreferences({...preferences, sortMethod: newSortBy});
    }
    const handleReturn = (suggestion) => {
        const tag = tagSuggestions.find(s => s.name.toLowerCase() == suggestion.toLowerCase());
        if (!tag) return
        if (preferences.tagFilters.map(tag => tag.id).includes(tag.id)) return;
        updatePreferences({...preferences, tagFilters: [...preferences.tagFilters, tag]});
    }

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
                    <AutofillTextInput suggestions={tagSuggestions} onEndEditing={(tagId) => handleReturn(tagId)} />
                </View>
            </View>
            {
            preferences.tagFilters.length > 0 &&
            <View style={styles.tagContainer}>
                {preferences.tagFilters.map(tag => (
                    <View key={tag.id} style={{...styles.tag, backgroundColor: tag.color}}>
                        <Text style={styles.tagText}>{tag.name}</Text>
                    </View>
                ))}
            </View>
            }

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
        flex: 1,
        width: 'auto',
        maxWidth: 150,
    },
    searchIcon: {
        width: 15,
        height: 15,
        marginRight: 5,
        opacity: .3,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        backgroundColor: COLORS.primary,
        padding: 5,
    },
    tag: {
        backgroundColor: "#FF6B85",
        borderRadius: 360,
        paddingVertical: 4,
        paddingHorizontal: 13,
        width: 'auto',
        maxHeight: 20,
        alignItems: 'flex-start',
        zIndex: 9,
    },
    tagText: {
        color: COLORS.white,
        fontFamily: 'trebuc',
        fontWeight: 'bold',
        fontSize: 9,
        width: '100%',
    },
    
});