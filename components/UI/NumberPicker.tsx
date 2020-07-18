import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/colors";

const VEL_MID = 0.9
const VEL_HIGH = 1.7

interface NumberPickerProps {
  pickerStyle?: object;
  min: number;
  max: number;
  step: number;
  stepMedium?: number;
  stepFast?: number;
  value: number;
  onValueSelected: (value: number) => void
}
const NumberPicker = ({
  pickerStyle,
  min,
  max,
  value,
  onValueSelected,
  step,
  stepMedium = 2,
  stepFast = 3
}: NumberPickerProps) => {
  const [number, setNumber] = useState(value);
  const touchY = useRef()
  const touchTime = useRef()

  const TouchableComponent: any =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const inc = (value: number, step: number): number => {
    let result = value + step;
    if (result > max) {
      return min + (result - max) - 1;
    }
    return result;
  };

  const dec = (value: number, step: number): number => {
    let result = value - step;
    if (result < min) {
      return max - (min - result) + 1;
    }
    return result;
  };

  const incrementNumber = (operation: (value: number, step: number) => number, step: number) => {
    const newNumber = operation(number, step)
    setNumber(newNumber);
    onValueSelected(newNumber);
  };

  const onPress = (event) => {
    touchY.current = event.nativeEvent.pageY
    touchTime.current = event.nativeEvent.timestamp
  };

  const getStep = (step: number, velocity: number) => {
      if (velocity <= VEL_MID) {
          return step
      } else if (velocity > VEL_MID && velocity <= VEL_HIGH) {
          return stepMedium
      } else {
          return stepFast
      }
  }

  const onRelease = (event) => {
    if (touchY.current && touchTime.current) {
        const diffY = event.nativeEvent.pageY - touchY.current!!
        const diffT = event.nativeEvent.timestamp - touchTime.current!!
        const vel = Math.abs(diffY)/diffT
        const incStep = getStep(step, vel)
        let operation: (value: number, step: number) => number
        if (diffY < 0) {
            operation = inc
        } else {
            operation = dec
        }
        incrementNumber(operation, incStep)
    }
  };

  useEffect(() => {
    setNumber(value)
  }, [value])

  return (
    <TouchableComponent
      style={{ ...styles.container, ...pickerStyle }}
      onPressIn={onPress}
      onPressOut={onRelease}
    >
      <View style={styles.numberColumn}>
        <View style={styles.newNumber}>
          <Text style={styles.newNumber2Text}>{dec(number, step * 2)}</Text>
        </View>          
        <View style={styles.newNumber}>
          <Text style={styles.newNumberText}>{dec(number, step)}</Text>
        </View>
        <View style={styles.currentNumber}>
          <Text style={styles.currentNumberText}>{number}</Text>
        </View>
        <View style={styles.newNumber}>
          <Text style={styles.newNumberText}>{inc(number, step)}</Text>
        </View>
        <View style={styles.newNumber}>
          <Text style={styles.newNumber2Text}>{inc(number, step * 2)}</Text>
        </View>   
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  numberColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
  },
  newNumber: {},
  newNumberText: {
    fontSize: 15,
    padding: 3,
    color: Colors.inactiveDark,
  },
  newNumber2Text: {
    fontSize: 13,
    padding: 10,
    color: Colors.inactive,
  },
  currentNumber: {},
  currentNumberText: {
    fontSize: 19,
    fontWeight: "bold",
    padding: 10,
    marginVertical: 10,
    color: Colors.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.accent,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
  },
});

export default NumberPicker;
