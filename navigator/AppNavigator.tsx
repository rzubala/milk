import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { MilkNavigatorTab } from "./MilkNavigator";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MilkNavigatorTab />
    </NavigationContainer>
  );
};

export default AppNavigator