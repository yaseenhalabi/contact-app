import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Modal, Touchable } from 'react-native';
import { COLORS } from '../../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { updatePeoplePreferences } from '../../redux/preferencesSlice';
import { useState } from 'react';
import searchIcon from '../../assets/icons/searchicon.png';

export default function PeopleFilters() {
    const [input, setInput] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const tagSuggestions = useSelector(state => state.tags);
    const handleChange = (text) => {
      const currentSuggestion = tagSuggestions.find(s => s.name.toLowerCase().startsWith(text.toLowerCase()));
      if (currentSuggestion && text.length > 0) {
        setSuggestion(currentSuggestion.name)
          } else {
        setSuggestion('')
      }
      setInput(text)
    };
    const handleReturn = () => {
        if (suggestion.length > 0) {
            setInput(suggestion);
            setSuggestion('');
        }
        
    }
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
                        value={input}
                        onChangeText={handleChange} 
                        style={styles.sortByTagInput}
                        placeholder="Tag Name"
                        placeholderTextColor={"#888"}
                        autoCapitalize='none'
                        autoComplete='off'
                        autoCorrect={false}
                        onEndEditing={() => handleReturn()}

                    />
                    {input.length < 14 && suggestion.length > 0 &&
                    <View style={styles.autofillTextContainer}>
                        <Text style={styles.text}>{input}</Text>
                        <Text style={{...styles.text, color: COLORS.placeholder}}>{suggestion.substring(input.length)}</Text>
                    </View>
                    }
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
        maxWidth: 150,
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
        textAlign: 'left',
        flex: 2,
    },
    autofillTextContainer: {
        position: 'absolute',
        left: 10+15+5,
        top: 5,
        flexDirection: 'row',
        maxWidth: 110,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        
    },
});