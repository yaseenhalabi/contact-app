import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { v6 as uuidv6 } from 'uuid';
import { addPerson, removePeople } from '../redux/peopleSlice';
import { updatePeoplePreferences } from '../redux/preferencesSlice';
import { COLORS } from '../utils/colors';
import Name from '../components/people screen/Name';
import SearchBar from '../components/global/SearchBar';
import PeopleFilters from '../components/people screen/PeopleFilters';
import DeleteFooter from '../components/global/DeleteFooter';

export default function PeopleScreen({ route, navigation }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState('');
    const preferences = useSelector(state => state.preferences.people) || {};
    const peopleState = useSelector(state => state.people);
    let people = peopleState.filter(person => person.name.toLowerCase().includes(searchContent.toLowerCase())) || [];

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            if (route.params?.addingPerson && !isDeleting) {
                dispatch(updatePeoplePreferences({ sortMethod: 'none', tagFilters: [] }));
                setAddingPerson(true);
                navigation.setParams({ addingPerson: false });
            }
        });

        return unsubscribe;
    }, [navigation]);

    const calculateDaysUntilBirthday = (birthday) => {
        const today = new Date();
        const bday = new Date(birthday);
        bday.setFullYear(today.getFullYear());
        if (today.getTime() > bday.getTime()) bday.setFullYear(bday.getFullYear() + 1);
        const time_diff = bday.getTime() - today.getTime();
        const days = Math.ceil(time_diff / (1000 * 60 * 60 * 24));
        return days;
    };

    if (preferences.sortMethod === 'alphabetical') {
        people = people.sort((a, b) => a.name.localeCompare(b.name));
    } else if (preferences.sortMethod === 'alphabetical-reverse') {
        people = people.sort((a, b) => b.name.localeCompare(a.name));
    } else if (preferences.sortMethod === 'birthday-soonest') {
        people = people.sort((a, b) => {
            if (a.birthday && b.birthday) {
                return calculateDaysUntilBirthday(a.birthday) - calculateDaysUntilBirthday(b.birthday);
            } else if (a.birthday) {
                return -1;
            } else if (b.birthday) {
                return 1;
            }
            return 0;
        });
    }

    if (preferences.tagFilters) {
        for (let tag of preferences.tagFilters) {
            people = people.filter(person => person.tags.includes(tag.id));
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
        };
        dispatch(addPerson(newBlankPerson));
        setAddingPerson(false);
        setNewName('');
        navigation.push('Profile', { id: newID });
    };

    const openProfile = (id) => {
        setAddingPerson(false);
        setNewName('');
        navigation.push('Profile', { id });
    };

    const [selectedPeople, setSelectedPeople] = useState([]);

    const selectPerson = (id) => {
        if (selectedPeople.includes(id)) {
            setSelectedPeople(selectedPeople.filter(person => person !== id));
            if (selectedPeople.length === 1) {
                setIsDeleting(false);
            }
        } else {
            setSelectedPeople([...selectedPeople, id]);
        }
    };

    const deleteSelectedPeople = () => {
        dispatch(removePeople(selectedPeople));
        setIsDeleting(false);
        setSelectedPeople([]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                searchContent={searchContent}
                setSearchContent={setSearchContent}
                filterModalComponent={<PeopleFilters />}
                showFilter
            />
            <ScrollView>
                {addingPerson && <Name name={newName} isInput handleNameChange={setNewName} onSubmit={handleAddPerson} />}
                {people.map((data) => (
                    <TouchableOpacity
                        key={data.id}
                        onPress={() => (isDeleting ? selectPerson(data.id) : openProfile(data.id))}
                        onLongPress={() => {
                            setIsDeleting(true);
                            selectPerson(data.id);
                        }}
                    >
                        <Name name={data.name} isSelected={selectedPeople.includes(data.id)} />
                    </TouchableOpacity>
                ))}
                {people.length === 0 && !addingPerson && <Text style={styles.noResultsError}>No People Found</Text>}
            </ScrollView>
            {isDeleting && (
                <DeleteFooter
                    onPress={deleteSelectedPeople}
                    deleteText={`Delete ${selectedPeople.length} Contacts`}
                    onCancel={() => {
                        setIsDeleting(false);
                        setSelectedPeople([]);
                    }}
                />
            )}
        </SafeAreaView>
    );
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
        borderBottomWidth: 0.2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        columnGap: 10,
    },
    searchInput: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 20,
        opacity: 0.7,
        width: width - 93,
    },
    searchImage: {
        width: 20,
        height: 20,
        alignContent: 'center',
        alignItems: 'center',
        opacity: 0.7,
    },
    noResultsError: {
        color: COLORS.placeholder,
        fontFamily: 'Trebuc',
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
    },
});
