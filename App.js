import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RouteStack from "./src/router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { axiosHeaders } from "./src/services/config/axios";
import { RootSiblingParent } from "react-native-root-siblings";

const App = () => {
  useEffect(() => {
    axiosHeaders();
    console.log("Entry file", process.env.API_URL);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <RootSiblingParent>
          <RouteStack />
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
