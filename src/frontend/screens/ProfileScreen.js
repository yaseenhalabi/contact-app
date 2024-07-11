import { View, TouchableWithoutFeedback, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import Linking from 'react-native/Libraries/Linking/Linking';
import instagramLogo from '../assets/icons/instagramlogowhite.png';
import backArrowIcon from '../assets/icons/backarrowicon.png';
import xLogo from '../assets/icons/xlogowhite.png';
import { COLORS } from '../utils/colors';
import { Keyboard } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsNotes } from '../redux/peopleSlice';

import BirthdayPicker from '../components/profile screen/BirthdayPicker';
import ProfileTags from '../components/profile screen/ProfileTags';
import AddressInput from '../components/profile screen/AddressInput';
import TitleInput from '../components/profile screen/TitleInput';
import PhotoPicker from '../components/profile screen/PhotoPicker';

export default function ProfileScreen({ route, navigation }) {
    const ID = route.params.id;
    const dispatch = useDispatch();
    const personData = useSelector(state => state.people.find(person => person.id == ID)) || {name : '', notes: '', xLink: '', instagramLink: ''};
    const { notes, xLink, instagramLink } = personData;
    
    const updateNotes = (newNotes) => dispatch(updatePersonsNotes({ID, newNotes})); 

    return (
        <SafeAreaView style={styles.container} testID="ProfileScreen" >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 5}}>
                            <TitleInput id={ID}/>
                            <TouchableOpacity onPress={() => navigation.pop()} style={{opacity: .5, justifyContent: 'center', position: 'static'}}>
                                <Image source={backArrowIcon} style={{width: 25, height: 25}}/>
                            </TouchableOpacity>
                        </View>
                        <ProfileTags id={ID}/>
                        <BirthdayPicker id={ID}/>
                        <AddressInput id={ID}/>
                    </View>

                    <View style={styles.notesContainer}>
                            <Text style={styles.subTitle}>Notes</Text>
                            <TextInput 
                                style={[styles.mediumText, {maxHeight: 250}]}
                                placeholder='Add notes here...'
                                placeholderTextColor={COLORS.placeholder}
                                multiline={true}
                                value={notes}
                                onChangeText={updateNotes}
                            />
                    </View>
                    <PhotoPicker id={ID}/>
                    <View style={styles.socialsContainer}>
                        {
                        instagramLink &&
                        <TouchableOpacity onPress={() => Linking.openURL(instagramLink)}>
                            <Image source={instagramLogo} style={{width: 40, height: 40}}/>
                        </TouchableOpacity>
                        }
                        {
                        xLink &&
                        <TouchableOpacity onPress={() => Linking.openURL(xLink)}>
                            <Image source={xLogo} style={{width: 40, height: 40}}/>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )  
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    section: {
        paddingHorizontal: 20,
    },
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
    smallText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 10,
    },
    mediumText: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 14,
    },
    boldBirthday: {
        fontWeight: 'bold',
    },
    notesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.secondary, 
        height: 200,
        zIndex: -1,
    },
    subTitle: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    images: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    socialsContainer: {
        flexDirection: 'row',
        gap: 20,
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    addPhotosButton: {
        backgroundColor: COLORS.tertiary,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    addPhotosText: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 11,
    }
}); 