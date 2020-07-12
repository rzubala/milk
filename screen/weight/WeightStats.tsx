import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { useSelector } from "react-redux";

import { Colors } from "../../constants/colors";
import i18n from "../../constants/strings";
import Weight from '../../domain/weight'
import { getWeightAverage } from '../../utils/weight'

const WeightStats = props => {
    const weights = useSelector(state => state.weight.weights)

    const lastData = getWeightAverage(weights, 1)
    const lastWeekData = getWeightAverage(weights, 7)
    const last2WeekData = getWeightAverage(weights, 14)
    const lastMonthData = getWeightAverage(weights, 30)

    const buildLastDays = (data) => {
        return i18n.t("Last") + " " + data.days + " " + i18n.t("Days")
    }

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
                <Text style={styles.labelColumnText}>{buildLastDays(lastWeekData)}</Text>
                </View>
                <View style={styles.dataColumn}>
                    <Text style={styles.dataColumnText}>{lastWeekData.average}</Text>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.labelColumn}>
                <Text style={styles.labelColumnText}>{buildLastDays(last2WeekData)}</Text>
                </View>
                <View style={styles.dataColumn}>
                    <Text style={styles.dataColumnText}>{last2WeekData.average}</Text>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.labelColumn}>
                <Text style={styles.labelColumnText}>{buildLastDays(lastMonthData)}</Text>
                </View>
                <View style={styles.dataColumn}>
                    <Text style={styles.dataColumnText}>{lastMonthData.average}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20
    },
    header: {
        fontSize: 20
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20,
        paddingStart: 30
    },
    labelColumn: {
        flex: 1
    },
    labelColumnText: {
        fontSize: 15,
    },
    dataColumn: {
        flex: 1
    },
    dataColumnText: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.accent
    }
})

export const screenOptions = () => {
    return {
      headerTitle: i18n.t("Stats"),
    };
  };

export default WeightStats