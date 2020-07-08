import React, { useEffect, useCallback } from "react";
import { View, Text, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { Colors } from "../../constants/colors";
import i18n from "../../constants/strings";
import HeaderButton from "../../components/UI/HeaderButton";

const WeightOverview = (props) => {
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

  return (
    <View>
      <Text>Weight overview</Text>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: i18n.t("Weight"),
  };
};

export default WeightOverview;
