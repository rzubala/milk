import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../constants/colors";
import i18n from "../constants/strings";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import NetInfo from '@react-native-community/netinfo';

import HeaderButton from "../components/UI/HeaderButton";

import Feeding from "../domain/feeding";
import Poo from "../domain/poo";
import FeedingItem from "../components/FeedingItem";
import * as feedingActions from "../store/actions/milk";
import * as pooActions from "../store/actions/poo";
import * as feedingUtils from "../utils/milk";

const FeedingOverview = (props) => {
  const [networkAlert, setNetworkAlert] = useState(false)
  const [retryFetch, setRetryFetch] = useState(false)
  const feeding = useSelector((state) =>
    feedingUtils.groupPerDay(state.milk.feeding)
  );
  const poo = useSelector((state) => state.poo.poo);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        if (!networkAlert) {
          Alert.alert(i18n.t("NetworkError"), i18n.t("CheckNetwork"), [
            { text: "OK" },
          ]);
          setNetworkAlert(true)
        }
      } else {
        setNetworkAlert(false)
        if (retryFetch) {
          setRetryFetch(false)
          loadData()          
        }
      }
    });    
    return unsubscribe
  }, [])

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      await dispatch(feedingActions.fetchFeeding());
      await dispatch(pooActions.fetchPoo());
      setRetryFetch(false)
    } catch (err) {      
      setRetryFetch(true)
    } finally {
      setLoading(false)
    }

  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onAdd = useCallback(() => {
    props.navigation.navigate("FeedingEdit");
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
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
  }, [onAdd]);

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

  if (loading || !feeding || feeding.length === 0) {
    return (
      <View
        style={{
          ...styles.screen,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
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
