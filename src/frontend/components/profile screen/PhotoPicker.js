import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../utils/colors';
import { updatePersonsImages } from '../../redux/peopleSlice';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function PhotoPicker({ id }) {
    const dispatch = useDispatch();
    const images = useSelector(state => state.people.find(person => person.id === id).images); 
    const updateImages = (newImages) => dispatch(updatePersonsImages({id, newImages}));
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) updateImages([...images, result.assets[0].uri]);
    };

    return (
        <View style={{...styles.section, zIndex: -1}}>
            <TouchableOpacity style={styles.addPhotosButton} onPress={pickImage}>
                <Text style={styles.addPhotosText}>Add Photo(s)</Text>
            </TouchableOpacity>
            <View style={styles.images}>
                {images.map((image, index) => <Image key={index} style={styles.image} source={{uri: image}}/>)}
            </View>
        </View>
    )
}

styles = StyleSheet.create({
    section: {
        paddingHorizontal: 20,
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
})
