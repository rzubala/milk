import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Colors } from "../constants/colors";
import i18n from "../constants/strings";

import FeedingScreen, {
  screenOptions as FeedingScreenOptions,
} from "../screen/FeedingOverview";

import WeightScreen, {
  screenOptions as WeightScreenOptions
} from '../screen/WeightOverview'

import FeedingDayScreen, {
  screenOptions as FeedingDayScreenOptions,
} from "../screen/FeedingDayOverview";

import FeedingEditScreen from "../screen/FeedingEdit";

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

const MilkNavigator = () => {
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
      <MilkNavigatorStack.Screen
        name="FeedingEdit"
        component={FeedingEditScreen}
      />
    </MilkNavigatorStack.Navigator>
  );
};

const WeightNavigatorStack = createStackNavigator();
const WeightNavigator = () => {
  return (
    <WeightNavigatorStack.Navigator screenOptions={defaultNavOptions}>
      <WeightNavigatorStack.Screen
        name="WeightOverview"
        component={WeightScreen}
        options={WeightScreenOptions}
      />
    </WeightNavigatorStack.Navigator>
  )
}

const MilkNavigatorBottomTab = createMaterialBottomTabNavigator()
export const MilkNavigatorTab = () => {
  return (
    <MilkNavigatorBottomTab.Navigator
      initialRouteName={i18n.t('FeedingPL')}
      activeColor={Platform.OS == "android" ? "white" : Colors.primary}
      inactiveColor={Colors.inactive}
      style={{ 
        backgroundColor: Platform.OS == "android" ? Colors.primary : ""
      }}
    >
      <MilkNavigatorBottomTab.Screen name={i18n.t('FeedingPL')} component={MilkNavigator}
        options={{
          tabBarLabel: i18n.t('FeedingPL'),
          tabBarIcon: ({ color }) => (
            <Ionicons name={Platform.OS == "android" ? "md-restaurant" : "ios-restaurant"} size={16} color={color} />
          )
        }}
      />
      <MilkNavigatorBottomTab.Screen name={i18n.t('Weight')} component={WeightNavigator}
        options={{
          tabBarLabel: i18n.t('Weight'),
          tabBarIcon: ({ color }) => (
            <Ionicons name={Platform.OS == "android" ? "md-timer" : "ios-timer"} size={16} color={color} />
          )
        }}
      />
    </MilkNavigatorBottomTab.Navigator>
  )
}