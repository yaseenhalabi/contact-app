import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../utils/colors';
import { updatePersonsImages } from '../../redux/peopleSlice';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { v6 as uuidv6 } from 'uuid';
import DeleteFooter from '../global/DeleteFooter';
export default function PhotoPicker({ id }) {
    const dispatch = useDispatch();
    const images = useSelector(state => state.people.find(person => person.id === id).images) || []; 
    const updateImages = (newImages) => dispatch(updatePersonsImages({id, newImages}));
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if (!result.canceled) updateImages([...images, {uri: result.assets[0].uri, id: uuidv6()}]); 
    };

    // ~~~~~~ image deletion
    const [deletingImages, setDeletingImages] = useState(false);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const deleteImages =() => {
        updateImages(images.filter(image => !imagesToDelete.includes(image.id)));
        cancelDelete();
    }
    const imagePressed = (imageId) => {
        if (deletingImages) {
            if (imagesToDelete.includes(imageId)) {
                setImagesToDelete(imagesToDelete.filter(id => id !== imageId));
            } else {
                setImagesToDelete([...imagesToDelete, imageId]);
            }
        }
        else {
            setDeletingImages(true);
            setImagesToDelete([...imagesToDelete, imageId]);
        }
        if(imagesToDelete.length === 1 && imagesToDelete[0] === imageId) {
            setDeletingImages(false);
            setImagesToDelete([]);
        }
    }
    const cancelDelete = () => {
        setDeletingImages(false);
        setImagesToDelete([]);
    }

    return (
        <View style={{...styles.section, zIndex: -1}}>
            <TouchableOpacity disabled={deletingImages} style={styles.addPhotosButton} onPress={pickImage}>
                <Text style={styles.addPhotosText}>Add Photo(s)</Text>
            </TouchableOpacity>
            <View style={styles.images}>
                {images.map((image) => 
                    <TouchableWithoutFeedback 
                        key={image.id} 
                        onPress={() => imagePressed(image.id)}
                        >
                        <Image key={image.id} style={[styles.image, imagesToDelete.includes(image.id) ? styles.selected : {}]} source={{uri: image.uri}}/>
                    </TouchableWithoutFeedback>
                )}
            </View>
            {
            deletingImages && 
            <View style={{marginTop: 10}}>
                <DeleteFooter
                    deleteText={`Delete ${imagesToDelete.length} Photos`}
                    onPress={deleteImages}
                    onCancel={cancelDelete}
                />
            </View>
            }
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
    },
    selected: {
        borderColor: COLORS.delete_red,
        borderWidth: 4,
    }
})
