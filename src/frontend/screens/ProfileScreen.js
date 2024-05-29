import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import ryanMatia from '../assets/images/ryanmatia.jpg';
import billWalsh from '../assets/images/billwalsh.jpg';
import instagramLogo from '../assets/icons/instagramlogowhite.png';
import xLogo from '../assets/icons/xlogowhite.png';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { COLORS } from '../utils/colors';
import backArrowIcon from '../assets/icons/backarrowicon.png';
import Linking from 'react-native/Libraries/Linking/Linking';
export default function ProfileScreen({ route, navigation }) {
    const onSwipeRight = () => {
        navigation.pop();
    }
    const { id, birthday, firstName, lastName, tags, notes, instagramLink, xLink } = route.params;
    const calculateDaysUntilBirthday = (birthday) => {
        const birthdayDate = new Date(birthday.split('/')[2], parseInt(birthday.split('/')[0])-1, birthday.split('/')[1]);
        const today = new Date();
        const nextBirthday = new Date(today.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        const timeDifference = nextBirthday.getTime() - today.getTime();
        const daysUntilBirthday = Math.ceil(timeDifference / (1000 * 3600 * 24));
        if (daysUntilBirthday == 365) {
            return 0;
        }  
        return daysUntilBirthday;
    }
    const daysUntilBirthday = calculateDaysUntilBirthday(birthday);
    // we have current date and birthday
    // we need to calculate days until tomorrow
    // calculate next bday
    
    // calculate days until next bday

    return (
        <GestureRecognizer
            onSwipeRight={() => onSwipeRight()}
            style={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.section}>
                    <SafeAreaView>
                        <Text style={styles.titleText}>{firstName} {lastName}</Text>
                    </SafeAreaView>
                    <View style={styles.tagsContainer}>
                        {
                            tags.map((tag) => {
                                return (
                                    <View key={tag} style={[styles.tag, {backgroundColor: tag[1]}]}>
                                        <Text style={styles.tagText}>{tag[0]}</Text>
                                    </View>
                                )
                            })
                        }
                        
                        <TouchableOpacity style={{justifyContent: 'center', opacity: .8}}>
                            <Text style={styles.tagText}>+ Add Tag</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.birthdayContainer}>
                        <Text style={[styles.birthdayText, styles.boldBirthday]}>Birthday: </Text>
                        <Text style={styles.birthdayText}>{birthday}</Text>
                        <Text style={styles.birthdayTimingText}> {daysUntilBirthday == 0 ? "-Happy Birthday!-" : `(in ${daysUntilBirthday} day${daysUntilBirthday < 10 ? "" : "s"})`}</Text>
                    </View>
                </View>
                <View style={styles.notesContainer}>
                    <ScrollView>
                        <Text style={styles.subTitle}>Notes</Text>
                        <Text style={styles.birthdayText}>{notes}</Text>
                    </ScrollView>
                </View>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.addPhotosButton}>
                        <Text style={styles.addPhotosText}>Add Photo(s)</Text>
                    </TouchableOpacity>
                    <View style={styles.images}>
                        <Image style={styles.image} source={ryanMatia}/>
                        <Image style={styles.image} source={billWalsh}/>

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
    tagText: {
        color: COLORS.white,
        fontFamily: 'Trebuc',
        fontWeight: 'bold',
        fontSize: 10,
    },
    birthdayContainer: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    birthdayText: {
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
        maxHeight: 250
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