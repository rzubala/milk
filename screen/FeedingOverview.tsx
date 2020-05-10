import React from 'react'
import {View, Text, StyleSheet } from 'react-native'
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import i18n from '../constants/strings';

const FeedingOverview = props => {
    return (
        <View style={styles.screen}>
            <Text>
                Milk overview screen
            </Text>
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
      headerTitle: i18n.t('Feeding'),
    };
  };

export default FeedingOverview