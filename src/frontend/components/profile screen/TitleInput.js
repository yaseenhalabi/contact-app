import { View, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsName } from '../../redux/peopleSlice';
import { COLORS } from '../../utils/colors';
export default function TitleInput({ id }) {
    const dispatch = useDispatch();
    const name = useSelector(state => state.people.find(person => person.id == id)?.name) || "";
    const updateName = (newName) => dispatch(updatePersonsName({id, newName}));
    return (
        <TextInput style={styles.titleText} value={name} onChangeText={updateName}/>
    )
}

styles = StyleSheet.create({
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.white,
        margin: 20,
    },
})