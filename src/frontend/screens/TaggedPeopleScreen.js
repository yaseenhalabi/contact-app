import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../utils/colors';
import Name from '../components/people screen/Name';
import SearchBar from '../components/global/SearchBar';

export default function TaggedPeopleScreen({ route, navigation }) {
    const { tagId, tagName } = route.params || {};

    const [searchContent, setSearchContent] = useState('');
    const taggedPeopleState = useSelector(state => state.people).filter(person => person.tags.includes(tagId));
    const people = searchContent.length === 0 ? taggedPeopleState : taggedPeopleState.filter(person => person.name.toLowerCase().includes(searchContent.toLowerCase()));

    const openProfile = (id) => {
        navigation.navigate('Profile', { id });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.tagTitle}>{tagName}</Text>
            </View>
            <SearchBar searchContent={searchContent} setSearchContent={setSearchContent} />
            <ScrollView>
                {people.map((data) => (
                    <TouchableOpacity key={data.id} onPress={() => openProfile(data.id)}>
                        <Name name={data.name} />
                    </TouchableOpacity>
                ))}
                {people.length === 0 && <Text style={styles.noResultsError}>No Results Found</Text>}
            </ScrollView>
        </SafeAreaView>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flex: 1,
    },
    tagTitle: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    noResultsError: {
        color: COLORS.placeholder,
        fontFamily: 'Trebuc',
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
    },
});
