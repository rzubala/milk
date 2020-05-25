import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, FlatList, Platform, TouchableNativeFeedback, TouchableOpacity, Button, ActivityIndicator } from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../constants/strings";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton";

import Feeding from "../domain/feeding";
import Poo from '../domain/poo'
import FeedingItem from "../components/FeedingItem";
import * as feedingActions from "../store/actions/milk";
import * as pooActions from '../store/actions/poo'
import * as feedingUtils from '../utils/milk'

const FeedingOverview = (props) => {
  const TouchableComponent: any =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const feeding = useSelector((state) => feedingUtils.groupPerDay(state.milk.feeding));
  const poo = useSelector(state => state.poo.poo)

  const dispatch = useDispatch();

  const loadFeeding = useCallback(() => {
    dispatch(feedingActions.fetchFeeding());
    dispatch(pooActions.fetchPoo());
  }, [dispatch]);

  const loadPoo = useCallback(() => {
    dispatch(pooActions.fetchPoo());
  }, [dispatch]);  

  useEffect(() => {
    loadFeeding();
  }, [loadFeeding]);

  useEffect(() => {
    loadPoo();
  }, [loadPoo]);

  const tryAgain = () => {
    loadFeeding()
    loadPoo()
  }

  const onAdd = useCallback(() => {
      props.navigation.navigate("FeedingEdit")
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName={
              Platform.OS === "android" ? "md-add" : "ios-add"
            }
            onPress={onAdd}
            color={Colors.accent}
          />
        </HeaderButtons>
      ),
    });
  }, [onAdd]);

  const onItemSelected = (date: Date) => {
    let pooObj: Poo | undefined = feedingUtils.getPoo(poo, date.getTime())
    if (!pooObj) {
      pooObj = new Poo('', date.getTime(), 0)
    }
    props.navigation.navigate("FeedingDayOverview", {
      timestamp: date.getTime(),
      poo: pooObj
    });
  };

  if (!feeding || feeding.length === 0) {
    return (
      <View style={{ ...styles.screen, justifyContent: "center", alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <View style={{width: "50%", marginTop: 40}}>
          <Button title={i18n.t("TryAgain")} onPress={tryAgain} color={Colors.accent} />
        </View>
      </View>
    );
  }

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
              count={feedingUtils.getPoo(poo, itemData.item.date.getTime())?.count.toString() ?? "0"}
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
  }
});

export const screenOptions = () => {
  return {
    headerTitle: i18n.t("FeedingPL"),
  };
};

export default FeedingOverview;
