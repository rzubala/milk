import React from "react";
import {
  View,
  Text,
  Image,
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
            <View style={{flex : 1, alignItems: 'center'}}>
              {props.max && <Image
                    source={require("../assets/crown.png")}
                    fadeDuration={0}
                    style={styles.crown}
                />}
                {props.maxSilver && <Image
                    source={require("../assets/crown_silver.png")}
                    fadeDuration={0}
                    style={styles.crown}
                />}
            </View>
            <View style={{flex: 2, alignItems: 'flex-start'}}>
              <Text style={styles.date}>{props.date}</Text>            
            </View>
            <View style={{flex: 2, justifyContent: 'flex-start', ...styles.imageContainer}}>
              <Image
                  source={require("../assets/icon.png")}
                  fadeDuration={0}
                  style={styles.bottle}
              />
              <Text style={styles.volume}>{props.volume}</Text>
            </View>
            {props.count && (
              <View style={{flex: 2, justifyContent: 'center', ...styles.imageContainer}}>
                <Image
                  source={require("../assets/diapers.png")}
                  fadeDuration={0}
                  style={styles.diapers}
                />
                <View style={styles.countContainer}>
                  <Text style={styles.count}>{props.count}</Text>
                </View>
              </View>
            )}
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  feeding: {
    margin: 1,
    height: 70,
  },
  touchable: {
    overflow: "hidden",
  },
  feedingRow: {
    flexDirection: "row",    
    alignItems: "center",
    height: "100%",
  },
  date: {
    fontSize: 15,
  },
  volume: {
    fontSize: 18,
    fontWeight: "bold",
  },
  count: {
    fontSize: 15,
    color: Colors.accent,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  diapers: {
    width: 35, 
    height: 40
  },
  bottle: {
    width: 35, 
    height: 40
  },
  crown: {
    width: 40, 
    height: 40
  },
  countContainer: {
    position: "absolute",
    top: -10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FeedingItem;
