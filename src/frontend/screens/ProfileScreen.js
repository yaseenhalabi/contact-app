import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Linking from 'react-native/Libraries/Linking/Linking';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonsName, updatePersonsNotes, updatePersonsAddress, updatePersonsBirthday } from '../peopleSlice';
import instagramLogo from '../assets/icons/instagramlogowhite.png';
import backArrowIcon from '../assets/icons/backarrowicon.png';
import xLogo from '../assets/icons/xlogowhite.png';
import { COLORS } from '../utils/colors';

export default function ProfileScreen({ route, navigation }) {
    
    const { id, birthday, name, tags, notes, address, instagramLink, xLink } = route.params;
    const dispatch = useDispatch();
    const nameState = useSelector(state => state.people.find(person => person.id == id).name)
    const noteState = useSelector(state => state.people.find(person => person.id == id).notes)
    const addressState = useSelector(state => state.people.find(person => person.id == id).address)
    const birthdayState = useSelector(state => state.people.find(person => person.id == id).birthday)
    // ^ must convert this to js date object every time it is used
    const updateBirthday = (newBirthday) => dispatch(updatePersonsBirthday({id, newBirthday}));
    const updateAddress = (newAddress) => dispatch(updatePersonsAddress({id, newAddress}));
    const updateName = (newName) => dispatch(updatePersonsName({id, newName}));
    const updateNotes = (newNotes) => dispatch(updatePersonsNotes({id, newNotes})); 

    const onSwipeRight = () => {
        navigation.pop();
    }
    const calculateDaysUntilBirthday = (birthday) => {
        today = new Date();
        bday = new Date(birthday);
        bday.setFullYear(today.getFullYear());
        if( today.getTime() > bday.getTime()) {
            bday.setFullYear(bday.getFullYear()+1);
        }
        diff = bday.getTime()-today.getTime();
        days = Math.ceil(diff/(1000*60*60*24));
        return days;
    }
    const daysUntilBirthday = calculateDaysUntilBirthday(new Date(birthdayState));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    console.log(birthdayState)
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirm = (date) => { updateBirthday(date.toISOString()); hideDatePicker(); };
      
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
                    <View style={styles.tagsContainer}>
                        {
                            tags.map(([tagName, color]) => 
                                <View key={tagName} style={[styles.tag, {backgroundColor: color}]}>
                                    <Text style={styles.smallText}>{tagName}</Text>
                                </View>
                            )
                        }
                        <TouchableOpacity style={{justifyContent: 'center', opacity: .8}}>
                            <Text style={styles.smallText}>+ Add Tag</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.birthdayContainer}>
                        <Text style={[styles.mediumText, styles.boldBirthday]}>Birthday: </Text>
                        <View>
                            <TouchableOpacity onPress={showDatePicker}><Text style={styles.mediumText}>{(new Date(birthdayState)).getMonth()+1}/{(new Date(birthdayState)).getDate()}</Text></TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                date={new Date(birthdayState)}
                            />
                        </View>
                        <Text style={styles.birthdayTimingText}> {daysUntilBirthday == 365 ? "-Happy Birthday!-" : `(in ${daysUntilBirthday} day${daysUntilBirthday < 10 ? "" : "s"})`}</Text>
                    </View>
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
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    tag: {
        backgroundColor: "#FF6B85",
        borderRadius: 360,
        paddingVertical: 4,
        paddingHorizontal: 13,
    },
    smallText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 10,
    },
    birthdayContainer: {
        flexDirection: 'row',
        marginTop: 15,
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