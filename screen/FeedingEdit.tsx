import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Platform, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import FeedingItem from "../components/FeedingItem";
import Feeding from "../domain/feeding";
import i18n from "../constants/strings";

const FeedingEdit = (props) => {
  const id: string = props.route.params ? props.route.params.item : null;
  const feeding = useSelector((state) =>
    id ? state.milk.rawFeeding.filter((item) => item.id === id) : null
  );

  const [volume, setVolume] = useState(0)
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
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
    <View style={styles.screen}>
      <View style={styles.formControl}>
        <Text style={styles.inputLabel}>{i18n.t("Time") + ":"}</Text>
        <View style={styles.datetime}>
          <Text style={styles.label} onPress={showDatepicker}>
            {date.toISOString().slice(0, 10)}
          </Text>
          <Text style={styles.label} onPress={showTimepicker}>
            {date.getHours() + ":" + date.getMinutes()}
          </Text>
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

      <View style={styles.formControl}>
        <Text style={styles.inputLabel}>{i18n.t("MilkVolume") + ":"}</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={volume.toString()}
          onChangeText={(text) => {
            setVolume(parseInt(text))
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,    
    alignItems: "center",
  },
  formControl: {
    width: "100%",
    marginTop: 25,
    paddingHorizontal: 15
  },
  datetime: {
    width: "50%",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold"
  },
  label: {
    fontSize: 18,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export const screenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.item
      ? i18n.t("EditFeeding")
      : i18n.t("AddFeeding"),
  };
};

export default FeedingEdit;
