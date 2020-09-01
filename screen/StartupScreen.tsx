import React, { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

import { Colors } from "../constants/colors";
import i18n from "../constants/strings";
import * as authActions from "../store/actions/auth";

const StartupScreen = (props) => {
  const [networkAlert, setNetworkAlert] = useState(false);  
  const [retry, setRetry] = useState(false);

  const dispatch = useDispatch();

  const tryLogin = async () => {
      try {
        await dispatch(authActions.login());
      } catch (err) {
        Alert.alert('Oops!', err.message)
      }
  };

  const loadData = useCallback(async () => {
    if (!(await NetInfo.fetch()).isConnected) {
      setRetry(true);
      return;
    }
    setRetry(false);
    tryLogin();        
  }, [dispatch, tryLogin]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        if (!networkAlert) {
          Alert.alert(i18n.t("NetworkError"), i18n.t("CheckNetwork"), [
            { text: "OK" },
          ]);
          setNetworkAlert(true);
        }
      } else {
        if (retry) {
          setRetry(false);
          loadData();
        }
        setNetworkAlert(false);
      }
    });
    return unsubscribe;
  }, [retry, networkAlert]);

  useEffect(() => {}, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
