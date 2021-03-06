import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
  Share,
} from "react-native";
import { Colors } from "../constants/colors";
import i18n from "../constants/strings";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton";

import Feeding from "../domain/feeding";
import Poo from "../domain/poo";
import FeedingItem from "../components/FeedingItem";
import * as feedingActions from "../store/actions/milk";
import * as pooActions from "../store/actions/poo";
import * as feedingUtils from "../utils/milk";

const FeedingOverview = (props) => {

  const feeding = useSelector((state) =>
    feedingUtils.groupPerDay(state.milk.feeding)
  );
  const poo = useSelector((state) => state.poo.poo);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    try {
      await dispatch(feedingActions.fetchFeeding());
      await dispatch(pooActions.fetchPoo());
    } catch (err) {
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onAdd = useCallback(() => {
    props.navigation.navigate("FeedingEdit");
  }, []);

  const onShare = useCallback(async () => {
    try {
      const message = feeding
        .map(
          (f: Feeding) =>
            `${f.date.toISOString().slice(0, 10)}\t${f.volume}\t${feedingUtils.getPoo(poo, f.date.getTime())?.count ?? 0}`
        )
        .join("\n");
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [feeding]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Share"
            iconName={Platform.OS === "android" ? "md-share" : "ios-share"}
            onPress={onShare}
          />
          <Item
            title="Reload"
            iconName={Platform.OS === "android" ? "md-refresh" : "ios-refresh"}
            onPress={loadData}
            color={Colors.accent}
          />
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={onAdd}
            color={Colors.accent}
          />
        </HeaderButtons>
      ),
    });
  }, [onAdd, onShare, loadData]);

  const onItemSelected = (date: Date) => {
    let pooObj: Poo | undefined = feedingUtils.getPoo(poo, date.getTime());
    if (!pooObj) {
      pooObj = new Poo("", date.getTime(), 0);
    }
    props.navigation.navigate("FeedingDayOverview", {
      timestamp: date.getTime(),
      poo: pooObj,
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
              max={itemData.item.sumMax}
              maxSilver={itemData.item.max && !itemData.item.sumMax}
              diff={itemData.item.diff}
              count={
                feedingUtils
                  .getPoo(poo, itemData.item.date.getTime())
                  ?.count.toString() ?? "0"
              }
              onSelect={() => {
                onItemSelected(itemData.item.date);
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
    headerTitle: i18n.t("FeedingPL"),
  };
};

export default FeedingOverview;
