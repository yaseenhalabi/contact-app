import { View, ScrollView, TouchableWithoutFeedback, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, Keyboard } from 'react-native';
import BirthdayPicker from '../components/profile screen/BirthdayPicker';
import ProfileTags from '../components/profile screen/ProfileTags';
import AddressInput from '../components/profile screen/AddressInput';
import TitleInput from '../components/profile screen/TitleInput';
import PhotoPicker from '../components/profile screen/PhotoPicker';
import NotesInput from '../components/profile screen/NotesInput';
import { COLORS } from '../utils/colors';
import backArrowIcon from '../assets/icons/backarrowicon.png';

export default function ProfileScreen({ route, navigation }) {
    const ID = route.params.id;
    return (
        <SafeAreaView style={styles.container} testID="ProfileScreen">
            <ScrollView keyboardShouldPersistTaps='handled' >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.section}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 5 }}>
                                <TitleInput id={ID} />
                                <TouchableOpacity onPress={() => navigation.pop()} style={{ opacity: 0.5, justifyContent: 'center', position: 'static' }}>
                                    <Image source={backArrowIcon} style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                            </View>
                            <ProfileTags id={ID} />
                            <BirthdayPicker id={ID} />
                            <AddressInput id={ID} />
                        </View>
                        <NotesInput id={ID} />
                        <PhotoPicker id={ID}/>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
