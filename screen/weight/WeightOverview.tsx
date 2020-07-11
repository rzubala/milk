import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, FlatList, Platform, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { Colors } from "../../constants/colors";
import WeightItem from '../../components/WeightItem'
import i18n from "../../constants/strings";
import HeaderButton from "../../components/UI/HeaderButton";
import Weight from '../../domain/weight'
import * as weightActions from "../../store/actions/weight";

const WeightOverview = (props) => {
  const weights = useSelector(state => state.weight.weights)

  const onAdd = useCallback(() => {
    props.navigation.navigate("WeightEdit");
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
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

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    try {
      await dispatch(weightActions.fetchWeigths());
    } catch (err) {
    } finally {
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onItemSelected = (weight: Weight) => {
    props.navigation.navigate("WeightEdit", {
      id: weight.id,
      timestamp: weight.timestamp,
      weight: weight.weight,
    });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item: Weight) => item.id}
        data={weights}
        renderItem={(itemData) => {
          return (
            <WeightItem
              date={new Date(itemData.item.timestamp).toISOString().slice(0, 10)}
              weight={itemData.item.weight}
              onSelect={() => {
                onItemSelected(itemData.item);
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

export const screenOptions = () => {
  return {
    headerTitle: i18n.t("Weight"),
  };
};

export default WeightOverview;
