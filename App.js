import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RouteStack from "./src/router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <RouteStack />
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
