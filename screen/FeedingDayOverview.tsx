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

import * as feedingActions from "../store/actions/milk";

const FeedingDayOverview = (props) => {
  const dailyFeeding = useSelector(state => {
    //   if (!state.milk.dailyFeeding) {
    //       return null
    //   }
      return state.milk.dailyFeeding[props.date]
  });

  const dispatch = useDispatch();

  const date = { props };
  const loadDailyFeeding = useCallback(() => {
    dispatch(feedingActions.fetchFeedingDay(date));
  }, [dispatch, date]);

  useEffect(() => {
    loadDailyFeeding();
  }, [loadDailyFeeding]);

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
        renderItem={itemData => (
          <View>
            <Text>{itemData.item.volume}</Text>
          </View>
        )}
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
