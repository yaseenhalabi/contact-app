import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import ryanMatia from '../assets/images/ryanmatia.jpg';
import billWalsh from '../assets/images/billwalsh.jpg';

import { COLORS } from '../utils/colors';

export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <SafeAreaView>
                    <Text style={styles.titleText}>John Smith</Text>
                </SafeAreaView>
                <View style={styles.tagsContainer}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Water Polo</Text>
                    </View>
                </View>
                <View style={styles.birthdayContainer}>
                    <Text style={[styles.birthdayText, styles.boldBirthday]}>Birthday: </Text>
                    <Text style={styles.birthdayText}>2/12/2006</Text>
                    <Text style={styles.birthdayTimingText}> (in 334 days)</Text>
                </View>
            </View>
            <View style={[styles.section, {backgroundColor: COLORS.secondary, height: 200}]}>
                <ScrollView>
                    <Text style={styles.subTitle}>Notes</Text>
                    <Text style={styles.birthdayText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, ultricies nunc. Nulla facilisi. Nullam nec nunc nec nunc.</Text>
                    <Text style={styles.birthdayText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, ultricies nunc. Nulla facilisi. Nullam nec nunc nec nunc.</Text>
                    <Text style={styles.birthdayText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, ultricies nunc. Nulla facilisi. Nullam nec nunc nec nunc.</Text>
                </ScrollView>
            </View>
            <View style={styles.section}>
                <Text style={[styles.subTitle, {marginTop: 20}]}>Photos</Text>
                <View style={styles.images}>
                    <Image style={styles.image} source={ryanMatia}/>
                    <Image style={styles.image} source={billWalsh}/>

                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Text>Go Back A Page</Text>
            </TouchableOpacity>
            <View style={styles.socialsContainer}></View>
        </View>
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
        marginVertical: 10,
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
    subTitle: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 10,
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
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
}); 