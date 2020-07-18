import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

interface NumberPickerProps {
    pickerStyle: object;
}
const NumberPicker = ({pickerStyle} :NumberPickerProps) => {
    return (
        <View style={{...styles.container, ...pickerStyle}}>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default NumberPicker;