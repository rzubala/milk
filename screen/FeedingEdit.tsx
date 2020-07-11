import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import DateTimePickerField from "../components/UI/DateTimePickerField";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton";

import * as feedingActions from "../store/actions/milk";
import Feeding from "../domain/feeding";
import i18n from "../constants/strings";
import { Colors } from "../constants/colors";

const FeedingEdit = (props) => {
  const id: string = props.route.params ? props.route.params.item : null;
  const feeding = useSelector((state) =>
    id ? state.milk.feeding.find((item) => item.id === id) : null
  );
  const [volume, setVolume] = useState(0);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const onDelete = useCallback(() => {
    try {
      dispatch(feedingActions.deleteFeeding(id));
      props.navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }, [id, dispatch]);

  const submitHandler = useCallback(() => {
    try {
      if (id) {
        dispatch(feedingActions.updateFeeding(new Feeding(id, date, volume)));
      } else {
        dispatch(feedingActions.addFeeding(new Feeding("", date, volume)));
      }
      props.navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }, [id, date, volume, dispatch]);

  useEffect(() => {
    if (feeding) {
      setDate(feeding.date);
      setVolume(feeding.volume);
    }
  }, [feeding]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: id ? i18n.t("EditFeeding") : i18n.t("AddFeeding"),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          {id && (
            <Item
              title="Delete"
              iconName={Platform.OS === "android" ? "md-remove" : "ios-remove"}
              onPress={onDelete}
              color={Colors.accent}
            />
          )}
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
            color={Colors.accent}
          />
        </HeaderButtons>
      ),
    });
  }, [id, submitHandler, onDelete]);

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <ScrollView>
        <DateTimePickerField
          date={date}
          onDateChange={setDate}
          formControlStyle={styles.formControl}
          inputLabelStyle={styles.inputLabel}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <View style={styles.formControl}>
          <Text style={styles.inputLabel}>{i18n.t("MilkVolume") + ":"}</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={volume.toString()}
            onChangeText={(text) => {
              try {
                const num = parseInt(text);
                if (!isNaN(num)) {
                  setVolume(num);
                } else {
                  setVolume(0);
                }
              } catch (err) {
                setVolume(0);
              }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  formControl: {
    width: "100%",
    marginTop: 25,
    paddingHorizontal: 15,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.accent,
  },
  label: {
    fontSize: 18,
  },
  inputContainer: {
    width: "50%",
  },
  input: {
    marginVertical: 15,
    fontSize: 18,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default FeedingEdit;
