import React from 'react'
import {View, Text} from 'react-native'
import { Colors } from "../constants/colors";
import i18n from "../constants/strings";

const WeightOverview = props => {
    return (
        <View>
            <Text>Weight overview</Text>
        </View>
    )
}

export const screenOptions = () => {
    return {
      headerTitle: i18n.t("Weight"),
    };
  };

export default WeightOverview