import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {   
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView, } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DateTimePickerField from '../../components/UI/DateTimePickerField'

import HeaderButton from "../../components/UI/HeaderButton";
import { Colors } from "../../constants/colors";
import i18n from "../../constants/strings";

import * as weightActions from "../../store/actions/weight";
import Weight from "../../domain/weight";
import NumberPickerScroll from "../../components/UI/NumberPickerScroll";

const WeightEdit = (props) => {
  const id: string = props.route.params ? props.route.params.id : null;
  const lastWeight = props.route.params ? props.route.params.lastWeight : null;
  const weightObject: Weight = useSelector((state) =>
  id ? state.weight.weights.find((item) => item.id === id) : null
);

  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date());  
  const dispatch = useDispatch();

  const onDelete = useCallback(() => {
    try {
      dispatch(weightActions.deleteWeight(id));
      props.navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }, [id, dispatch]);

  const submitHandler = useCallback(() => {
    try {
      if (id) {
        dispatch(weightActions.updateWeight(new Weight(id, date.getTime(), parseFloat(weight))));
      } else {
        dispatch(weightActions.addWeight(date.getTime(), parseFloat(weight)));
      }
      props.navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }, [id, date, weight, dispatch]);

  useEffect(() => {
    if (weightObject) {      
      setDate(new Date(weightObject.timestamp));
      setWeight(weightObject.weight.toFixed(2));
    } else if (lastWeight) {      
      setWeight(lastWeight.toFixed(2));
    }
  }, [weightObject, lastWeight]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: id ? i18n.t("EditWeight") : i18n.t("AddWeight"),
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
  }, [id, onDelete, submitHandler]);

  const getWeightValue = (index: number): number => {
    try {
      return parseInt(weight[index])
    } catch (err) {
      return 5
    }
  }

  const setWeightValue = (value: number, index: number): void => {
    try {
      setWeight(weight.slice(0, index) + value + weight.slice(index+1))   
    } catch (err) {}
  }

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
          <Text style={styles.inputLabel}>{i18n.t("WeightKg") + ":"}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight}
            onChangeText={(text) => {
              try {
                const num = parseFloat(text)
                if (!isNaN(num)) {
                  setWeight(text)
                } else {
                  setWeight("")
                }
              } catch(err) {
                setWeight("");
              }
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <NumberPickerScroll value={getWeightValue(0)} onValueSelected={(value) => setWeightValue(value, 0)} min={0} max={9} step={1} />
            <View style={{alignItems: "center", justifyContent: 'center'}}>
              <Text style={{fontSize: 30}}>.</Text>
            </View>
            <NumberPickerScroll value={getWeightValue(2)} onValueSelected={(value) => setWeightValue(value, 2)} min={0} max={9} step={1} />
            <NumberPickerScroll value={getWeightValue(3)} onValueSelected={(value) => setWeightValue(value, 3)} min={0} max={9} step={1} />
          </View>  
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

export default WeightEdit;
