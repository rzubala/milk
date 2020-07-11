import React, {useState} from 'react'
import {Text, View, Platform, StyleSheet} from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker";

import * as feedingUtils from "../../utils/milk";
import i18n from "../../constants/strings";

const DateTimePickerField = (props) => {
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || props.date;
      setShow(Platform.OS === "ios");
      props.onDateChange(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode("date");
    };
  
    const showTimepicker = () => {
      showMode("time");
    };
  
    return (
        <View style={props.formControlStyle}>
        <Text style={props.inputLabelStyle}>{i18n.t("Time") + ":"}</Text>
        <View style={styles.datetime}>
          <View style={props.inputContainerStyle}>
            <Text style={props.inputStyle} onPress={showDatepicker}>
              {props.date.toISOString().slice(0, 10)}
            </Text>
          </View>
          <View style={props.inputContainerStyle}>
            <Text style={props.inputStyle} onPress={showTimepicker}>
              {feedingUtils.zeroPad(props.date.getHours(), 2) +
                ":" +
                feedingUtils.zeroPad(props.date.getMinutes(), 2)}
            </Text>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={props.date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    datetime: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
      },    
})

export default DateTimePickerField