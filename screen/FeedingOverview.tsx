import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../constants/strings";

import Feeding from "../domain/feeding";
import FeedingItem from "../components/FeedingItem";
import * as feedingActions from "../store/actions/milk";

const FeedingOverview = (props) => {
  const feeding = useSelector((state) => state.milk.feeding);

  const dispatch = useDispatch();

  const loadFeeding = useCallback(() => {
    dispatch(feedingActions.fetchFeeding());
  }, [dispatch]);

  useEffect(() => {
    loadFeeding();
  }, [loadFeeding]);

  const onItemSelected = (date: Date) => {
    console.log('onItemSelected', date, date.getTime())
    props.navigation.navigate("FeedingDayOverview", {
      date: date.getTime()
    });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item: Feeding) => item.id}
        data={feeding}
        renderItem={(itemData) => {
          return (
            <FeedingItem
              date={itemData.item.date.toISOString().slice(0, 10)}
              volume={itemData.item.volume}
              onSelect={() => {
                onItemSelected(itemData.item.date)
              }}
            ></FeedingItem>
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
    headerTitle: i18n.t("Feeding"),
  };
};

export default FeedingOverview;
