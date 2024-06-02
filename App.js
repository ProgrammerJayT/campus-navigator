import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RouteStack from "./src/router";
import { axiosHeaders } from "./src/services/config/axios";
import { RootSiblingParent } from "react-native-root-siblings";
import { ComponentsStateProvider } from "./src/state-management/context/components";
import ComponentsContainer from "./src/components/container";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LocationStateProvider } from "./src/state-management/context/location";
import { AuthProvider } from "./src/state-management/context/auth";
import { NavigationStateProvider } from "./src/state-management/context/navigation";

const App = () => {
  useEffect(() => {
    axiosHeaders();
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
        <RootSiblingParent>
          <ComponentsStateProvider>
            <GestureHandlerRootView>
              <LocationStateProvider>
                <NavigationStateProvider>
                  <RouteStack />
                </NavigationStateProvider>
              </LocationStateProvider>
            </GestureHandlerRootView>
            <ComponentsContainer />
          </ComponentsStateProvider>
        </RootSiblingParent>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
