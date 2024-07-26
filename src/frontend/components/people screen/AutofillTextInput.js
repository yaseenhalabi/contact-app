import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { COLORS } from '../../utils/colors';
import { updatePeoplePreferences } from '../../redux/preferencesSlice';
import { useState } from 'react';
import searchIcon from '../../assets/icons/searchicon.png';

export default function AutofillTextInput({ suggestions, onEndEditing }) {
    const [input, setInput] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const handleChange = (text) => {
        const suggested_tag = suggestions.find(s => s.name.toLowerCase().startsWith(text.toLowerCase()));
        if (suggested_tag && text.length > 0) {
            setSuggestion(suggested_tag.name)
            setInput(text);
        } else {
        setSuggestion('')
      }
      setInput(text)
    };
    const handleEndEditing = (x) => {
        if (suggestion.length > 0) {
            onEndEditing(suggestion);
        }
        setSuggestion('');
        setInput('');
        
    }

    return (
        <View style={styles.sortByTagInputContainer}>
            <Image source={searchIcon} style={styles.searchIcon} />
            <TextInput 
                value={input}
                onChangeText={handleChange} 
                style={styles.sortByTagInput}
                placeholder="Tag Name"
                placeholderTextColor={"#ffffff69"}
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                onEndEditing={handleEndEditing}
            />
            {input.length < 14 && suggestion.length > 0 &&
            <View style={styles.autofillTextContainer}>
                <Text style={styles.text}>{input}</Text>
                <Text style={{...styles.text, color: COLORS.placeholder}}>{suggestion.substring(input.length)}</Text>
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
    sortByTagInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        flex: 1,
        width: 'auto',
        maxWidth: 170,
    },
    searchIcon: {
        width: 15,
        height: 15,
        marginRight: 5,
        opacity: .7,
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
        left: 20,
        flexDirection: 'row',
        maxWidth: 120,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        
    },
});