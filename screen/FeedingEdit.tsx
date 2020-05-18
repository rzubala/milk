import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Platform, Button } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import FeedingItem from "../components/FeedingItem";
import Feeding from '../domain/feeding'
import i18n from "../constants/strings";

const FeedingEdit = (props) => {
  const id: string = props.route.params ? props.route.params.item : null;
  const feeding = useSelector(state => id ? state.milk.rawFeeding.filter(item => item.id === id) : null);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.datetime}>
        <Text style={styles.label} onPress={showDatepicker}>{date.toISOString().slice(0, 10)}</Text>
        <Text style={styles.label} onPress={showTimepicker}>{date.getHours() + ":" + date.getMinutes()}</Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  datetime: {
    width: '50%',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  label: {
    fontSize: 18
  }
});

export const screenOptions = navData => {
    const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.item ? i18n.t('EditFeeding') : i18n.t('AddFeeding'),
  };
};

export default FeedingEdit;
