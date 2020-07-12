import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { useSelector } from "react-redux";

import { Colors } from "../../constants/colors";
import i18n from "../../constants/strings";
import Weight from '../../domain/weight'

const WeightStats = props => {
    const weights = useSelector(state => state.weight.weights)

    return (
        <View style={styles.screen}>
            <Text>{i18n.t("Stats")}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

export const screenOptions = () => {
    return {
      headerTitle: i18n.t("Stats"),
    };
  };

export default WeightStats