import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { MilkNavigator } from "./MilkNavigator";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MilkNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator