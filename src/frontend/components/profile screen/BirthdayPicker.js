import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { updatePersonsBirthday } from '../../redux/peopleSlice';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../utils/colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function BirthdayPicker({ id }) {
    const dispatch = useDispatch();
    const updateBirthday = (newBirthday) => dispatch(updatePersonsBirthday({ id, newBirthday }));
    const deleteBirthday = () => dispatch(updatePersonsBirthday({ id, newBirthday: null }));

    const birthdayState = useSelector(state => state.people.find(person => person.id === id)?.birthday);

    const birthdayDateObject = new Date(birthdayState || null);

    const calculateDaysUntilBirthday = (birthday) => {
        let today = new Date();
        let bday = new Date(birthday);
        bday.setFullYear(today.getFullYear());
        if (today.getTime() > bday.getTime()) bday.setFullYear(bday.getFullYear() + 1);
        let time_diff = bday.getTime() - today.getTime();
        let days = Math.ceil(time_diff / (1000 * 60 * 60 * 24));
        return days;
    }

    const daysUntilBirthday = calculateDaysUntilBirthday(birthdayDateObject);
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const handleConfirmDate = (date) => {
        const stringDate = date.toISOString();
        updateBirthday(stringDate);
        setDatePickerVisible(false);
    };

    return (
        <View style={styles.birthdayContainer}>
            <Text style={{ ...styles.mediumText, fontWeight: '600' }}>Birthday: </Text>
            <View>
                {birthdayState ?
                    <TouchableOpacity style={styles.pickButton} onPress={() => setDatePickerVisible(true)}>
                        <Text style={styles.mediumText}>
                            {birthdayDateObject.getMonth() + 1}/{birthdayDateObject.getDate()}
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.pickButton} onPress={() => setDatePickerVisible(true)}>
                        <Text style={{ ...styles.mediumText, color: COLORS.placeholder }}>
                            Add Birthday
                        </Text>
                    </TouchableOpacity>
                }
                <DateTimePickerModal
                    isVisible={datePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={() => setDatePickerVisible(false)}
                    date={birthdayDateObject}
                />
            </View>
            {
                birthdayState &&
                <View style={{ flexDirection: 'row', columnGap: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.birthdayTimingText}>
                        {daysUntilBirthday === 365 ? "-Happy Birthday!-" : `(in ${daysUntilBirthday} day${daysUntilBirthday < 10 ? "" : "s"})`}
                    </Text>
                    <TouchableOpacity onPress={deleteBirthday} style={styles.xButton}>
                        <Text style={{ ...styles.mediumText, color: COLORS.placeholder }}>remove</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    birthdayContainer: {
        flexDirection: 'row',
        marginTop: 15,
        zIndex: -1,
        alignItems: 'center'
    },
    birthdayTimingText: {
        color: COLORS.off_white,
        fontFamily: 'trebuc',
        fontSize: 14,
        opacity: .7,
    },
    mediumText: {
        color: COLORS.off_white,
        fontFamily: 'trebuc',
        fontSize: 14,
    },
    pickButton: {
        backgroundColor: COLORS.secondary,
        padding: 5,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    xButton: {
        justifyContent: 'center',
        borderRadius: 360,
        alignItems: 'center',
    }
});
