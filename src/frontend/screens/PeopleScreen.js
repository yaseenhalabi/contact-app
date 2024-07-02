import { SafeAreaView, View, StyleSheet, ScrollView, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../utils/colors';
import Name from '../components/people screen/Name';
import { useSelector, useDispatch } from 'react-redux';
import { addPerson } from '../redux/peopleSlice'
import SearchBar from '../components/SearchBar';
import { useEffect } from 'react'
import 'react-native-get-random-values';
import { v6 as uuidv6 } from 'uuid';

export default function PeopleScreen({ route, navigation}) {
    useEffect(() => navigation.addListener('state', () => {
        if (route.params?.addingPerson) {
            setAddingPerson(true)
            navigation.setParams({addingPerson: false})
        }
    }, [navigation]))

    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState('');
    const peopleState = useSelector(state => state.people);
    const people = searchContent.length == 0 ? peopleState : peopleState.filter(person => person.name.toLowerCase().includes(searchContent.toLowerCase()));
    const [newName, setNewName] = useState('');
    const [addingPerson, setAddingPerson] = useState(false);

    const handleAddPerson = () => {
        if (!newName) {
            setAddingPerson(false);
            return;
        }
        const newID = uuidv6();
        const newBlankPerson = {
            name: newName,
            id: newID,
            tags: [],
            birthday: null,
            address: '',
            notes: '',
            xLink: '',
            instagramLink: '',
        }
        dispatch(addPerson(newBlankPerson));
        setAddingPerson(false);
        setNewName('');
        navigation.push('Profile', {id: newID})
    }

    const openProfile = (id) => {
        setAddingPerson(false);
        setNewName('');
        navigation.push('Profile', {id})
    }
    return (
        <SafeAreaView style={styles.container}>  
            {/* <AddNameButton isDisabled={searchContent} onPress={() => setAddingPerson(true)}/> */}
            <SearchBar searchContent={searchContent} setSearchContent={setSearchContent}/>
            <ScrollView>
                {
                    addingPerson &&
                    <Name name={newName} isInput handleNameChange={setNewName} onSubmit={() => handleAddPerson()}/>
                }
                {people.map((data) => (
                    <TouchableOpacity key={data.id} onPress={() => openProfile(data.id)}>
                        <Name name={data.name} />
                    </TouchableOpacity>
                ))}
            </ScrollView> 
        </SafeAreaView>
    )   
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flex: 1,
    },
    searchContainer: {
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        borderColor: '#ffffff51',
        borderBottomWidth: .2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        columnGap: 10,
    },
    searchInput: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 20,
        opacity: .7,
        width: width - 93,
    },
    searchImage: {
        width: 20,
        height: 20,
        alignContent: 'center',
        alignItems: 'center',
        opacity: .7,
    },
});




