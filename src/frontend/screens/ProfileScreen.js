import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import Linking from 'react-native/Libraries/Linking/Linking';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsName, updatePersonsNotes, updatePersonsAddress } from '../redux/peopleSlice';
import instagramLogo from '../assets/icons/instagramlogowhite.png';
import backArrowIcon from '../assets/icons/backarrowicon.png';
import xLogo from '../assets/icons/xlogowhite.png';
import { COLORS } from '../utils/colors';
import Birthday from '../components/profile screen/Birthday';
import Tags from '../components/profile screen/Tags';
import Autocomplete from 'react-native-autocomplete-input';
export default function ProfileScreen({ route, navigation }) {
    
    const id = route.params.id;
    const dispatch = useDispatch();
    const nameState = useSelector(state => state.people.find(person => person.id == id).name)
    const noteState = useSelector(state => state.people.find(person => person.id == id).notes)
    const addressState = useSelector(state => state.people.find(person => person.id == id).address)
    const instagramLinkState = useSelector(state => state.people.find(person => person.id == id).instagramLink)
    const xLinkState = useSelector(state => state.people.find(person => person.id == id).xLink)
    const updateAddress = (newAddress) => dispatch(updatePersonsAddress({id, newAddress}));
    const updateName = (newName) => dispatch(updatePersonsName({id, newName}));
    const updateNotes = (newNotes) => dispatch(updatePersonsNotes({id, newNotes})); 

    const onSwipeRight = () => {
        navigation.pop();
    }
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

    return (
        <GestureRecognizer
            onSwipeRight={() => onSwipeRight()}
            style={styles.container}
            config={
                {
                    velocityThreshold: 0.1,
                    directionalOffsetThreshold: 30,
                }
            }
        >
            <View style={styles.container}>
                <View style={styles.section}>
                    <SafeAreaView>
                        <TextInput style={styles.titleText} value={nameState} onChangeText={updateName}/>
                    </SafeAreaView>

                    <Tags id={id}/>
                    <Birthday id={id}/>

                    <View style={styles.addressContainer}>
                        <Text style={[styles.mediumText, styles.boldBirthday]}>Address: </Text>
                        <TextInput style={styles.mediumText} value={addressState} onChangeText={updateAddress}/>
                    </View>
                </View>

                <View style={styles.notesContainer}>
                        <Text style={styles.subTitle}>Notes</Text>
                        <TextInput 
                            style={[styles.mediumText, {maxHeight: 250}]}
                            multiline={true}
                            value={noteState}
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
                    <TouchableOpacity onPress={() => Linking.openURL(instagramLinkState)}>
                        <Image source={instagramLogo} style={{width: 40, height: 40}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(xLinkState)}>
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
    },
    birthdayPicker: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 14,
    },
    mediumText: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 14,
    },
    boldBirthday: {
        fontWeight: 'bold',
    },
    birthdayTimingText: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 14,
        opacity: .7,
    },
    notesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.secondary, 
        maxHeight: 'auto',
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
        top: 26,
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