import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Linking from 'react-native/Libraries/Linking/Linking';
import * as ImagePicker from 'expo-image-picker';
import instagramLogo from '../assets/icons/instagramlogowhite.png';
import backArrowIcon from '../assets/icons/backarrowicon.png';
import xLogo from '../assets/icons/xlogowhite.png';
import { COLORS } from '../utils/colors';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsName, updatePersonsNotes, updatePersonsAddress } from '../redux/peopleSlice';
import BirthdayPicker from '../components/profile screen/BirthdayPicker';
import ProfileTags from '../components/profile screen/ProfileTags';
import AddressInput from '../components/profile screen/AddressInput';

export default function ProfileScreen({ route, navigation }) {
    const ID = route.params.id;
    const dispatch = useDispatch();
    const personData = useSelector(state => state.people.find(person => person.id == ID)) || {name : '', notes: '', xLink: '', instagramLink: ''};
    const { name, notes, xLink, instagramLink } = personData;
    
    const updateName = (newName) => dispatch(updatePersonsName({ID, newName}));
    const updateNotes = (newNotes) => dispatch(updatePersonsNotes({ID, newNotes})); 
    const [images, setImages] = useState([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) setImages([...images, result.assets[0].uri]);
    };

    const gestureRecognizerConfig = {
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 30,
    }

    return (
        <GestureRecognizer
            onSwipeRight={() => navigation.pop()}
            style={styles.container}
            config={gestureRecognizerConfig}    
            testID="ProfileScreen"
        >
            <View style={styles.container}>
                <View style={styles.section}>
                    <SafeAreaView>
                        <TextInput style={styles.titleText} value={name} onChangeText={updateName}/>
                    </SafeAreaView>
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

                <View style={styles.section}>
                    <TouchableOpacity style={styles.addPhotosButton} onPress={pickImage}>
                        <Text style={styles.addPhotosText}>Add Photo(s)</Text>
                    </TouchableOpacity>
                    <View style={styles.images}>
                        {images.map((image, index) => <Image key={index} style={styles.image} source={{uri: image}}/>)}
                    </View>
                </View>
                
                <TouchableOpacity onPress={() => navigation.pop()} style={styles.backArrowIconContainer}>
                    <Image source={backArrowIcon} style={{width: 25, height: 25}}/>
                </TouchableOpacity>

                <View style={styles.socialsContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL(instagramLink)}>
                        <Image source={instagramLogo} style={{width: 40, height: 40}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(xLink)}>
                        <Image source={xLogo} style={{width: 40, height: 40}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </GestureRecognizer>
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
        fontSize: 30,
        color: COLORS.off_white,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.444)',
        textShadowOffset: { width: 2, height: 4 },
        textShadowRadius: 5,
        marginTop: 20,
        marginBottom: 5,
    }, 
    smallText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 10,
    },
    addressContainer: {
        flexDirection: 'row',
        marginVertical: 15,
        zIndex: -1,
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
        maxHeight: 'auto',
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
    backArrowIconContainer: {
        position: 'absolute',
        top: 85,
        right: 20,
        opacity: .5,
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