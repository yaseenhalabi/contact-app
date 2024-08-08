import { SafeAreaView, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../utils/colors';
import Name from '../components/people screen/Name';
import { useSelector, useDispatch } from 'react-redux';
import { addPerson } from '../redux/peopleSlice'
import { updatePeoplePreferences } from '../redux/preferencesSlice';
import SearchBar from '../components/global/SearchBar';
import { useEffect } from 'react'
import 'react-native-get-random-values';
import { v6 as uuidv6 } from 'uuid';
import PeopleFilters from '../components/people screen/PeopleFilters';

export default function PeopleScreen({ route, navigation}) {

    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState('');
    let peopleState = useSelector(state => state.people);
    let people = peopleState.filter(person => person?.name.toLowerCase().includes(searchContent.toLowerCase()) || []);
    const preferences = useSelector(state => state.preferences.people) || {};

    useEffect(() => navigation.addListener('state', () => {
        if (route.params?.addingPerson) {
            dispatch(updatePeoplePreferences({sortMethod: 'none', tagFilters: []}))
            setAddingPerson(true)
            navigation.setParams({addingPerson: false})
        }
    }, [navigation]))

    const calculateDaysUntilBirthday = (birthday) => {
        today = new Date();
        bday = new Date(birthday);
        bday.setFullYear(today.getFullYear());
        if( today.getTime() > bday.getTime()) bday.setFullYear(bday.getFullYear()+1);
        time_diff = bday.getTime()-today.getTime();
        days = Math.ceil(time_diff/(1000*60*60*24));
        return days;
    }

    if (preferences.sortMethod == 'alphabetical') {
        people = people.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (preferences.sortMethod == 'alphabetical-reverse') {
        people = people.sort((a, b) => b.name.localeCompare(a.name));
    }
    else if (preferences.sortMethod == 'birthday-soonest') {
        people = people.sort((a, b) => {
            if (a.birthday && b.birthday) {
                return calculateDaysUntilBirthday(a.birthday) - calculateDaysUntilBirthday(b.birthday);
            }
            else if (a.birthday) {
                return -1;
            }
            else if (b.birthday) {
                return 1;
            }
            return 0;
        });
    }

    if (preferences.tagFilters) {
        for (let tag of preferences.tagFilters) {
            people = people.filter(person => person.tags.includes(tag));
        }
    }

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
            <SearchBar 
                searchContent={searchContent}
                setSearchContent={setSearchContent}
                filterModalComponent={<PeopleFilters />}
                showFilter
            />
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
            {people.length == 0 && <Text style={styles.noResultsError}>No People Found</Text>}
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
    noResultsError: {
        color: COLORS.placeholder,
        fontFamily: 'Trebuc',
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
    }
});




