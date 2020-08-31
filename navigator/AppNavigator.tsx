import React from "react";
import {useSelector} from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";

import { MilkNavigatorTab } from "./MilkNavigator";
import StartupScreen from '../screen/StartupScreen'

const AppNavigator = () => {
  const isAuth = useSelector(state => !!state.auth.token)

  return (
    <NavigationContainer>
      {!isAuth && <StartupScreen />}
      {isAuth && <MilkNavigatorTab />}
    </NavigationContainer>
  );
};

export default AppNavigator