import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import Card from "./UI/Card";

interface WeightItemProps {
  cardStyle?: object;
  date: string;
  weight: number;
  onSelect: () => void;
}

const WeightItem = ({ cardStyle, date, weight, onSelect }: WeightItemProps) => {
  const TouchableComponent: any =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;
  return (
    <Card style={{ ...styles.weightItem, ...cardStyle }}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onSelect} useForeground>
            <View style={styles.weightRow}>
                <View style={{ flex: 2, alignItems: "center" }}>
                    <Text style={styles.date}>{date}</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={{...styles.weight, textAlign: 'center'}}>{weight.toFixed(2) + " kg"}</Text>
                </View>
            </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  weightRow: {
    flexDirection: "row",    
    alignItems: "center",
    height: "100%",
  },
  weightItem: {
    margin: 1,
    height: 70,
  },
  touchable: {
    overflow: "hidden",
  },
  date: {
    fontSize: 15,
  },
  weight: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WeightItem;
