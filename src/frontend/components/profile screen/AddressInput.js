import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';
import { updatePersonsAddress } from '../../redux/peopleSlice';
import { useSelector, useDispatch } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function AddressInput({ id }) {
    const dispatch = useDispatch();
    const address = useSelector(state => state.people.find(person => person.id == id)?.address);
    const updateAddress = (newAddress) => dispatch(updatePersonsAddress({id, newAddress}));
    return (
        <View style={styles.addressContainer}>
            <Text style={{...styles.mediumText, marginBottom: 5, fontWeight: '600'}}>Address: </Text>
            <GooglePlacesAutocomplete
                onPress={(data) => {
                    // 'details' is provided when fetchDetails = true
                    updateAddress(data.description);
                }}
                query={{
                    key: process.env.GMAPS_API_KEY,
                    language: 'en',
                }}
                styles={{
                    textInput: styles.textInput,
                    listView: {
                        position: 'absolute',
                        top: 40,
                    },
                }}
                textInputProps={
                    {
                        placeholder: 'Enter Address...',
                        placeholderTextColor: COLORS.placeholder,
                    }
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    addressContainer: {
        flexDirection: 'row',
        marginVertical: 15,
        zIndex: -1,
        alignItems: 'center',
        position: 'relative'
    },

    textInput: {
        color: COLORS.off_white,
        fontFamily: 'trebuc',
        fontSize: 14,
        backgroundColor: COLORS.secondary,
        padding: 5,
        height: 'auto',
        paddingHorizontal: 10,
    },
    mediumText: {
        color: COLORS.off_white,
        fontFamily: 'trebuc',
        fontSize: 14,
    },
});