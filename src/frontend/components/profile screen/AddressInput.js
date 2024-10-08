import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { updatePersonsAddress } from '../../redux/peopleSlice';
import { COLORS } from '../../utils/colors';
import secret from '../../utils/secret';

export default function AddressInput({ id }) {
    const dispatch = useDispatch();
    const address = useSelector(state => state.people.find(person => person.id === id)?.address);
    const updateAddress = (newAddress) => dispatch(updatePersonsAddress({ id, newAddress }));
    const ref = useRef();

    useEffect(() => {
        ref.current?.setAddressText(address);
    }, [address]);

    return (
        <View style={styles.addressContainer}>
            <Text style={{ ...styles.mediumText, marginBottom: 5, fontWeight: '600' }}>Address: </Text>
            <GooglePlacesAutocomplete
                disableScroll={true}
                ref={ref}
                onPress={(data) => {
                    updateAddress(data.description);
                }}
                enablePoweredByContainer={false}
                query={{
                    key: secret.API_KEY,
                    language: 'en',
                }}
                styles={{
                    textInput: styles.textInput,
                    listView: {
                        position: 'absolute',
                        top: 40,
                    },
                }}
                textInputProps={{
                    defaultValue: address,
                    placeholder: 'Enter Address...',
                    placeholderTextColor: COLORS.placeholder,
                }}
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
        fontFamily: 'trebuchet',
        fontSize: 14,
        backgroundColor: COLORS.secondary,
        padding: 5,
        height: 'auto',
        paddingHorizontal: 10,
    },
    mediumText: {
        color: COLORS.off_white,
        fontFamily: 'trebuchet',
        fontSize: 14,
    },
});
