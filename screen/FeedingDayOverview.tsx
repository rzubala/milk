import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../constants/strings";

import FeedingItem from "../components/FeedingItem";
import Feeding from "../domain/feeding";
import Poo from "../domain/poo";
import * as feedingUtils from "../utils/milk";
import * as pooActions from "../store/actions/poo";

const FeedingDayOverview = (props) => {
  const TouchableComponent: any =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const timestamp = props.route.params.timestamp;
  const dailyFeeding = useSelector((state) =>
    feedingUtils.fetchFeedingDay(state.milk.feeding, timestamp)
  );
  const poo: Poo = useSelector((state) =>
    feedingUtils.getPoo(state.poo.poo, timestamp)
  );
  const [pooCnt, setPooCnt] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onAddPoo = async () => {
    try {
      setLoading(true);
      if (poo) {
        await dispatch(pooActions.updatePoo(poo, true));
        setPooCnt(poo.count + 1);
      } else {
        await dispatch(pooActions.addPoo(timestamp));
        setPooCnt(1);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const onRemovePoo = async () => {
    try {
      setLoading(true);
      if (poo) {
        await dispatch(pooActions.updatePoo(poo, false));
        if (poo.count > 0) {
          setPooCnt(poo.count - 1);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle:
        i18n.t("DailyFeeding") +
        " " +
        new Date(timestamp).toISOString().slice(5, 10),
    });
  }, [timestamp]);

  useEffect(() => {
    if (poo) {
      setPooCnt(poo.count);
    }
  }, [poo]);

  const onItemSelected = (item: Feeding) => {
    props.navigation.navigate("FeedingEdit", {
      item: item.id,
    });
  };

  if (!dailyFeeding) {
    return (
      <View style={{ ...styles.screen, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.pooContainer}>
        <TouchableComponent onPress={onRemovePoo} style={styles.touchButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-remove" : "ios-remove"}
            size={32}
            color={Colors.accent}
          />
        </TouchableComponent>
        {loading && (
          <View style={{ justifyContent: "center", width: 40, height: 40 }}>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        )}
        {!loading && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/diapers.png")}
              fadeDuration={0}
              style={{ width: 40, height: 40 }}
            />
            <View style={styles.pooLabelView}>
              <Text style={styles.poo}>{pooCnt?.toString() ?? "0"}</Text>
            </View>
          </View>
        )}
        <TouchableComponent onPress={onAddPoo} style={styles.touchButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-add" : "ios-add"}
            size={32}
            color={Colors.accent}
          />
        </TouchableComponent>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={dailyFeeding}
        renderItem={(itemData) => {
          const time =
            feedingUtils.zeroPad(itemData.item.date.getHours(), 2) +
            ":" +
            feedingUtils.zeroPad(itemData.item.date.getMinutes(), 2);
          return (
            <FeedingItem
              date={time}
              volume={itemData.item.volume}
              onSelect={() => onItemSelected(itemData.item)}
              max={itemData.item.max}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  pooContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
  },
  poo: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
    color: Colors.primary,
  },
  pooLabelView: {
    position: "absolute",
    top: -10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  touchButton: {
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 60,
  },
});

export const screenOptions = () => {
  return {
    headerTitle: i18n.t("DailyFeeding"),
  };
};

export default FeedingDayOverview;
