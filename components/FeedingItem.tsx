import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";

import { Colors } from "../constants/colors";
import Card from "./UI/Card";

const FeedingItem = (props) => {
  const TouchableComponent: any =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <Card style={{ ...styles.feeding, ...props.style }}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View style={styles.feedingRow}>
            <Text>{props.date}</Text>
            <Text>{props.volume}</Text>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  feeding: {
    margin: 5,
    height: 70,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden"
  },
  feedingRow: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: "center",
    height: '100%'
  }
});

export default FeedingItem;
