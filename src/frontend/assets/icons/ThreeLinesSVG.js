import { Svg, Path } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
export default function ThreeLines() { 
    return (
        <View style={styles.container}>
            <Svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M0 0V1.72166H25V0H0ZM0 5.11334V6.83501H25V5.11334H0ZM0 10.2783V12H25V10.2783H0Z" fill="#F1F0E8"/>
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
