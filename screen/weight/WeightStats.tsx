import React, {useCallback, useEffect} from "react";
import { View, Text, StyleSheet, Share, Platform } from "react-native";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import { Colors } from "../../constants/colors";
import i18n from "../../constants/strings";
import Weight from "../../domain/weight";
import { getWeightAverage } from "../../utils/weight";

const WeightStats = (props) => {
  const weights = useSelector((state) => state.weight.weights);

  const lastData = getWeightAverage(weights, 1);
  const lastWeekData = getWeightAverage(weights, 7);
  const last2WeekData = getWeightAverage(weights, 14);
  const lastMonthData = getWeightAverage(weights, 30);

  const onShare = useCallback(async () => {
    try {
      let message = i18n.t("StatsFrom") + '\n'
      message += buildLastDays(lastData) + " " + lastData.average + '\n';
      message += buildLastDays(lastWeekData) + " " + lastWeekData.average + '\n';
      message += buildLastDays(last2WeekData) + " " + last2WeekData.average + '\n';
      message += buildLastDays(lastMonthData) + " " + lastMonthData.average + '\n';
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
  }, [weights, lastData, lastWeekData, last2WeekData, lastMonthData]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Share"
            iconName={Platform.OS === "android" ? "md-share" : "ios-share"}
            onPress={onShare}
          />
        </HeaderButtons>
      ),
    });
  }, [onShare]);

  const buildLastDays = (data) => {
    return i18n.t("Last") + " " + data.days + " " + i18n.t("Days");
  };

  return (
    <View style={styles.screen}>
      <View>
        <Text style={styles.header}>{i18n.t("StatsFrom")}</Text>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.labelColumn}>
          <Text style={styles.labelColumnText}>{buildLastDays(lastData)}</Text>
        </View>
        <View style={styles.dataColumn}>
          <Text style={styles.dataColumnText}>{lastData.average}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.labelColumn}>
          <Text style={styles.labelColumnText}>
            {buildLastDays(lastWeekData)}
          </Text>
        </View>
        <View style={styles.dataColumn}>
          <Text style={styles.dataColumnText}>{lastWeekData.average}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.labelColumn}>
          <Text style={styles.labelColumnText}>
            {buildLastDays(last2WeekData)}
          </Text>
        </View>
        <View style={styles.dataColumn}>
          <Text style={styles.dataColumnText}>{last2WeekData.average}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.labelColumn}>
          <Text style={styles.labelColumnText}>
            {buildLastDays(lastMonthData)}
          </Text>
        </View>
        <View style={styles.dataColumn}>
          <Text style={styles.dataColumnText}>{lastMonthData.average}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 20,
    paddingStart: 30,
  },
  labelColumn: {
    flex: 1,
  },
  labelColumnText: {
    fontSize: 15,
  },
  dataColumn: {
    flex: 1,
  },
  dataColumnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.accent,
  },
});

export const screenOptions = () => {
  return {
    headerTitle: i18n.t("Stats"),
  };
};

export default WeightStats;
