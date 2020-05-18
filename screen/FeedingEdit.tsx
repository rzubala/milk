import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FeedingItem from "../components/FeedingItem";

import Feeding from '../domain/feeding'

import i18n from "../constants/strings";

const FeedingEdit = (props) => {
  const feeding: Feeding = props.route.params ? props.route.params.item : null;
  return (
    <View style={styles.screen}>
      <Text>Feeding edit</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export const screenOptions = navData => {
    const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.item ? i18n.t('EditFeeding') : i18n.t('AddFeeding'),
  };
};

export default FeedingEdit;
