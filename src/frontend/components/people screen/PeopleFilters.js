import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Touchable } from 'react-native';
import { COLORS } from '../../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { updatePeoplePreferences } from '../../redux/preferencesSlice';
import { useState } from 'react';

export default function PeopleFilters() {
    const dispatch = useDispatch();
    const preferences = useSelector(state => state.preferences.people);
    const updatePreferences = (newPeoplePreferences) => dispatch(updatePeoplePreferences(newPeoplePreferences));
    
    const sortByOptions = [
        {name: 'A-Z', value: 'alphabetical'},
        {name: 'Z-A', value: 'alphabetical-reverse'},
        {name: 'Birthday', value: 'birthday'},
    ] 
    const [selectedSortBy, setSelectedSortBy] = useState(preferences.sortMethod);
    const updateSortBy = (newSortBy) => {
        setSelectedSortBy(newSortBy);
        updatePreferences({...preferences, sortMethod: newSortBy});
    }
    return (
        <View style={styles.container}>
            <View style={styles.sortByContainer}>
                <Text style={styles.text}>Sort By:</Text>
                { sortByOptions.map(option => (
                    <TouchableOpacity 
                        onPress={() => updateSortBy(option.value)} 
                        key={option.value} 
                        style={{...styles.sortByItemContainer, opacity: selectedSortBy == option.value ? 1 : .5}}
                    >
                        <Text style={styles.text}>{option.name}</Text>
                    </TouchableOpacity>
                ))
                }
            </View>
            <View style={styles.tagFilterContainer}>
                <Text style={styles.text}>Has Tag: </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 280,
        height: 280,
        padding: 15,
    },
    sortByContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 10,
    },
    sortByItemContainer: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    text: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 20,
    }
});