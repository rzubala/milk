import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../constants/strings";

import FeedingItem from "../components/FeedingItem";
import Feeding from '../domain/feeding'
import * as feedingUtils from '../utils/milk'

const FeedingDayOverview = (props) => {
  const timestamp = props.route.params.timestamp;
  const dailyFeeding = useSelector(state => feedingUtils.fetchFeedingDay(state.milk.feeding, timestamp));

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: i18n.t("DailyFeeding") + " " + new Date(timestamp).toISOString().slice(0, 10),
    })
  }, [timestamp])

  const onItemSelected = (item: Feeding) => {
    props.navigation.navigate("FeedingEdit", {
      id: item.id
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
      <FlatList
        keyExtractor={(item) => item.id}
        data={dailyFeeding}
        renderItem={(itemData) => {
          const time =
            itemData.item.date.getHours() +
            ":" +
            itemData.item.date.getMinutes();
          return (
            <FeedingItem
              date={time}
              volume={itemData.item.volume}
              onSelect={() => onItemSelected(itemData.item)}
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
});

export const screenOptions = () => {
  return {
    headerTitle: i18n.t("DailyFeeding"),
  };
};

export default FeedingDayOverview;
