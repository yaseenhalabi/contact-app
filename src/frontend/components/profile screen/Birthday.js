import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { updatePersonsBirthday } from '../../redux/peopleSlice';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../utils/colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Birthday({ id }) {
    const dispatch = useDispatch();
    const birthdayState = useSelector(state => state.people.find(person => person.id == id).birthday)
    const updateBirthday = (newBirthday) => dispatch(updatePersonsBirthday({id, newBirthday}));
    birthdayDateObject = new Date(birthdayState);

    const calculateDaysUntilBirthday = (birthday) => {
        today = new Date();
        bday = new Date(birthday);
        bday.setFullYear(today.getFullYear());
        if( today.getTime() > bday.getTime()) bday.setFullYear(bday.getFullYear()+1);
        time_diff = bday.getTime()-today.getTime();
        days = Math.ceil(time_diff/(1000*60*60*24));
        return days;
    }
    const daysUntilBirthday = calculateDaysUntilBirthday(birthdayDateObject);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirm = (date) => { updateBirthday(date.toISOString()); hideDatePicker(); };

    return (
        <View style={styles.birthdayContainer}>
            <Text style={[styles.mediumText, styles.boldBirthday]}>Birthday: </Text>
            <View>
                <TouchableOpacity onPress={showDatePicker}><Text style={styles.mediumText}>{(birthdayDateObject).getMonth()+1}/{(birthdayDateObject).getDate()}</Text></TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={birthdayDateObject}
                />
            </View>
            <Text style={styles.birthdayTimingText}> {daysUntilBirthday == 365 ? "-Happy Birthday!-" : `(in ${daysUntilBirthday} day${daysUntilBirthday < 10 ? "" : "s"})`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    birthdayContainer: {
        flexDirection: 'row',
        marginTop: 15,
        zIndex: -1,
    },
    birthdayTimingText: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 14,
        opacity: .7,
    },
    boldBirthday: {
        fontWeight: 'bold',
    },
    mediumText: {
        color: COLORS.off_white,
        fontFamily: 'Trebuc',
        fontSize: 14,
    },
});