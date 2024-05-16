import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RouteStack from "./src/router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { axiosHeaders } from "./src/services/config/axios";
import { RootSiblingParent } from "react-native-root-siblings";
import { ComponentsStateProvider } from "./src/state-management/context/components";
import ComponentsContainer from "./src/components/container";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  useEffect(() => {
    axiosHeaders();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <RootSiblingParent>
          <ComponentsStateProvider>
            <GestureHandlerRootView>
              <RouteStack />
            </GestureHandlerRootView>
            <ComponentsContainer />
          </ComponentsStateProvider>
        </RootSiblingParent>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
