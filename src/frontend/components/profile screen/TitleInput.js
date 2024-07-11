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

const styles = StyleSheet.create({
    titleText: {
        textOverflow: 'ellipsis',
        fontSize: 30,
        color: COLORS.off_white,
        fontWeight: 'bold',
        width: '80%',
        textShadowColor: 'rgba(0, 0, 0, 0.444)',
        textShadowOffset: { width: 2, height: 4 },
        textShadowRadius: 5,
    }, 
})