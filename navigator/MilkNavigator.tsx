import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../constants/colors";
import i18n from "../constants/strings";

import FeedingScreen, {
  screenOptions as FeedingScreenOptions,
} from "../screen/FeedingOverview";

import FeedingDayScreen, {
  screenOptions as FeedingDayScreenOptions,
} from "../screen/FeedingDayOverview";

const defaultNavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "white" : "",
  },
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerBackTitleStyle: {
    fontWeight: "normal",
  },
  headerTintColor: Platform.OS === "android" ? Colors.primary : Colors.primary,
};

const MilkNavigatorStack = createStackNavigator();

export const MilkNavigator = () => {
  return (
    <MilkNavigatorStack.Navigator screenOptions={defaultNavOptions}>
      <MilkNavigatorStack.Screen
        name="FeedingOverview"
        component={FeedingScreen}
        options={FeedingScreenOptions}
      />
      <MilkNavigatorStack.Screen
        name="FeedingDayOverview"
        component={FeedingDayScreen}
        options={FeedingDayScreenOptions}
      />
    </MilkNavigatorStack.Navigator>
  );
};
