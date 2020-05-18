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

import * as feedingActions from "../store/actions/milk";

const FeedingDayOverview = (props) => {
  const dailyFeeding = useSelector((state) => state.milk.dailyFeeding[props.date]);

  const dispatch = useDispatch();

  const date = props.route.params.date;
  const loadDailyFeeding = useCallback(() => {
    dispatch(feedingActions.fetchFeedingDay(date));
  }, [dispatch, date]);

  useEffect(() => {
    loadDailyFeeding();
  }, [loadDailyFeeding]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: i18n.t("DailyFeeding") + " " + new Date(date).toISOString().slice(0, 10),
    })
  }, [date])

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
              onSelect={() => {}}
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
