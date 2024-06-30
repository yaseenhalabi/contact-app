import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';
import { updatePersonsAddress } from '../../redux/peopleSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function AddressInput({ id }) {
    const dispatch = useDispatch();
    const address = useSelector(state => state.people.find(person => person.id == id)?.address);
    const updateAddress = (newAddress) => dispatch(updatePersonsAddress({id, newAddress}));

    return (
        <View style={styles.addressContainer}>
            <Text style={styles.mediumText}>Address: </Text>
            <TextInput 
                style={styles.textInput}
                value={address}
                onChangeText={updateAddress}
                placeholder="Add address here..."
                placeholderTextColor={COLORS.placeholder}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    addressContainer: {
        flexDirection: 'row',
        marginVertical: 15,
        zIndex: -1,
    },
    textInput: {
        color: COLORS.off_white,
        fontFamily: 'trebuc',
        fontSize: 14,
        width: '70%',
    },
    mediumText: {
        color: COLORS.off_white,
        fontFamily: 'trebuc',
        fontSize: 14,
    },
});