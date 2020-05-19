import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, FlatList, Platform, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../constants/strings";

import Feeding from "../domain/feeding";
import FeedingItem from "../components/FeedingItem";
import * as feedingActions from "../store/actions/milk";
import * as feedingUtils from '../utils/milk'

const FeedingOverview = (props) => {
  const TouchableComponent: any =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const feeding = useSelector((state) => feedingUtils.groupPerDay(state.milk.feeding));

  const dispatch = useDispatch();

  const loadFeeding = useCallback(() => {
    dispatch(feedingActions.fetchFeeding());
  }, [dispatch]);

  useEffect(() => {
    loadFeeding();
  }, [loadFeeding]);

  const onItemSelected = (date: Date) => {
    props.navigation.navigate("FeedingDayOverview", {
      timestamp: date.getTime()
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
      <TouchableComponent onPress={() => alert('FAB clicked')} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: Colors.accent,
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 40,
    color: 'white'
  }  
});

export const screenOptions = () => {
  return {
    headerTitle: i18n.t("Feeding"),
  };
};

export default FeedingOverview;
